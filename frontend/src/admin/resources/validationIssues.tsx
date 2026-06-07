import {
  Datagrid,
  List,
  Show,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';

const validationIssueFilters = [
  <TextInput key="workbook_id" source="workbook_id" label="Workbook ID" />,
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
        <TextField source="workbook_id" />
        <TextField source="organization_id" />
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
