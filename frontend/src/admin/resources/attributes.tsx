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

const attributeFilters = [
  <TextInput key="workbook_id" source="workbook_id" label="Workbook ID" />,
  <TextInput key="sheet_name" source="sheet_name" label="Sheet" />,
  <TextInput key="row_name" source="row_name@ilike" label="Row" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <TextInput key="category" source="category" label="Category" />,
];

const requiredField = [required()];

function AttributeForm() {
  return (
    <SimpleForm>
      <TextInput source="organization_id" validate={requiredField} fullWidth />
      <TextInput source="workbook_id" validate={requiredField} fullWidth />
      <TextInput source="name" validate={requiredField} fullWidth />
      <TextInput source="category" fullWidth />
      <TextInput source="sheet_name" fullWidth />
      <TextInput source="row_name" fullWidth />
      <TextInput source="value" fullWidth />
      <TextInput source="unit" fullWidth />
      <TextInput source="description" fullWidth multiline />
      <TextInput source="allowed_values" fullWidth multiline />
    </SimpleForm>
  );
}

export function AttributeList() {
  return (
    <List
      filters={attributeFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="sheet_name" />
        <TextField source="row_name" />
        <TextField source="category" />
        <TextField source="value" />
        <TextField source="unit" />
      </Datagrid>
    </List>
  );
}

export function AttributeShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="organization_id" />
        <TextField source="workbook_id" />
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="sheet_name" />
        <TextField source="row_name" />
        <TextField source="value" />
        <TextField source="unit" />
        <TextField source="description" />
        <TextField source="allowed_values" />
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

export function AttributeCreate() {
  return (
    <Create>
      <AttributeForm />
    </Create>
  );
}

export function AttributeEdit() {
  return (
    <Edit>
      <AttributeForm />
    </Edit>
  );
}
