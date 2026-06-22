import {
  Datagrid,
  DateField,
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
import { WorkbookScopedList } from '../components/WorkbookScopedList';

const resourceFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="category_resource_id"
    source="category_resource_id"
    reference="category_resource"
    optionText="category_name"
    label="Category"
  />,
];

export function CobieResourceList() {
  return (
    <WorkbookScopedList
      filters={resourceFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <LookupReferenceField
          source="category_resource_id"
          reference="category_resource"
          optionText="category_name"
          label="Category"
        />
        <TextField source="description" />
      </Datagrid>
    </WorkbookScopedList>
  );
}

export function CobieResourceShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="category_resource_id"
          reference="category_resource"
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
