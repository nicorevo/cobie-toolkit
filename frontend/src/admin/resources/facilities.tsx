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

const facilityFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="category_facility_id"
    source="category_facility_id"
    reference="category_facility"
    optionText="category_name"
    label="Category"
  />,
  <TextInput key="project_name" source="project_name@ilike" label="Project" />,
];

const requiredField = [required()];

function FacilityForm() {
  return (
    <SimpleForm>
      <OrganizationReferenceInput validate={requiredField} />
      <WorkbookReferenceInput validate={requiredField} />
      <TextInput source="name" validate={requiredField} fullWidth />
      <WorkbookScopedReferenceInput
        source="category_facility_id"
        reference="category_facility"
        optionText="category_name"
        label="Category"
      />
      <TextInput source="project_name" fullWidth />
      <TextInput source="project_description" fullWidth multiline />
      <TextInput source="site_name" fullWidth />
      <TextInput source="site_description" fullWidth multiline />
      <TextInput source="phase" fullWidth />
      <TextInput source="linear_units" fullWidth />
      <TextInput source="area_units" fullWidth />
      <TextInput source="area_measurement" fullWidth />
      <TextInput source="volume_units" fullWidth />
      <TextInput source="currency_unit" fullWidth />
      <TextInput source="description" fullWidth multiline />
    </SimpleForm>
  );
}

export function FacilityList() {
  return (
    <List
      filters={facilityFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <LookupReferenceField
          source="category_facility_id"
          reference="category_facility"
          optionText="category_name"
          label="Category"
        />
        <TextField source="project_name" />
        <TextField source="site_name" />
        <TextField source="phase" />
      </Datagrid>
    </List>
  );
}

export function FacilityShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="category_facility_id"
          reference="category_facility"
          optionText="category_name"
          label="Category"
        />
        <TextField source="project_name" />
        <TextField source="project_description" />
        <TextField source="site_name" />
        <TextField source="site_description" />
        <TextField source="phase" />
        <TextField source="linear_units" />
        <TextField source="area_units" />
        <TextField source="area_measurement" />
        <TextField source="volume_units" />
        <TextField source="currency_unit" />
        <TextField source="description" />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}

export function FacilityCreate() {
  return (
    <Create>
      <FacilityForm />
    </Create>
  );
}

export function FacilityEdit() {
  return (
    <Edit>
      <FacilityForm />
    </Edit>
  );
}
