import {
  Datagrid,
  DateField,
  List,
  Show,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';

const resourceFilters = [
  <TextInput key="workbook_id" source="workbook_id" label="Workbook ID" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <TextInput key="category" source="category" label="Category" />,
];

export function CobieResourceList() {
  return (
    <List
      filters={resourceFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="description" />
      </Datagrid>
    </List>
  );
}

export function CobieResourceShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="organization_id" />
        <TextField source="workbook_id" />
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="description" />
        <TextField source="external_system" />
        <TextField source="external_identifier" />
        <TextField source="external_object" />
        <TextField source="source_sheet" />
        <TextField source="source_row_number" />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}
