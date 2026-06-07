# PostgREST Endpoints

## Base Path

```text
/rest/v1/
```

Supabase/PostgREST exposes the configured schemas in `supabase/config.toml`:

```toml
schemas = ["api", "cobie", "app"]
```

The `api` schema is the default profile. For tables in `cobie` or `app`, clients must select the schema profile:

```http
Accept-Profile: cobie
Content-Profile: cobie
```

In `supabase-js`, use the equivalent schema-scoped client:

```ts
supabase.schema('cobie').from('component')
```

## Authentication

All authenticated endpoints require:

```http
Authorization: Bearer <supabase-access-token>
apikey: <publishable-key>
```

The publishable key is not an authorization boundary. Tenant isolation is enforced by PostgreSQL RLS.

## Tenant Behavior

- `authenticated` users can read/write only rows for organizations where `auth.uid()` is a member.
- COBie sheet rows must pass `app.is_valid_cobie_scope(organization_id, workbook_id)`.
- This prevents a client from pairing `organization_id` from one tenant with `workbook_id` from another tenant.
- `anon` has no tenant data access.
- `DELETE` is not granted for MVP API clients.

## Common Request Patterns

Pagination:

```http
Range: 0-49
Prefer: count=exact
```

Sorting:

```text
?order=name.asc
```

Filters:

```text
?workbook_id=eq.<uuid>&name=ilike.*pump*
```

Full representation on writes:

```http
Prefer: return=representation
```

## API Read Models

These endpoints use the default `api` schema and are read-only.

| Endpoint | Source | Purpose | Common filters |
|---|---|---|---|
| `/cobie_assets` | `api.cobie_assets` | Component/type/space asset list | `workbook_id`, `component_name`, `type_name`, `space_name` |
| `/cobie_space_index` | `api.cobie_space_index` | Space list with floor category | `workbook_id`, `space_name`, `floor_name`, `category` |
| `/cobie_document_index` | `api.cobie_document_index` | Document metadata index | `workbook_id`, `sheet_name`, `row_name`, `category` |
| `/cobie_validation_issues` | `api.cobie_validation_issues` | Validation diagnostics | `workbook_id`, `severity`, `sheet_name`, `rule_id` |

Example:

```http
GET /rest/v1/cobie_assets?select=*&workbook_id=eq.<uuid>&order=component_name.asc
Range: 0-49
Prefer: count=exact
Authorization: Bearer <jwt>
apikey: <publishable-key>
```

## COBie CRUD Resources

Use the `cobie` profile for these endpoints.

| Endpoint | Table | MVP use | Key filters |
|---|---|---|---|
| `/workbook` | `cobie.workbook` | List/create/update workbook metadata | `organization_id`, `status`, `name` |
| `/contact` | `cobie.contact` | Contact CRUD | `workbook_id`, `email`, `company`, `category` |
| `/facility` | `cobie.facility` | Facility CRUD | `workbook_id`, `name`, `category` |
| `/floor` | `cobie.floor` | Floor CRUD | `workbook_id`, `name`, `category` |
| `/space` | `cobie.space` | Space CRUD | `workbook_id`, `name`, `floor_name`, `category` |
| `/zone` | `cobie.zone` | Zone CRUD | `workbook_id`, `name`, `category` |
| `/type` | `cobie.type` | Type CRUD | `workbook_id`, `name`, `category`, `manufacturer` |
| `/component` | `cobie.component` | Component CRUD | `workbook_id`, `name`, `type_name`, `space_name` |
| `/system` | `cobie.system` | System CRUD | `workbook_id`, `name`, `category` |
| `/attribute` | `cobie.attribute` | Attribute CRUD | `workbook_id`, `sheet_name`, `row_name`, `name` |
| `/document` | `cobie.document` | Document metadata CRUD | `workbook_id`, `sheet_name`, `row_name`, `category` |
| `/job` | `cobie.job` | Read-only first pass | `workbook_id`, `name`, `type_name`, `status` |
| `/resource` | `cobie.resource` | Read-only first pass | `workbook_id`, `name`, `category` |
| `/issue` | `cobie.issue` | Read-only first pass | `workbook_id`, `name`, `type`, `risk` |
| `/picklist` | `cobie.picklist` | Read-only first pass | `workbook_id`, `sheet_name`, `field_name`, `value` |

Example list:

```http
GET /rest/v1/component?select=*&workbook_id=eq.<uuid>&order=name.asc
Accept-Profile: cobie
Range: 0-49
Prefer: count=exact
Authorization: Bearer <jwt>
apikey: <publishable-key>
```

Example create:

```http
POST /rest/v1/component
Accept-Profile: cobie
Content-Profile: cobie
Content-Type: application/json
Prefer: return=representation
Authorization: Bearer <jwt>
apikey: <publishable-key>

{
  "organization_id": "<organization-uuid>",
  "workbook_id": "<workbook-uuid>",
  "name": "AHU-01",
  "type_name": "Air Handling Unit Type A",
  "space_name": "Plant Room 01"
}
```

If `workbook_id` does not belong to `organization_id`, RLS rejects the write.

Example update:

```http
PATCH /rest/v1/component?id=eq.<component-uuid>
Accept-Profile: cobie
Content-Profile: cobie
Content-Type: application/json
Prefer: return=representation
Authorization: Bearer <jwt>
apikey: <publishable-key>

{
  "description": "Updated asset description"
}
```

## App Resources

Use the `app` profile for these endpoints. MVP clients should treat them as read-only.

| Endpoint | Table | Purpose |
|---|---|---|
| `/organizations` | `app.organizations` | Organizations visible to the authenticated user |
| `/organization_members` | `app.organization_members` | Membership rows visible to organization members |

## RPC Endpoints

RPC endpoints use the default `api` schema.

### `POST /rpc/create_workbook`

Creates a workbook after checking `app.is_org_member(p_organization_id)`.

```http
POST /rest/v1/rpc/create_workbook
Content-Type: application/json
Authorization: Bearer <jwt>
apikey: <publishable-key>

{
  "p_organization_id": "<organization-uuid>",
  "p_name": "New COBie Workbook",
  "p_template_name": "COBie Template Q2 April 2026"
}
```

### `POST /rpc/validate_workbook`

Returns validation issues only when the authenticated user is a member of the workbook organization.

```http
POST /rest/v1/rpc/validate_workbook
Content-Type: application/json
Authorization: Bearer <jwt>
apikey: <publishable-key>

{
  "p_workbook_id": "<workbook-uuid>"
}
```

Response columns:

```text
severity, rule_id, sheet_name, row_name, field_name, message
```
