# PostgREST endpoints

## Base path

```text
/rest/v1/
```

## Examples

### List components

```http
GET /rest/v1/component?select=*&workbook_id=eq.<uuid>&order=name.asc
Range: 0-49
Prefer: count=exact
Authorization: Bearer <jwt>
apikey: <publishable-key>
```

### Create component

```http
POST /rest/v1/component
Content-Type: application/json
Prefer: return=representation
Authorization: Bearer <jwt>
apikey: <publishable-key>

{
  "organization_id": "<uuid>",
  "workbook_id": "<uuid>",
  "name": "AHU-01",
  "type_name": "Air Handling Unit Type A",
  "space_name": "Plant Room 01"
}
```

### Validation

```http
POST /rest/v1/rpc/validate_workbook
Content-Type: application/json

{
  "p_workbook_id": "<uuid>"
}
```

## Nota

In Supabase la disponibilità degli endpoint dipende dagli schemi esposti e dai grants/RLS.
