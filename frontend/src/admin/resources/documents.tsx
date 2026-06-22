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

const documentFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="category_document_id"
    source="category_document_id"
    reference="category_document"
    optionText="category_name"
    label="Category"
  />,
  <ReferenceAutocompleteInput
    key="stage_id"
    source="stage_id"
    reference="document_stage"
    optionText="stage_name"
    label="Stage"
  />,
];

const requiredField = [required()];

function DocumentForm() {
  return (
    <SimpleForm>
      <OrganizationReferenceInput validate={requiredField} />
      <WorkbookReferenceInput validate={requiredField} />
      <TextInput source="name" validate={requiredField} fullWidth />
      <WorkbookScopedReferenceInput
        source="category_document_id"
        reference="category_document"
        optionText="category_name"
        label="Category"
      />
      <WorkbookScopedReferenceInput
        source="approval_contact_id"
        reference="contact"
        optionText="email"
        label="Approval By"
      />
      <WorkbookScopedReferenceInput
        source="stage_id"
        reference="document_stage"
        optionText="stage_name"
        label="Stage"
      />
      <TextInput source="directory" fullWidth />
      <TextInput source="file" fullWidth />
      <TextInput source="reference" fullWidth />
      <TextInput source="description" fullWidth multiline />
    </SimpleForm>
  );
}

export function DocumentList() {
  return (
    <WorkbookScopedList
      filters={documentFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <LookupReferenceField
          source="category_document_id"
          reference="category_document"
          optionText="category_name"
          label="Category"
        />
        <LookupReferenceField
          source="stage_id"
          reference="document_stage"
          optionText="stage_name"
          label="Stage"
        />
        <TextField source="file" />
        <TextField source="reference" />
      </Datagrid>
    </WorkbookScopedList>
  );
}

export function DocumentShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="category_document_id"
          reference="category_document"
          optionText="category_name"
          label="Category"
        />
        <LookupReferenceField
          source="approval_contact_id"
          reference="contact"
          optionText="email"
          label="Approval By"
        />
        <LookupReferenceField
          source="stage_id"
          reference="document_stage"
          optionText="stage_name"
          label="Stage"
        />
        <TextField source="directory" />
        <TextField source="file" />
        <TextField source="reference" />
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

export function DocumentCreate() {
  return (
    <Create>
      <DocumentForm />
    </Create>
  );
}

export function DocumentEdit() {
  return (
    <Edit>
      <DocumentForm />
    </Edit>
  );
}
