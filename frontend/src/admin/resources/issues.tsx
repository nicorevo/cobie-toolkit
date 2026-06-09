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

const issueFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="issue_type_id"
    source="issue_type_id"
    reference="issue_type"
    optionText="type_name"
    label="Type"
  />,
  <ReferenceAutocompleteInput
    key="risk_id"
    source="risk_id"
    reference="issue_risk"
    optionText="risk_name"
    label="Risk"
  />,
  <ReferenceAutocompleteInput
    key="owner_contact_id"
    source="owner_contact_id"
    reference="contact"
    optionText="email"
    label="Owner Contact"
  />,
];

export function IssueList() {
  return (
    <List
      filters={issueFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <LookupReferenceField
          source="issue_type_id"
          reference="issue_type"
          optionText="type_name"
          label="Type"
        />
        <LookupReferenceField
          source="risk_id"
          reference="issue_risk"
          optionText="risk_name"
          label="Risk"
        />
        <LookupReferenceField
          source="chance_id"
          reference="issue_chance"
          optionText="chance_name"
          label="Chance"
        />
        <LookupReferenceField
          source="issue_impact_id"
          reference="issue_impact"
          optionText="impact_name"
          label="Impact"
        />
        <LookupReferenceField
          source="owner_contact_id"
          reference="contact"
          optionText="email"
          label="Owner Contact"
        />
      </Datagrid>
    </List>
  );
}

export function IssueShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="issue_type_id"
          reference="issue_type"
          optionText="type_name"
          label="Type"
        />
        <LookupReferenceField
          source="risk_id"
          reference="issue_risk"
          optionText="risk_name"
          label="Risk"
        />
        <LookupReferenceField
          source="chance_id"
          reference="issue_chance"
          optionText="chance_name"
          label="Chance"
        />
        <LookupReferenceField
          source="issue_impact_id"
          reference="issue_impact"
          optionText="impact_name"
          label="Impact"
        />
        <LookupReferenceField
          source="owner_contact_id"
          reference="contact"
          optionText="email"
          label="Owner Contact"
        />
        <TextField source="description" />
        <TextField source="mitigation" />
        <TextField source="ext_system" />
        <TextField source="ext_identifier" />
        <TextField source="ext_object" />
        <TextField source="source_sheet" />
        <TextField source="source_row_number" />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}
