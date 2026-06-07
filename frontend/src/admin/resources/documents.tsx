import {
  Create,
  Datagrid,
  DateField,
  Edit,
  List,
  required,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';

const documentFilters = [
  <TextInput key="workbook_id" source="workbook_id" label="Workbook ID" />,
  <TextInput key="sheet_name" source="sheet_name" label="Sheet" />,
  <TextInput key="row_name" source="row_name@ilike" label="Row" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <TextInput key="category" source="category" label="Category" />,
  <TextInput key="stage" source="stage" label="Stage" />,
];

const requiredField = [required()];

function DocumentForm() {
  return (
    <SimpleForm>
      <TextInput source="organization_id" validate={requiredField} fullWidth />
      <TextInput source="workbook_id" validate={requiredField} fullWidth />
      <TextInput source="name" validate={requiredField} fullWidth />
      <TextInput source="category" fullWidth />
      <TextInput source="approval_by" fullWidth />
      <TextInput source="stage" fullWidth />
      <TextInput source="sheet_name" fullWidth />
      <TextInput source="row_name" fullWidth />
      <TextInput source="directory" fullWidth />
      <TextInput source="file" fullWidth />
      <TextInput source="reference" fullWidth />
      <TextInput source="description" fullWidth multiline />
    </SimpleForm>
  );
}

export function DocumentList() {
  return (
    <List
      filters={documentFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="sheet_name" />
        <TextField source="row_name" />
        <TextField source="file" />
        <TextField source="reference" />
      </Datagrid>
    </List>
  );
}

export function DocumentShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="organization_id" />
        <TextField source="workbook_id" />
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="approval_by" />
        <TextField source="stage" />
        <TextField source="sheet_name" />
        <TextField source="row_name" />
        <TextField source="directory" />
        <TextField source="file" />
        <TextField source="reference" />
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

export function DocumentCreate() {
  return (
    <Create>
      <DocumentForm />
    </Create>
  );
}

export function DocumentEdit() {
  return (
    <Edit>
      <DocumentForm />
    </Edit>
  );
}
