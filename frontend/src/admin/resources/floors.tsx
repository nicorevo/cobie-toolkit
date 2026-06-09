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
import {
  LookupReferenceField,
  OrganizationReferenceField,
  OrganizationReferenceInput,
  ReferenceAutocompleteInput,
  WorkbookFilterInput,
  WorkbookReferenceField,
  WorkbookReferenceInput,
  WorkbookScopedReferenceInput,
} from './referenceInputs';

const floorFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="category_floor_id"
    source="category_floor_id"
    reference="category_floor"
    optionText="category_name"
    label="Category"
  />,
];

const requiredField = [required()];

function FloorForm() {
  return (
    <SimpleForm>
      <OrganizationReferenceInput validate={requiredField} />
      <WorkbookReferenceInput validate={requiredField} />
      <TextInput source="name" validate={requiredField} fullWidth />
      <WorkbookScopedReferenceInput
        source="category_floor_id"
        reference="category_floor"
        optionText="category_name"
        label="Category"
      />
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
        <LookupReferenceField
          source="category_floor_id"
          reference="category_floor"
          optionText="category_name"
          label="Category"
        />
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
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="category_floor_id"
          reference="category_floor"
          optionText="category_name"
          label="Category"
        />
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
