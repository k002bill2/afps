---
name: dashboard-dev-orchestrator
description: 농식품모태펀드 대시보드 모노레포(시안1~4)의 종합 개발 워크플로우를 조율한다. architect→builder→reviewer→qa 팀으로 기능 설계·구현·정적 리뷰·빌드/통합 검증을 한 번에 처리한다. 대시보드 기능 개발·화면 추가·차트 구현·여러 시안 동시 작업·구현 후 검증 요청 시 사용. 그리고 "다시/재실행/업데이트/수정/보완/이전 결과 기반으로/특정 시안만 다시" 같은 후속 요청에도 사용.
---

# Dashboard Dev Orchestrator

농식품모태펀드 대시보드 종합 개발 팀(설계→구현→리뷰→검증)을 조율한다. 단순 질문(개념 설명 등)은 이 워크플로우 없이 직접 답해도 된다. 실제 코드 작업이면 이 절차를 따른다.

**팀 구성:** `dashboard-architect`(설계) · `dashboard-builder`(구현) · `dashboard-reviewer`(정적 리뷰) · `dashboard-qa`(빌드/통합 검증). 모두 `model: "opus"`.

**아키텍처:** 파이프라인(architect→builder) + 생성-검증(builder→reviewer·qa 병렬). 검증은 시안 1개 완성마다 점진적으로 돈다.

## Phase 0: 컨텍스트 확인 (먼저)

`_workspace/` 상태로 실행 모드를 정한다:
- `_workspace/` 없음 → **초기 실행** (Phase 1부터)
- `_workspace/` 있음 + 사용자가 부분 수정 요청 → **부분 재실행** (해당 에이전트만 재호출, 기존 산출물 입력)
- `_workspace/` 있음 + 새 입력 → **새 실행** (기존 `_workspace/`를 `_workspace_prev/`로 이동 후 초기 실행)

## 실행 모드: 에이전트 팀 (기본) / 서브 에이전트 (폴백)

**기본은 에이전트 팀이다.** `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`이 설정돼 팀 도구(`TeamCreate`/`SendMessage`/`TaskCreate`)를 쓸 수 있으면 팀 모드로 조율한다. 팀 도구가 없으면 **서브 에이전트 폴백**(아래)으로 동일 흐름을 수행한다 — 결과 품질은 동일하게 보장한다.

### 팀 모드
```
1. TeamCreate(team="dashboard-dev",
     members=[dashboard-architect, dashboard-builder, dashboard-reviewer, dashboard-qa])
2. TaskCreate: 설계 → 구현 → (리뷰 ∥ 검증), 의존성 지정
3. 팀원이 SendMessage로 자체 조율:
   architect→builder 명세 전달, builder→reviewer/qa 변경 알림(점진),
   reviewer/qa→builder 수정요청 / →architect 설계결함
4. 리더가 진행 모니터링 → 산출물 종합 → 팀 정리
```

### 서브 에이전트 폴백 (팀 도구 미가용 시)
```
1. Agent(subagent_type="dashboard-architect", model="opus") → 명세를 _workspace/에 기록
2. Agent(subagent_type="dashboard-builder",  model="opus") → 명세 읽고 구현
3. 구현 직후, 병렬로:
   Agent(subagent_type="dashboard-reviewer", model="opus", run_in_background=true)
   Agent(subagent_type="dashboard-qa",       model="opus", run_in_background=true)
4. NEEDS_REVISION/FAIL이면 builder(또는 architect) 재호출 → 재검증. 통과까지 반복.
```
> 모든 `Agent` 호출에 `model: "opus"` 명시. 빌트인 타입이 아니라 위 프로젝트 에이전트 정의를 `subagent_type`으로 쓴다.

## 데이터 전달 프로토콜

- **파일 기반(산출물):** `_workspace/{phase}_{agent}_{기능}.md`
  - `01_architect_*.md`(명세) → `02_builder_*.md`(변경목록) → `03_reviewer_*.md`(리뷰) → `04_qa_*.md`(검증)
- **메시지/태스크 기반(팀 모드):** `SendMessage`로 완료 알림·수정 요청, `TaskCreate`로 의존성·진행 추적.
- 실제 코드는 각 시안 디렉토리에 직접 쓴다. 중간 산출물(`_workspace/`)은 감사 추적용으로 보존한다.

## 에러 핸들링

- 에이전트 1회 재시도 후 재실패 → 그 결과 없이 진행하고 최종 보고에 **누락을 명시**(추측 금지).
- 상충 데이터는 삭제하지 않고 출처를 병기.
- 라우팅 규칙: 빌드 실패·구현 실수 → builder / 설계·시안 간 구조 결함 → architect.
- 검증 루프는 최대 3회. 3회 후에도 FAIL이면 사용자에게 현황과 막힌 지점을 보고.

## 팀 크기

기본 4명(소~중규모에 적합). 작업이 작으면(단일 컴포넌트, 단일 시안) architect 명세를 생략하고 builder→qa만 돌려도 된다. 크면 시안별로 builder 작업을 분할한다.

## 산출물 종합

모든 시안 PASS 후: 변경 파일 목록 + 시안별 검증 결과표 + reviewer 잔여 제안을 사용자에게 요약 보고한다.

## 진화 (실행 후)

완료 후 한 번은 피드백 기회를 준다: "결과나 팀 구성에서 바꿀 점이 있나요?" 피드백 유형별 반영 대상 — 결과 품질→해당 스킬, 역할→에이전트 정의, 순서→이 오케스트레이터, 트리거 누락→description. 모든 변경은 `CLAUDE.md`의 하네스 변경 이력에 기록한다.

## 테스트 시나리오

**정상 흐름:** "시안1에 '예정 업무' 알림 카드 추가"
→ architect가 `UpcomingTask` 타입·`UPCOMING_TASKS` 상수·`UpcomingTaskCard` 명세 작성 → builder가 시안1에 구현 → reviewer가 any/import/팔레트 점검(APPROVE) → qa가 `tsc --noEmit`+`vite build` PASS → 종합 보고.

**에러 흐름:** builder가 lucide-react 아이콘 import 누락
→ qa의 `vite build`가 `TS2304`로 FAIL → 라우팅: builder → builder가 import 추가 → qa 재검증 PASS. (reviewer도 grep으로 동일 결함을 1차 포착 가능.)

**부분 재실행:** "방금 만든 카드 색을 시안 팔레트에 맞춰 다시"
→ Phase 0이 `_workspace/` 감지 → builder만 재호출(기존 파일 Edit) → reviewer/qa 재검증.
