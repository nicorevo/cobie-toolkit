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

const zoneFilters = [
  <TextInput key="workbook_id" source="workbook_id" label="Workbook ID" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <TextInput key="category" source="category" label="Category" />,
];

const requiredField = [required()];

function ZoneForm() {
  return (
    <SimpleForm>
      <TextInput source="organization_id" validate={requiredField} fullWidth />
      <TextInput source="workbook_id" validate={requiredField} fullWidth />
      <TextInput source="name" validate={requiredField} fullWidth />
      <TextInput source="category" fullWidth />
      <TextInput source="space_names" fullWidth multiline />
      <TextInput source="description" fullWidth multiline />
    </SimpleForm>
  );
}

export function ZoneList() {
  return (
    <List
      filters={zoneFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="space_names" />
        <TextField source="description" />
      </Datagrid>
    </List>
  );
}

export function ZoneShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="organization_id" />
        <TextField source="workbook_id" />
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="space_names" />
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

export function ZoneCreate() {
  return (
    <Create>
      <ZoneForm />
    </Create>
  );
}

export function ZoneEdit() {
  return (
    <Edit>
      <ZoneForm />
    </Edit>
  );
}
