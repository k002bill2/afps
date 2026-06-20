---
name: dashboard-review
description: 농식품모태펀드 대시보드 모노레포(시안1~4)의 정적 코드 품질·디자인 일관성을 리뷰하는 방법. any 탐지, React.FC 규약, import 누락, constants/types 분리, 시안별 팔레트 일관성, 시안 간 중복을 검토하고 심각도별 수정 제안을 작성한다. dashboard-reviewer가 코드 리뷰·일관성 점검을 수행할 때 반드시 사용.
---

# Dashboard Review

대시보드 코드를 **읽어서** 품질과 일관성을 판단한다. 빌드 실행은 qa의 영역이다. 직접 수정하지 않고 `파일:라인` 단위 수정 제안을 남긴다.

## 검토 절차

1. 대상 파일 목록 확인(`_workspace/02_builder_*.md` 또는 지정 경로).
2. grep으로 빠른 위반 스캔 → 파일 정독으로 맥락 확인.
3. 심각도별로 정리 후 판정.

## grep 스캔 (빠른 1차 탐지)

```bash
# any 사용 (strict 위반)
grep -rn ": any\|as any" <대상경로> --include=*.ts --include=*.tsx
# 기본 내보내기 누락 의심
grep -Ln "export default" <컴포넌트파일들>
```
grep은 후보일 뿐 — 반드시 파일을 읽어 오탐을 거른다.

## 체크리스트

**Critical (타입 안전·빌드 위험·데이터 오류)**
- `any`/`as any` 사용
- import 누락(특히 lucide-react 아이콘, recharts) → 빌드 실패로 이어짐
- `constants.tsx` 데이터가 `types.ts` 인터페이스를 위반(필드 누락/타입 불일치)
- 도메인 데이터 오류(잘못된 단위·연도·용어)

**Warning (규약 위반)**
- `React.FC` 미사용/기본 내보내기 누락
- 데이터·타입이 분리 안 됨(시안3 인라인 예외는 제외)
- import 경로가 시안 관례(`../types`)와 다름, 미사용 import

**Suggestion (개선)**
- 매직 값 → 상수화, 반복 마크업 → 컴포넌트화
- 접근성(aria/대비), 네이밍 명료성

## 디자인 일관성

- 신규 컴포넌트의 Tailwind 클래스가 **해당 시안**의 기존 팔레트·테마와 맞는가. 다른 시안 스타일(예: 라이트 시안4 색을 다크 시안2에)이 섞이지 않았는가.
- radius/spacing/typography 토큰이 인접 컴포넌트와 어긋나지 않는가.

## 시안 간 일관성 (모노레포 특화)

- 같은 개념을 여러 시안에 추가했다면 데이터 모델·네이밍이 일관적인가.
- 시안 간 복붙으로 생긴 불필요한 중복이나 한쪽만 수정된 drift는 없는가.

## 작성 원칙

- **이유를 단다.** 규칙이 아니라 근거(타입 안전, 빌드 안정, 일관성)를 설명하면 엣지 케이스 판단이 옳아진다.
- 추측 금지 — 실제 파일·grep 결과만 근거.
- 출력: `_workspace/03_reviewer_*.md`에 심각도별 지적 + `파일:라인` + 제안 코드, 끝에 `판정: APPROVE | NEEDS_REVISION`.
- 라우팅: 구현 실수 → builder, 설계 결함(타입 불일치 등) → architect.
