#!/usr/bin/env bash
set -euo pipefail

# Verificare sempre la pagina nima prima dell'uso:
# https://wearenima.im/resources/construction-operations-building-information-exchange-cobie/

COBIE_TEMPLATE_URL="https://wearenima.im/wp-content/uploads/2024/06/COBie-UK-2.4-Template-2026-04.xltx.zip"
OUT_DIR="${1:-./.local/cobie-templates}"

mkdir -p "$OUT_DIR"

echo "Downloading candidate COBie template:"
echo "$COBIE_TEMPLATE_URL"
curl -L "$COBIE_TEMPLATE_URL" -o "$OUT_DIR/COBie-UK-2.4-Template-2026-04.xltx.zip"

echo "Checksum:"
sha256sum "$OUT_DIR/COBie-UK-2.4-Template-2026-04.xltx.zip"
