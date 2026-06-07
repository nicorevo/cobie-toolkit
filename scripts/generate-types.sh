#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_FILE="$ROOT_DIR/frontend/src/lib/supabase/types.ts"
SCHEMAS="${SUPABASE_TYPE_SCHEMAS:-app,cobie,api}"
SUPABASE_BIN="${SUPABASE_BIN:-supabase}"

mkdir -p "$(dirname "$OUT_FILE")"

if [ -n "${SUPABASE_DB_URL:-}" ]; then
  "$SUPABASE_BIN" gen types \
    --lang typescript \
    --db-url "$SUPABASE_DB_URL" \
    --schema "$SCHEMAS" \
    > "$OUT_FILE"
elif [ -n "${SUPABASE_PROJECT_ID:-}" ]; then
  "$SUPABASE_BIN" gen types \
    --lang typescript \
    --project-id "$SUPABASE_PROJECT_ID" \
    --schema "$SCHEMAS" \
    > "$OUT_FILE"
else
  "$SUPABASE_BIN" gen types \
    --local \
    --lang typescript \
    --schema "$SCHEMAS" \
    > "$OUT_FILE"
fi

echo "Generated $OUT_FILE for schemas: $SCHEMAS"
