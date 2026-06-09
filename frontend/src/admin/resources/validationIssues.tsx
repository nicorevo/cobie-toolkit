import {
  Datagrid,
  List,
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

const validationIssueFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="severity" source="severity" label="Severity" alwaysOn />,
  <TextInput key="sheet_name" source="sheet_name" label="Sheet" />,
  <TextInput key="rule_id" source="rule_id" label="Rule" />,
];

export function ValidationIssueList() {
  return (
    <List
      filters={validationIssueFilters}
      perPage={25}
      sort={{ field: 'severity', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="severity" />
        <TextField source="rule_id" />
        <TextField source="sheet_name" />
        <TextField source="row_name" />
        <TextField source="field_name" />
        <TextField source="message" />
      </Datagrid>
    </List>
  );
}

export function ValidationIssueShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <WorkbookReferenceField />
        <OrganizationReferenceField />
        <TextField source="severity" />
        <TextField source="rule_id" />
        <TextField source="sheet_name" />
        <TextField source="row_name" />
        <TextField source="field_name" />
        <TextField source="message" />
      </SimpleShowLayout>
    </Show>
  );
}
