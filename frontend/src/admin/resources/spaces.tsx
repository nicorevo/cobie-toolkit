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

const spaceFilters = [
  <TextInput key="workbook_id" source="workbook_id" label="Workbook ID" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <TextInput key="floor_name" source="floor_name@ilike" label="Floor" />,
  <TextInput key="category" source="category" label="Category" />,
  <TextInput key="room_tag" source="room_tag@ilike" label="Room Tag" />,
];

const requiredField = [required()];

function SpaceForm() {
  return (
    <SimpleForm>
      <TextInput source="organization_id" validate={requiredField} fullWidth />
      <TextInput source="workbook_id" validate={requiredField} fullWidth />
      <TextInput source="name" validate={requiredField} fullWidth />
      <TextInput source="category" fullWidth />
      <TextInput source="floor_name" fullWidth />
      <TextInput source="description" fullWidth multiline />
      <TextInput source="room_tag" fullWidth />
      <TextInput source="usable_height" fullWidth />
      <TextInput source="gross_area" fullWidth />
      <TextInput source="net_area" fullWidth />
    </SimpleForm>
  );
}

export function SpaceList() {
  return (
    <List
      filters={spaceFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="floor_name" />
        <TextField source="category" />
        <TextField source="room_tag" />
        <TextField source="gross_area" />
        <TextField source="net_area" />
      </Datagrid>
    </List>
  );
}

export function SpaceShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="organization_id" />
        <TextField source="workbook_id" />
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="floor_name" />
        <TextField source="description" />
        <TextField source="room_tag" />
        <TextField source="usable_height" />
        <TextField source="gross_area" />
        <TextField source="net_area" />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}

export function SpaceCreate() {
  return (
    <Create>
      <SpaceForm />
    </Create>
  );
}

export function SpaceEdit() {
  return (
    <Edit>
      <SpaceForm />
    </Edit>
  );
}
