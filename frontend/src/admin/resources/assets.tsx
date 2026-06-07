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

const typeFilters = [
  <TextInput key="workbook_id" source="workbook_id" label="Workbook ID" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <TextInput key="category" source="category" label="Category" />,
  <TextInput key="asset_type" source="asset_type" label="Asset Type" />,
  <TextInput
    key="manufacturer"
    source="manufacturer@ilike"
    label="Manufacturer"
  />,
];

const requiredField = [required()];

function TypeForm() {
  return (
    <SimpleForm>
      <TextInput source="organization_id" validate={requiredField} fullWidth />
      <TextInput source="workbook_id" validate={requiredField} fullWidth />
      <TextInput source="name" validate={requiredField} fullWidth />
      <TextInput source="category" fullWidth />
      <TextInput source="description" fullWidth multiline />
      <TextInput source="asset_type" fullWidth />
      <TextInput source="manufacturer" fullWidth />
      <TextInput source="model_number" fullWidth />
      <TextInput source="model_reference" fullWidth />
      <TextInput source="warranty_guarantor_parts" fullWidth />
      <TextInput source="warranty_duration_parts" fullWidth />
      <TextInput source="warranty_guarantor_labor" fullWidth />
      <TextInput source="warranty_duration_labor" fullWidth />
      <TextInput source="warranty_duration_unit" fullWidth />
      <TextInput source="replacement_cost" fullWidth />
      <TextInput source="expected_life" fullWidth />
      <TextInput source="duration_unit" fullWidth />
      <TextInput source="features" fullWidth multiline />
      <TextInput source="accessibility_performance" fullWidth />
      <TextInput source="code_performance" fullWidth />
      <TextInput source="sustainability_performance" fullWidth />
      <TextInput source="size" fullWidth />
      <TextInput source="color" fullWidth />
      <TextInput source="finish" fullWidth />
      <TextInput source="grade" fullWidth />
      <TextInput source="material" fullWidth />
      <TextInput source="constituents" fullWidth />
      <TextInput source="shape" fullWidth />
      <TextInput source="nominal_length" fullWidth />
      <TextInput source="nominal_width" fullWidth />
      <TextInput source="nominal_height" fullWidth />
    </SimpleForm>
  );
}

export function TypeList() {
  return (
    <List
      filters={typeFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="asset_type" />
        <TextField source="manufacturer" />
        <TextField source="model_number" />
      </Datagrid>
    </List>
  );
}

export function TypeShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="organization_id" />
        <TextField source="workbook_id" />
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="description" />
        <TextField source="asset_type" />
        <TextField source="manufacturer" />
        <TextField source="model_number" />
        <TextField source="model_reference" />
        <TextField source="warranty_description" />
        <TextField source="warranty_duration_parts" />
        <TextField source="warranty_duration_labor" />
        <TextField source="replacement_cost" />
        <TextField source="expected_life" />
        <TextField source="size" />
        <TextField source="material" />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}

export function TypeCreate() {
  return (
    <Create>
      <TypeForm />
    </Create>
  );
}

export function TypeEdit() {
  return (
    <Edit>
      <TypeForm />
    </Edit>
  );
}
