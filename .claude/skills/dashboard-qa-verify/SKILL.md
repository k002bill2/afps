---
name: dashboard-qa-verify
description: 농식품모태펀드 대시보드 모노레포(시안1~4)를 실제로 타입체크·빌드하고 시안 간 경계면 정합성을 교차 검증하는 방법. 이 프로젝트엔 lint/test가 없으므로 tsc --noEmit + vite build만 사용한다. 시안 간 types/constants shape 비교를 다룬다. dashboard-qa가 빌드 확인·통합 점검·최종 검증을 할 때 반드시 사용.
---

# Dashboard QA Verify

대시보드를 **실행해서** 검증한다. reviewer가 읽기로 판단한다면 qa는 명령 출력으로 사실을 확정한다.

## 이 모노레포의 진짜 검증 수단 (먼저 읽을 것)

- **lint 없음, test 없음.** `npm run lint`/`npm test`/`build:development`는 존재하지 않는다(LiveMetro 잔재). 없는 명령을 호출하지 말 것.
- 실재하는 수단은 둘:
  1. **타입체크:** 시안에서 `npx tsc --noEmit`
  2. **빌드:** 시안에서 `npm run build`(= `vite build`), 전체는 루트 `npm run build:all`
- 검증 전 항상 대상 `package.json`의 `scripts`를 읽어 실재 명령만 실행한다.

## 절차

1. 변경된 시안만 선별(점진 검증). 전체 빌드는 마지막 1회.
2. 번들 스크립트로 일괄 검증하거나 수동 실행:
   ```bash
   bash .claude/skills/dashboard-qa-verify/scripts/verify.sh v3-fund-dashboard
   # 인자 없으면 4개 시안 전체
   ```
3. 경계면 교차 비교(아래) 수행.
4. 결과를 `_workspace/04_qa_*.md`에 표로 기록 + `판정: PASS | FAIL`.

## 경계면 교차 비교 (핵심 — "존재 확인"이 아니다)

빌드만으로는 안 잡히는 통합 결함을 잡는다:

- **시안 간 동일 개념 shape 비교:** 같은 기능을 여러 시안에 넣었다면 각 `types.ts`의 해당 인터페이스를 동시에 읽어 필드명·타입·optional이 일치하는지 비교. 한쪽만 바뀐 drift를 찾는다.
- **constants ↔ types 정합:** `constants.tsx` 배열 항목이 `types.ts` 인터페이스를 실제로 만족하는지(누락 필드·여분 필드). 시안3은 App.tsx 인라인 데이터로 확인.
- **props 사용 ↔ 타입 정의:** 공유 타입(`Metric`, `NavItem` 등)을 쓰는 컴포넌트의 구조분해 props가 인터페이스와 어긋나지 않는지.

## 결과 형식

```markdown
## QA 검증 결과 — {기능명}
| 시안 | tsc --noEmit | vite build | 비고 |
|------|-------------|-----------|------|
| 시안1 | ✅ | ✅ | - |
| 시안3 | ❌ | — | App.tsx:42 TS2304 Download 미정의 |

### 경계면 비교
- types 일치: ✅ / ⚠️ (시안1 UpcomingTask.priority 누락)

### 판정: FAIL
- 조치: 시안3 App.tsx에 `import { Download } from 'lucide-react'` 추가 → builder
```

## 원칙

- 실제 출력만 근거. 통과/실패를 추측하지 않는다.
- 동일 명령 1회 재시도 후 실패 시 결과 없이 보고하고 누락 명시.
- 라우팅: 빌드 실패 → builder, 시안 간 구조 불일치 → architect.
