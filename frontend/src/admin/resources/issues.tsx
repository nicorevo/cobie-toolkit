import {
  Datagrid,
  DateField,
  List,
  Show,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';

const issueFilters = [
  <TextInput key="workbook_id" source="workbook_id" label="Workbook ID" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <TextInput key="type" source="type" label="Type" />,
  <TextInput key="risk" source="risk" label="Risk" />,
  <TextInput key="owner" source="owner@ilike" label="Owner" />,
];

export function IssueList() {
  return (
    <List
      filters={issueFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="type" />
        <TextField source="risk" />
        <TextField source="chance" />
        <TextField source="impact" />
        <TextField source="owner" />
      </Datagrid>
    </List>
  );
}

export function IssueShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="organization_id" />
        <TextField source="workbook_id" />
        <TextField source="name" />
        <TextField source="type" />
        <TextField source="risk" />
        <TextField source="chance" />
        <TextField source="impact" />
        <TextField source="owner" />
        <TextField source="sheet_name" />
        <TextField source="row_name" />
        <TextField source="description" />
        <TextField source="mitigation" />
        <TextField source="ext_system" />
        <TextField source="ext_identifier" />
        <TextField source="ext_object" />
        <TextField source="source_sheet" />
        <TextField source="source_row_number" />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}
