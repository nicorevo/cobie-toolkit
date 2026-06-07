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

const floorFilters = [
  <TextInput key="workbook_id" source="workbook_id" label="Workbook ID" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <TextInput key="category" source="category" label="Category" />,
];

const requiredField = [required()];

function FloorForm() {
  return (
    <SimpleForm>
      <TextInput source="organization_id" validate={requiredField} fullWidth />
      <TextInput source="workbook_id" validate={requiredField} fullWidth />
      <TextInput source="name" validate={requiredField} fullWidth />
      <TextInput source="category" fullWidth />
      <TextInput source="elevation" fullWidth />
      <TextInput source="height" fullWidth />
      <TextInput source="description" fullWidth multiline />
    </SimpleForm>
  );
}

export function FloorList() {
  return (
    <List
      filters={floorFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="elevation" />
        <TextField source="height" />
        <TextField source="description" />
      </Datagrid>
    </List>
  );
}

export function FloorShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="organization_id" />
        <TextField source="workbook_id" />
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="elevation" />
        <TextField source="height" />
        <TextField source="description" />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}

export function FloorCreate() {
  return (
    <Create>
      <FloorForm />
    </Create>
  );
}

export function FloorEdit() {
  return (
    <Edit>
      <FloorForm />
    </Edit>
  );
}
