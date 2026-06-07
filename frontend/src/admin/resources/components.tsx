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

const componentFilters = [
  <TextInput key="workbook_id" source="workbook_id" label="Workbook ID" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <TextInput key="type_name" source="type_name@ilike" label="Type" />,
  <TextInput key="space_name" source="space_name@ilike" label="Space" />,
  <TextInput
    key="asset_identifier"
    source="asset_identifier@ilike"
    label="Asset Identifier"
  />,
];

const requiredField = [required()];

function ComponentForm() {
  return (
    <SimpleForm>
      <TextInput source="organization_id" validate={requiredField} fullWidth />
      <TextInput source="workbook_id" validate={requiredField} fullWidth />
      <TextInput source="name" validate={requiredField} fullWidth />
      <TextInput source="type_name" fullWidth />
      <TextInput source="space_name" fullWidth />
      <TextInput source="description" fullWidth multiline />
      <TextInput source="serial_number" fullWidth />
      <TextInput source="installation_date" fullWidth />
      <TextInput source="warranty_start_date" fullWidth />
      <TextInput source="tag_number" fullWidth />
      <TextInput source="bar_code" fullWidth />
      <TextInput source="asset_identifier" fullWidth />
    </SimpleForm>
  );
}

export function ComponentList() {
  return (
    <List
      filters={componentFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="workbook_id" />
        <TextField source="type_name" />
        <TextField source="space_name" />
        <TextField source="serial_number" />
        <TextField source="asset_identifier" />
        <TextField source="tag_number" />
      </Datagrid>
    </List>
  );
}

export function ComponentShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="organization_id" />
        <TextField source="workbook_id" />
        <TextField source="name" />
        <TextField source="type_name" />
        <TextField source="space_name" />
        <TextField source="description" />
        <TextField source="serial_number" />
        <TextField source="installation_date" />
        <TextField source="warranty_start_date" />
        <TextField source="tag_number" />
        <TextField source="bar_code" />
        <TextField source="asset_identifier" />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}

export function ComponentCreate() {
  return (
    <Create>
      <ComponentForm />
    </Create>
  );
}

export function ComponentEdit() {
  return (
    <Edit>
      <ComponentForm />
    </Edit>
  );
}
