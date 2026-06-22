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

const systemFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="category_system_id"
    source="category_system_id"
    reference="category_system"
    optionText="category_name"
    label="Category"
  />,
];

const requiredField = [required()];

function SystemForm() {
  return (
    <SimpleForm>
      <OrganizationReferenceInput validate={requiredField} />
      <WorkbookReferenceInput validate={requiredField} />
      <TextInput source="name" validate={requiredField} fullWidth />
      <WorkbookScopedReferenceInput
        source="category_system_id"
        reference="category_system"
        optionText="category_name"
        label="Category"
      />
      <TextInput source="description" fullWidth multiline />
    </SimpleForm>
  );
}

export function SystemList() {
  return (
    <WorkbookScopedList
      filters={systemFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <LookupReferenceField
          source="category_system_id"
          reference="category_system"
          optionText="category_name"
          label="Category"
        />
        <TextField source="description" />
      </Datagrid>
    </WorkbookScopedList>
  );
}

export function SystemShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="category_system_id"
          reference="category_system"
          optionText="category_name"
          label="Category"
        />
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

export function SystemCreate() {
  return (
    <Create>
      <SystemForm />
    </Create>
  );
}

export function SystemEdit() {
  return (
    <Edit>
      <SystemForm />
    </Edit>
  );
}
