#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SUPABASE_BIN="${SUPABASE_BIN:-$ROOT_DIR/.local/bin/supabase}"
DB_CONTAINER="${SUPABASE_DB_CONTAINER:-supabase_db_cobie-react-admin}"

TMP_DIR="$(mktemp -d)"
STATUS=""
RESPONSE_FILE=""

ORG_A="50000000-0000-4000-8000-000000000001"
ORG_B="50000000-0000-4000-8000-000000000002"
USER_A="60000000-0000-4000-8000-000000000001"
USER_B="60000000-0000-4000-8000-000000000002"
WORKBOOK_A="70000000-0000-4000-8000-000000000001"
WORKBOOK_B="70000000-0000-4000-8000-000000000002"
CONTACT_A="80000000-0000-4000-8000-000000000000"
TYPE_A="80000000-0000-4000-8000-000000000001"
FACILITY_A="80000000-0000-4000-8000-000000000002"
ZONE_A="80000000-0000-4000-8000-000000000003"
SYSTEM_A="80000000-0000-4000-8000-000000000004"
ATTRIBUTE_A="80000000-0000-4000-8000-000000000005"
DOCUMENT_A="80000000-0000-4000-8000-000000000006"
JOB_A="80000000-0000-4000-8000-000000000007"
RESOURCE_A="80000000-0000-4000-8000-000000000008"
ISSUE_A="80000000-0000-4000-8000-000000000009"
PICKLIST_A="80000000-0000-4000-8000-000000000010"
FLOOR_A="80000000-0000-4000-8000-000000000011"
SPACE_A="80000000-0000-4000-8000-000000000012"
COMPONENT_A="90000000-0000-4000-8000-000000000001"
COMPONENT_B="90000000-0000-4000-8000-000000000002"
COMPONENT_CREATED="90000000-0000-4000-8000-000000000011"

load_supabase_env() {
  local status_env
  status_env="$("$SUPABASE_BIN" status -o env)"

  REST_URL="$(read_status_var "$status_env" REST_URL)"
  ANON_KEY="$(read_status_var "$status_env" ANON_KEY)"
  JWT_SECRET="$(read_status_var "$status_env" JWT_SECRET)"

  : "${REST_URL:?Missing REST_URL from supabase status}"
  : "${ANON_KEY:?Missing ANON_KEY from supabase status}"
  : "${JWT_SECRET:?Missing JWT_SECRET from supabase status}"
}

read_status_var() {
  local status_env="$1"
  local name="$2"

  printf '%s\n' "$status_env" \
    | sed -n "s/^${name}=//p" \
    | tail -n 1 \
    | sed 's/^"//; s/"$//'
}

psql_exec() {
  docker exec -i "$DB_CONTAINER" psql -v ON_ERROR_STOP=1 -U postgres -d postgres
}

cleanup_data() {
  psql_exec <<SQL >/dev/null
delete from cobie.component where id in ('$COMPONENT_CREATED', '$COMPONENT_A', '$COMPONENT_B');
delete from cobie.picklist where id = '$PICKLIST_A';
delete from cobie.issue where id = '$ISSUE_A';
delete from cobie.resource where id = '$RESOURCE_A';
delete from cobie.job where id = '$JOB_A';
delete from cobie.document where id = '$DOCUMENT_A';
delete from cobie.attribute where id = '$ATTRIBUTE_A';
delete from cobie.system where id = '$SYSTEM_A';
delete from cobie.zone where id = '$ZONE_A';
delete from cobie.space where id = '$SPACE_A';
delete from cobie.floor where id = '$FLOOR_A';
delete from cobie.facility where id = '$FACILITY_A';
delete from cobie.type where id = '$TYPE_A';
delete from cobie.contact where id = '$CONTACT_A';
delete from cobie.workbook where id in ('$WORKBOOK_A', '$WORKBOOK_B');
delete from app.organization_members where organization_id in ('$ORG_A', '$ORG_B');
delete from app.organizations where id in ('$ORG_A', '$ORG_B');
SQL
}

cleanup() {
  cleanup_data
  rm -rf "$TMP_DIR"
}

make_jwt() {
  python3 - "$JWT_SECRET" "$1" <<'PY'
import base64
import hashlib
import hmac
import json
import sys
import time

secret = sys.argv[1].encode()
subject = sys.argv[2]

def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()

header = {"alg": "HS256", "typ": "JWT"}
now = int(time.time())
payload = {
    "aud": "authenticated",
    "exp": now + 3600,
    "iat": now,
    "iss": "supabase-demo",
    "role": "authenticated",
    "sub": subject,
}

encoded_header = b64url(json.dumps(header, separators=(",", ":")).encode())
encoded_payload = b64url(json.dumps(payload, separators=(",", ":")).encode())
message = f"{encoded_header}.{encoded_payload}".encode()
signature = b64url(hmac.new(secret, message, hashlib.sha256).digest())
print(f"{encoded_header}.{encoded_payload}.{signature}")
PY
}

