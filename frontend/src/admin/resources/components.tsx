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

const componentFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="type_id"
    source="type_id"
    reference="type"
    optionText="name"
    label="Type"
  />,
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
      <OrganizationReferenceInput validate={requiredField} />
      <WorkbookReferenceInput validate={requiredField} />
      <TextInput source="name" validate={requiredField} fullWidth />
      <WorkbookScopedReferenceInput
        source="type_id"
        reference="type"
        optionText="name"
        label="Type"
      />
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
    <WorkbookScopedList
      filters={componentFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <WorkbookReferenceField />
        <LookupReferenceField
          source="type_id"
          reference="type"
          optionText="name"
          label="Type"
        />
        <TextField source="serial_number" />
        <TextField source="asset_identifier" />
        <TextField source="tag_number" />
      </Datagrid>
    </WorkbookScopedList>
  );
}

export function ComponentShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="type_id"
          reference="type"
          optionText="name"
          label="Type"
        />
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
