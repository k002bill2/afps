# Claude Code Configuration

농식품모태펀드 대시보드 모노레포(React 19 + TypeScript + Vite, 시안1~4)용 Claude Code 설정.

## 하네스: 대시보드 종합 개발 팀

기능을 **설계 → 구현 → 정적 리뷰 → 빌드/통합 검증**까지 처리하는 에이전트 팀. 자세한 트리거·변경 이력은 루트 `CLAUDE.md`의 "하네스" 섹션 참조.

### 에이전트 (`.claude/agents/`)
| 에이전트 | 역할 | 모델 |
|---------|------|------|
| `dashboard-architect` | 요구사항 → 구현 명세(대상 시안·types·constants·컴포넌트 분해) | opus |
| `dashboard-builder` | React 19 컴포넌트·차트·상수·타입 시안별 규약 구현 | opus |
| `dashboard-reviewer` | 정적 코드 품질·디자인 일관성 리뷰 (읽기) | opus |
| `dashboard-qa` | tsc 타입체크 + vite 빌드 실행, 시안 간 경계면 검증 | opus |

### 스킬 (`.claude/skills/`)
| 스킬 | 사용 에이전트 |
|------|--------------|
| `dashboard-dev-orchestrator` | 팀 조율 (오케스트레이터) |
| `dashboard-feature-design` | architect |
| `dashboard-component-build` | builder |
| `dashboard-review` | reviewer |
| `dashboard-qa-verify` (+ `scripts/verify.sh`) | qa |

> 그 외 유지된 범용 메타 스킬: `hook-creator`, `skill-creator`, `subagent-creator`, `slash-command-creator`, `agent-improvement`, `agent-observability`, `external-memory`, `cc-feature-implementer-main`, `verification-loop`. 유지된 범용 에이전트: `code-simplifier`, `eval-grader`, `eval-task-runner`, `brand-logo-finder`.

## 검증 수단

이 모노레포엔 **lint/test 스크립트가 없다.** 검증은 두 가지뿐:
```bash
# 시안별 타입체크 + 빌드 일괄 검증
bash .claude/skills/dashboard-qa-verify/scripts/verify.sh [시안디렉토리 ...]
# 수동: cd <시안> && npx tsc --noEmit && npm run build
```

## `_archive/`

이전 LiveMetro(React Native 지하철 앱) 설정은 `.claude/_archive/agents/`·`.claude/_archive/skills/`로 이동됨. 현재 대시보드 프로젝트와 무관하므로 비활성. 필요 시 복원 가능.
