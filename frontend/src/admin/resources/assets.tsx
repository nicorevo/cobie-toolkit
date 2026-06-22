import {
  Create,
  Datagrid,
  DateField,
  Edit,
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
import { WorkbookScopedList } from '../components/WorkbookScopedList';

const typeFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="category_type_id"
    source="category_type_id"
    reference="category_type"
    optionText="category_name"
    label="Category"
  />,
  <ReferenceAutocompleteInput
    key="asset_type_id"
    source="asset_type_id"
    reference="asset_type"
    optionText="asset_type_name"
    label="Asset Type"
  />,
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
      <OrganizationReferenceInput validate={requiredField} />
      <WorkbookReferenceInput validate={requiredField} />
      <TextInput source="name" validate={requiredField} fullWidth />
      <WorkbookScopedReferenceInput
        source="category_type_id"
        reference="category_type"
        optionText="category_name"
        label="Category"
      />
      <TextInput source="description" fullWidth multiline />
      <WorkbookScopedReferenceInput
        source="asset_type_id"
        reference="asset_type"
        optionText="asset_type_name"
        label="Asset Type"
      />
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
    <WorkbookScopedList
      filters={typeFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <LookupReferenceField
          source="category_type_id"
          reference="category_type"
          optionText="category_name"
          label="Category"
        />
        <LookupReferenceField
          source="asset_type_id"
          reference="asset_type"
          optionText="asset_type_name"
          label="Asset Type"
        />
        <TextField source="manufacturer" />
        <TextField source="model_number" />
      </Datagrid>
    </WorkbookScopedList>
  );
}

export function TypeShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="category_type_id"
          reference="category_type"
          optionText="category_name"
          label="Category"
        />
        <TextField source="description" />
        <LookupReferenceField
          source="asset_type_id"
          reference="asset_type"
          optionText="asset_type_name"
          label="Asset Type"
        />
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
