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

const contactFilters = [
  <TextInput key="workbook_id" source="workbook_id" label="Workbook ID" />,
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
      <TextInput source="organization_id" validate={requiredField} fullWidth />
      <TextInput source="workbook_id" validate={requiredField} fullWidth />
      <TextInput source="email" fullWidth />
      <TextInput source="category" fullWidth />
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
        <TextField source="organization_id" />
        <TextField source="workbook_id" />
        <EmailField source="email" />
        <TextField source="category" />
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