seed_data() {
  cleanup_data

  psql_exec <<SQL >/dev/null
insert into app.organizations (id, name, slug)
values
  ('$ORG_A', 'API Smoke Org A', 'api-smoke-org-a'),
  ('$ORG_B', 'API Smoke Org B', 'api-smoke-org-b');

insert into app.organization_members (organization_id, user_id, role)
values
  ('$ORG_A', '$USER_A', 'admin'),
  ('$ORG_B', '$USER_B', 'admin');

insert into cobie.workbook (id, organization_id, name)
values
  ('$WORKBOOK_A', '$ORG_A', 'API Smoke Workbook A'),
  ('$WORKBOOK_B', '$ORG_B', 'API Smoke Workbook B');

insert into cobie.contact (
  id,
  organization_id,
  workbook_id,
  email,
  company,
  given_name,
  family_name
)
values (
  '$CONTACT_A',
  '$ORG_A',
  '$WORKBOOK_A',
  'api-smoke@example.test',
  'API Smoke Company',
  'API',
  'Smoke'
);

insert into cobie.type (
  id,
  organization_id,
  workbook_id,
  name,
  manufacturer
)
values (
  '$TYPE_A',
  '$ORG_A',
  '$WORKBOOK_A',
  'API Smoke Type A',
  'Smoke Manufacturer'
);

insert into cobie.facility (
  id,
  organization_id,
  workbook_id,
  name,
  project_name,
  site_name
)
values (
  '$FACILITY_A',
  '$ORG_A',
  '$WORKBOOK_A',
  'API Smoke Facility A',
  'API Smoke Project',
  'API Smoke Site'
);

insert into cobie.floor (
  id,
  organization_id,
  workbook_id,
  name
)
values (
  '$FLOOR_A',
  '$ORG_A',
  '$WORKBOOK_A',
  'API Smoke Floor A'
);

insert into cobie.space (
  id,
  organization_id,
  workbook_id,
  name,
  floor_id
)
values (
  '$SPACE_A',
  '$ORG_A',
  '$WORKBOOK_A',
  'API Smoke Space A',
  '$FLOOR_A'
);

insert into cobie.zone (
  id,
  organization_id,
  workbook_id,
  name,
  description
)
values (
  '$ZONE_A',
  '$ORG_A',
  '$WORKBOOK_A',
  'API Smoke Zone A',
  'Tenant A zone'
);

insert into cobie.component (
  id,
  organization_id,
  workbook_id,
  name,
  type_id,
  description
)
values
  (
    '$COMPONENT_A',
    '$ORG_A',
    '$WORKBOOK_A',
    'API Smoke Component A',
    null,
    'Tenant A component'
  ),
  (
    '$COMPONENT_B',
    '$ORG_B',
    '$WORKBOOK_B',
    'API Smoke Component B',
    null,
    'Tenant B component'
  );

insert into cobie.component_space (
  organization_id,
  workbook_id,
  component_id,
  space_id
)
values (
  '$ORG_A',
  '$WORKBOOK_A',
  '$COMPONENT_A',
  '$SPACE_A'
);

insert into cobie.system (
  id,
  organization_id,
  workbook_id,
  name,
  description
)
values (
  '$SYSTEM_A',
  '$ORG_A',
  '$WORKBOOK_A',
  'API Smoke System A',
  'Tenant A system'
);

insert into cobie.system_component (
  organization_id,
  workbook_id,
  system_id,
  component_id
)
values (
  '$ORG_A',
  '$WORKBOOK_A',
  '$SYSTEM_A',
  '$COMPONENT_A'
);

insert into cobie.attribute (
  id,
  organization_id,
  workbook_id,
  name,
  value
)
values (
  '$ATTRIBUTE_A',
  '$ORG_A',
  '$WORKBOOK_A',
  'API Smoke Attribute A',
  'Smoke Value'
);

insert into cobie.document (
  id,
  organization_id,
  workbook_id,
  name,
  reference
)
values (
  '$DOCUMENT_A',
  '$ORG_A',
  '$WORKBOOK_A',
  'API Smoke Document A',
  'Smoke Reference'
);

insert into cobie.job (
  id,
  organization_id,
  workbook_id,
  name,
  type_id,
  duration,
  frequency
)
values (
  '$JOB_A',
  '$ORG_A',
  '$WORKBOOK_A',
  'API Smoke Job A',
  '$TYPE_A',
  '1',
  'Monthly'
);

insert into cobie.resource (
  id,
  organization_id,
  workbook_id,
  name,
  description
)
values (
  '$RESOURCE_A',
  '$ORG_A',
  '$WORKBOOK_A',
  'API Smoke Resource A',
  'Tenant A resource'
);

insert into cobie.issue (
  id,
  organization_id,
  workbook_id,
  name,
  description
)
values (
  '$ISSUE_A',
  '$ORG_A',
  '$WORKBOOK_A',
  'API Smoke Issue A',
  'Tenant A issue'
);

insert into cobie.picklist (
  id,
  organization_id,
  workbook_id,
  sheet_name,
  field_name,
  value,
  description,
  source_version
)
values (
  '$PICKLIST_A',
  '$ORG_A',
  '$WORKBOOK_A',
  'Component',
  'Category',
  'SmokePicklistValue',
  'Tenant A picklist value',
  'API Smoke'
);
SQL
}

