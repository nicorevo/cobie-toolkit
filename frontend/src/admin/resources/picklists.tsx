import {
  Datagrid,
  DateField,
  Show,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';
import {
  OrganizationReferenceField,
  WorkbookFilterInput,
  WorkbookReferenceField,
} from './referenceInputs';
import { WorkbookScopedList } from '../components/WorkbookScopedList';

const picklistFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="sheet_name" source="sheet_name" label="Sheet" />,
  <TextInput key="field_name" source="field_name" label="Field" />,
  <TextInput key="value" source="value@ilike" label="Value" alwaysOn />,
];

export function PicklistList() {
  return (
    <WorkbookScopedList
      filters={picklistFilters}
      perPage={25}
      sort={{ field: 'sheet_name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="sheet_name" />
        <TextField source="field_name" />
        <TextField source="value" />
        <TextField source="description" />
        <TextField source="source_version" />
      </Datagrid>
    </WorkbookScopedList>
  );
}

export function PicklistShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="sheet_name" />
        <TextField source="field_name" />
        <TextField source="value" />
        <TextField source="description" />
        <TextField source="source_version" />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}
