import {
  Create,
  Datagrid,
  DateField,
  Edit,
  EmailField,
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
  WorkbookFilterInput,
  WorkbookReferenceField,
  WorkbookReferenceInput,
  WorkbookScopedReferenceInput,
} from './referenceInputs';

const contactFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="email" source="email@ilike" label="Email" alwaysOn />,
  <TextInput key="company" source="company@ilike" label="Company" />,
  <TextInput
    key="family_name"
    source="family_name@ilike"
    label="Family Name"
  />,
];

const requiredField = [required()];

function ContactForm() {
  return (
    <SimpleForm>
      <OrganizationReferenceInput validate={requiredField} />
      <WorkbookReferenceInput validate={requiredField} />
      <TextInput source="email" fullWidth />
      <WorkbookScopedReferenceInput
        source="category_contact_id"
        reference="category_contact"
        optionText="category_name"
        label="Category"
      />
      <TextInput source="company" fullWidth />
      <TextInput source="phone" fullWidth />
      <TextInput source="department" fullWidth />
      <TextInput source="organization_code" fullWidth />
      <TextInput source="given_name" fullWidth />
      <TextInput source="family_name" fullWidth />
      <TextInput source="street" fullWidth />
      <TextInput source="postal_box" fullWidth />
      <TextInput source="town" fullWidth />
      <TextInput source="state_region" fullWidth />
      <TextInput source="postal_code" fullWidth />
      <TextInput source="country" fullWidth />
    </SimpleForm>
  );
}

export function ContactList() {
  return (
    <List
      filters={contactFilters}
      perPage={25}
      sort={{ field: 'email', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <EmailField source="email" />
        <TextField source="company" />
        <TextField source="given_name" />
        <TextField source="family_name" />
        <TextField source="phone" />
      </Datagrid>
    </List>
  );
}

export function ContactShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <EmailField source="email" />
        <LookupReferenceField
          source="category_contact_id"
          reference="category_contact"
          optionText="category_name"
          label="Category"
        />
        <TextField source="company" />
        <TextField source="phone" />
        <TextField source="department" />
        <TextField source="organization_code" />
        <TextField source="given_name" />
        <TextField source="family_name" />
        <TextField source="street" />
        <TextField source="postal_box" />
        <TextField source="town" />
        <TextField source="state_region" />
        <TextField source="postal_code" />
        <TextField source="country" />
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

export function ContactCreate() {
  return (
    <Create>
      <ContactForm />
    </Create>
  );
}

export function ContactEdit() {
  return (
    <Edit>
      <ContactForm />
    </Edit>
  );
}
