import {
  Create,
  Datagrid,
  DateField,
  Edit,
  List,
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

const zoneFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="category_zone_id"
    source="category_zone_id"
    reference="category_zone"
    optionText="category_name"
    label="Category"
  />,
];

const requiredField = [required()];

function ZoneForm() {
  return (
    <SimpleForm>
      <OrganizationReferenceInput validate={requiredField} />
      <WorkbookReferenceInput validate={requiredField} />
      <TextInput source="name" validate={requiredField} fullWidth />
      <WorkbookScopedReferenceInput
        source="category_zone_id"
        reference="category_zone"
        optionText="category_name"
        label="Category"
      />
      <TextInput source="description" fullWidth multiline />
    </SimpleForm>
  );
}

export function ZoneList() {
  return (
    <List
      filters={zoneFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <LookupReferenceField
          source="category_zone_id"
          reference="category_zone"
          optionText="category_name"
          label="Category"
        />
        <TextField source="description" />
      </Datagrid>
    </List>
  );
}

export function ZoneShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="category_zone_id"
          reference="category_zone"
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

export function ZoneCreate() {
  return (
    <Create>
      <ZoneForm />
    </Create>
  );
}

export function ZoneEdit() {
  return (
    <Edit>
      <ZoneForm />
    </Edit>
  );
}
