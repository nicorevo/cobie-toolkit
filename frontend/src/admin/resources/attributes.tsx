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

const attributeFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="category_attribute_id"
    source="category_attribute_id"
    reference="category_attribute"
    optionText="category_name"
    label="Category"
  />,
];

const requiredField = [required()];

function AttributeForm() {
  return (
    <SimpleForm>
      <OrganizationReferenceInput validate={requiredField} />
      <WorkbookReferenceInput validate={requiredField} />
      <TextInput source="name" validate={requiredField} fullWidth />
      <WorkbookScopedReferenceInput
        source="category_attribute_id"
        reference="category_attribute"
        optionText="category_name"
        label="Category"
      />
      <TextInput source="value" fullWidth />
      <TextInput source="unit" fullWidth />
      <TextInput source="description" fullWidth multiline />
      <TextInput source="allowed_values" fullWidth multiline />
    </SimpleForm>
  );
}

export function AttributeList() {
  return (
    <List
      filters={attributeFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <LookupReferenceField
          source="category_attribute_id"
          reference="category_attribute"
          optionText="category_name"
          label="Category"
        />
        <TextField source="value" />
        <TextField source="unit" />
      </Datagrid>
    </List>
  );
}

export function AttributeShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="category_attribute_id"
          reference="category_attribute"
          optionText="category_name"
          label="Category"
        />
        <TextField source="value" />
        <TextField source="unit" />
        <TextField source="description" />
        <TextField source="allowed_values" />
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

export function AttributeCreate() {
  return (
    <Create>
      <AttributeForm />
    </Create>
  );
}

export function AttributeEdit() {
  return (
    <Edit>
      <AttributeForm />
    </Edit>
  );
}
