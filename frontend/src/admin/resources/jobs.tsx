import {
  Datagrid,
  DateField,
  List,
  Show,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';

const jobFilters = [
  <TextInput key="workbook_id" source="workbook_id" label="Workbook ID" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <TextInput key="status" source="status" label="Status" />,
  <TextInput key="type_name" source="type_name@ilike" label="Type" />,
  <TextInput key="category" source="category" label="Category" />,
];

export function JobList() {
  return (
    <List
      filters={jobFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="status" />
        <TextField source="category" />
        <TextField source="type_name" />
        <TextField source="duration" />
        <TextField source="frequency" />
      </Datagrid>
    </List>
  );
}

export function JobShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="organization_id" />
        <TextField source="workbook_id" />
        <TextField source="name" />
        <TextField source="status" />
        <TextField source="category" />
        <TextField source="type_name" />
        <TextField source="description" />
        <TextField source="duration" />
        <TextField source="duration_unit" />
        <TextField source="frequency" />
        <TextField source="frequency_unit" />
        <TextField source="task_number" />
        <TextField source="resource_names" />
        <TextField source="priors" />
        <TextField source="start_value" />
        <TextField source="task_start_unit" />
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