api_request() {
  local method="$1"
  local path="$2"
  local token="$3"
  local schema="${4:-}"
  local body="${5:-}"
  local response="$TMP_DIR/response.json"
  local headers=(
    -H "apikey: $ANON_KEY"
    -H "Authorization: Bearer $token"
    -H "Content-Type: application/json"
  )

  if [[ -n "$schema" ]]; then
    headers+=(-H "Accept-Profile: $schema")
    if [[ "$method" != "GET" && "$method" != "HEAD" ]]; then
      headers+=(-H "Content-Profile: $schema")
    fi
  fi

  if [[ "$method" != "GET" && "$method" != "HEAD" ]]; then
    headers+=(-H "Prefer: return=representation")
  else
    headers+=(-H "Prefer: count=exact")
  fi

  if [[ -n "$body" ]]; then
    STATUS="$(
      curl -sS -w '%{http_code}' -o "$response" \
        -X "$method" "${REST_URL}/${path}" \
        "${headers[@]}" \
        --data "$body"
    )"
  else
    STATUS="$(
      curl -sS -w '%{http_code}' -o "$response" \
        -X "$method" "${REST_URL}/${path}" \
        "${headers[@]}"
    )"
  fi

  RESPONSE_FILE="$response"
}

assert_status() {
  local name="$1"
  local expected="$2"

  if [[ "$STATUS" != "$expected" ]]; then
    echo "API smoke failed: $name expected HTTP $expected, got $STATUS" >&2
    cat "$RESPONSE_FILE" >&2
    exit 1
  fi

  echo "ok: $name"
}

assert_status_at_least() {
  local name="$1"
  local minimum="$2"

  if (( STATUS < minimum )); then
    echo "API smoke failed: $name expected HTTP >= $minimum, got $STATUS" >&2
    cat "$RESPONSE_FILE" >&2
    exit 1
  fi

  echo "ok: $name"
}

assert_array_len() {
  local name="$1"
  local expected="$2"

  python3 - "$RESPONSE_FILE" "$expected" "$name" <<'PY'
import json
import sys

path, expected, name = sys.argv[1], int(sys.argv[2]), sys.argv[3]
with open(path, "r", encoding="utf-8") as handle:
    data = json.load(handle)

if not isinstance(data, list):
    raise SystemExit(f"API smoke failed: {name} response is not an array: {data!r}")

if len(data) != expected:
    raise SystemExit(
        f"API smoke failed: {name} expected {expected} rows, got {len(data)}: {data!r}"
    )

print(f"ok: {name}")
PY
}

assert_array_len_at_least() {
  local name="$1"
  local minimum="$2"

  python3 - "$RESPONSE_FILE" "$minimum" "$name" <<'PY'
import json
import sys

path, minimum, name = sys.argv[1], int(sys.argv[2]), sys.argv[3]
with open(path, "r", encoding="utf-8") as handle:
    data = json.load(handle)

if not isinstance(data, list):
    raise SystemExit(f"API smoke failed: {name} response is not an array: {data!r}")

if len(data) < minimum:
    raise SystemExit(
        f"API smoke failed: {name} expected at least {minimum} rows, got {len(data)}: {data!r}"
    )

print(f"ok: {name}")
PY
}

assert_first_field() {
  local name="$1"
  local field="$2"
  local expected="$3"

  python3 - "$RESPONSE_FILE" "$field" "$expected" "$name" <<'PY'
import json
import sys

path, field, expected, name = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
with open(path, "r", encoding="utf-8") as handle:
    data = json.load(handle)

if not isinstance(data, list) or not data:
    raise SystemExit(f"API smoke failed: {name} response is empty or not an array: {data!r}")

actual = data[0].get(field)
if actual != expected:
    raise SystemExit(
        f"API smoke failed: {name} expected {field}={expected!r}, got {actual!r}: {data!r}"
    )

print(f"ok: {name}")
PY
}

