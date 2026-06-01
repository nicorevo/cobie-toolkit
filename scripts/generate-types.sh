#!/usr/bin/env bash
set -euo pipefail

if [ -z "${SUPABASE_PROJECT_ID:-}" ]; then
  echo "Set SUPABASE_PROJECT_ID"
  exit 1
fi

supabase gen types typescript --project-id "$SUPABASE_PROJECT_ID" > frontend/src/lib/supabase/types.ts
