#!/usr/bin/env bash
# 대시보드 모노레포 시안별 타입체크 + 빌드 검증
# 사용: bash verify.sh [시안디렉토리 ...]  (인자 없으면 4개 시안 전체)
# 검증 수단: npx tsc --noEmit (타입체크) + npm run build=vite build (빌드)
#   ※ 이 프로젝트엔 lint/test 스크립트가 없다. 없는 명령은 실행하지 않는다.
set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
cd "$ROOT" || { echo "프로젝트 루트를 찾을 수 없음"; exit 1; }

DEFAULT_SIANS=(
  "v3-fund-dashboard"
  "proactive-monitoring-center"
  "professional-asset-management-dashboard"
  "my-advisor---premium-investment-console"
)
SIANS=("$@"); [ "$#" -eq 0 ] && SIANS=("${DEFAULT_SIANS[@]}")

fail=0
printf "%-45s | %-10s | %-10s\n" "시안" "tsc" "build"
printf -- "-------------------------------------------------------------------\n"
for s in "${SIANS[@]}"; do
  if [ ! -d "$s" ]; then printf "%-45s | %-10s | %s\n" "$s" "SKIP" "디렉토리 없음"; continue; fi
  [ -d "$s/node_modules" ] || (cd "$s" && npm install >/dev/null 2>&1)

  # 타입체크: tsconfig 있으면 tsc --noEmit
  tsc_res="-"
  if [ -f "$s/tsconfig.json" ]; then
    if (cd "$s" && npx --no-install tsc --noEmit >/tmp/qa_tsc_$$.log 2>&1); then tsc_res="✅"; else tsc_res="❌"; fail=1; fi
  fi

  # 빌드: package.json에 build 스크립트가 있을 때만
  build_res="-"
  if grep -q '"build"' "$s/package.json" 2>/dev/null; then
    if (cd "$s" && npm run build >/tmp/qa_build_$$.log 2>&1); then build_res="✅"; else build_res="❌"; fail=1; fi
  fi

  printf "%-45s | %-10s | %-10s\n" "$s" "$tsc_res" "$build_res"
  [ "$tsc_res" = "❌" ] && { echo "  [tsc 에러 발췌]"; tail -15 /tmp/qa_tsc_$$.log | sed 's/^/    /'; }
  [ "$build_res" = "❌" ] && { echo "  [build 에러 발췌]"; tail -15 /tmp/qa_build_$$.log | sed 's/^/    /'; }
done
rm -f /tmp/qa_tsc_$$.log /tmp/qa_build_$$.log

echo ""
[ "$fail" -eq 0 ] && echo "판정: PASS" || echo "판정: FAIL"
exit "$fail"