main() {
  echo "API smoke: starting"
  load_supabase_env
  trap cleanup EXIT
  seed_data

  local token_a
  local token_b
  token_a="$(make_jwt "$USER_A")"
  token_b="$(make_jwt "$USER_B")"

  api_request GET 'workbook?select=id,name&name=ilike.*API%20Smoke%20Workbook*&order=name.asc' "$token_a" cobie
  assert_status 'user A lists workbooks' 200
  assert_array_len 'user A sees one matching workbook' 1

  api_request GET "component?select=id,name,workbook_id&workbook_id=eq.${WORKBOOK_A}" "$token_a" cobie
  assert_status 'user A lists tenant A components' 200
  assert_array_len 'user A sees one tenant A component' 1

  api_request GET "component?select=id,name,workbook_id&workbook_id=eq.${WORKBOOK_A}" "$token_b" cobie
  assert_status 'user B lists tenant A components' 200
  assert_array_len 'user B sees zero tenant A components' 0

  api_request GET 'facility?select=id,name,project_name&project_name=ilike.*Smoke*' "$token_a" cobie
  assert_status 'user A filters facilities' 200
  assert_array_len 'user A sees one facility' 1

  api_request GET 'type?select=id,name,manufacturer&manufacturer=ilike.*Smoke*' "$token_a" cobie
  assert_status 'user A filters types' 200
  assert_array_len 'user A sees one type' 1

  api_request GET 'contact?select=id,email,company&company=ilike.*Smoke*' "$token_a" cobie
  assert_status 'user A filters contacts' 200
  assert_array_len 'user A sees one contact' 1

  api_request GET 'zone?select=id,name,description&description=ilike.*zone*' "$token_a" cobie
  assert_status 'user A filters zones' 200
  assert_array_len 'user A sees one zone' 1

  api_request GET 'system?select=id,name,description&description=ilike.*system*' "$token_a" cobie
  assert_status 'user A filters systems' 200
  assert_array_len 'user A sees one system' 1

  api_request GET 'attribute?select=id,name,value&value=eq.Smoke%20Value' "$token_a" cobie
  assert_status 'user A filters attributes' 200
  assert_array_len 'user A sees one attribute' 1

  api_request GET 'document?select=id,name,reference&reference=eq.Smoke%20Reference' "$token_a" cobie
  assert_status 'user A filters documents' 200
  assert_array_len 'user A sees one document' 1

  api_request GET "job?select=id,name,type_id&type_id=eq.${TYPE_A}" "$token_a" cobie
  assert_status 'user A filters jobs' 200
  assert_array_len 'user A sees one job' 1

  api_request GET 'resource?select=id,name,description&description=ilike.*resource*' "$token_a" cobie
  assert_status 'user A filters resources' 200
  assert_array_len 'user A sees one resource' 1

  api_request GET 'issue?select=id,name,description&description=ilike.*issue*' "$token_a" cobie
  assert_status 'user A filters issues' 200
  assert_array_len 'user A sees one issue' 1

  api_request GET 'picklist?select=id,sheet_name,field_name,value&value=eq.SmokePicklistValue' "$token_a" cobie
  assert_status 'user A filters picklists' 200
  assert_array_len 'user A sees one picklist' 1

  api_request POST component "$token_a" cobie "{
    \"id\": \"$COMPONENT_CREATED\",
    \"organization_id\": \"$ORG_A\",
    \"workbook_id\": \"$WORKBOOK_A\",
    \"name\": \"API Smoke Component Created\",
    \"type_id\": \"$TYPE_A\",
    \"description\": \"Created via API smoke\"
  }"
  assert_status 'user A creates component' 201
  assert_array_len 'component create returns one row' 1

  api_request PATCH "component?id=eq.${COMPONENT_CREATED}" "$token_a" cobie '{
    "description": "Updated via API smoke"
  }'
  assert_status 'user A updates component' 200
  assert_first_field 'component update returns changed description' description 'Updated via API smoke'

  api_request POST component "$token_a" cobie "{
    \"id\": \"90000000-0000-4000-8000-000000000099\",
    \"organization_id\": \"$ORG_A\",
    \"workbook_id\": \"$WORKBOOK_B\",
    \"name\": \"API Smoke Bad Cross Tenant Component\"
  }"
  assert_status_at_least 'user A cannot create cross-tenant component' 400

  api_request GET "cobie_validation_issues?select=severity,rule_id,sheet_name,row_name,field_name,message&workbook_id=eq.${WORKBOOK_A}" "$token_a" api
  assert_status 'user A lists validation issues' 200
  assert_array_len_at_least 'validation view returns findings' 1

  api_request POST rpc/validate_workbook "$token_a" api "{
    \"p_workbook_id\": \"$WORKBOOK_A\"
  }"
  assert_status 'user A calls validate_workbook RPC' 200
  assert_array_len_at_least 'validate_workbook RPC returns findings' 1

  echo "API smoke: passed"
}

main "$@"
