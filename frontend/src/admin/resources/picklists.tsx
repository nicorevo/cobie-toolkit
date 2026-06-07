import {
  Datagrid,
  DateField,
  List,
  Show,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';

const picklistFilters = [
  <TextInput key="workbook_id" source="workbook_id" label="Workbook ID" />,
  <TextInput key="sheet_name" source="sheet_name" label="Sheet" />,
  <TextInput key="field_name" source="field_name" label="Field" />,
  <TextInput key="value" source="value@ilike" label="Value" alwaysOn />,
];

export function PicklistList() {
  return (
    <List
      filters={picklistFilters}
      perPage={25}
      sort={{ field: 'sheet_name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="sheet_name" />
        <TextField source="field_name" />
        <TextField source="value" />
        <TextField source="description" />
        <TextField source="source_version" />
      </Datagrid>
    </List>
  );
}

export function PicklistShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="organization_id" />
        <TextField source="workbook_id" />
        <TextField source="sheet_name" />
        <TextField source="field_name" />
        <TextField source="value" />
        <TextField source="description" />
        <TextField source="source_version" />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}
