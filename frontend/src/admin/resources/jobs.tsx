import {
  Datagrid,
  DateField,
  List,
  Show,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';
import {
  LookupReferenceField,
  OrganizationReferenceField,
  ReferenceAutocompleteInput,
  WorkbookFilterInput,
  WorkbookReferenceField,
} from './referenceInputs';

const jobFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="status_id"
    source="status_id"
    reference="job_status"
    optionText="status_name"
    label="Status"
  />,
  <ReferenceAutocompleteInput
    key="type_id"
    source="type_id"
    reference="type"
    optionText="name"
    label="Type"
  />,
  <ReferenceAutocompleteInput
    key="category_job_id"
    source="category_job_id"
    reference="category_job"
    optionText="category_name"
    label="Category"
  />,
];

export function JobList() {
  return (
    <List
      filters={jobFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <LookupReferenceField
          source="status_id"
          reference="job_status"
          optionText="status_name"
          label="Status"
        />
        <LookupReferenceField
          source="category_job_id"
          reference="category_job"
          optionText="category_name"
          label="Category"
        />
        <LookupReferenceField
          source="type_id"
          reference="type"
          optionText="name"
          label="Type"
        />
        <TextField source="duration" />
        <TextField source="frequency" />
      </Datagrid>
    </List>
  );
}

export function JobShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="status_id"
          reference="job_status"
          optionText="status_name"
          label="Status"
        />
        <LookupReferenceField
          source="category_job_id"
          reference="category_job"
          optionText="category_name"
          label="Category"
        />
        <LookupReferenceField
          source="type_id"
          reference="type"
          optionText="name"
          label="Type"
        />
        <TextField source="description" />
        <TextField source="duration" />
        <TextField source="duration_unit" />
        <TextField source="frequency" />
        <TextField source="frequency_unit" />
        <TextField source="task_number" />
        <TextField source="start_value" />
        <TextField source="task_start_unit" />
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
