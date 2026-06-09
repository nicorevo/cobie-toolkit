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

const spaceFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="floor_id"
    source="floor_id"
    reference="floor"
    optionText="name"
    label="Floor"
  />,
  <ReferenceAutocompleteInput
    key="category_space_id"
    source="category_space_id"
    reference="category_space"
    optionText="category_name"
    label="Category"
  />,
  <TextInput key="room_tag" source="room_tag@ilike" label="Room Tag" />,
];

const requiredField = [required()];

function SpaceForm() {
  return (
    <SimpleForm>
      <OrganizationReferenceInput validate={requiredField} />
      <WorkbookReferenceInput validate={requiredField} />
      <TextInput source="name" validate={requiredField} fullWidth />
      <WorkbookScopedReferenceInput
        source="category_space_id"
        reference="category_space"
        optionText="category_name"
        label="Category"
      />
      <WorkbookScopedReferenceInput
        source="floor_id"
        reference="floor"
        optionText="name"
        label="Floor"
      />
      <TextInput source="description" fullWidth multiline />
      <TextInput source="room_tag" fullWidth />
      <TextInput source="usable_height" fullWidth />
      <TextInput source="gross_area" fullWidth />
      <TextInput source="net_area" fullWidth />
    </SimpleForm>
  );
}

export function SpaceList() {
  return (
    <List
      filters={spaceFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <LookupReferenceField
          source="floor_id"
          reference="floor"
          optionText="name"
          label="Floor"
        />
        <LookupReferenceField
          source="category_space_id"
          reference="category_space"
          optionText="category_name"
          label="Category"
        />
        <TextField source="room_tag" />
        <TextField source="gross_area" />
        <TextField source="net_area" />
      </Datagrid>
    </List>
  );
}

export function SpaceShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="category_space_id"
          reference="category_space"
          optionText="category_name"
          label="Category"
        />
        <LookupReferenceField
          source="floor_id"
          reference="floor"
          optionText="name"
          label="Floor"
        />
        <TextField source="description" />
        <TextField source="room_tag" />
        <TextField source="usable_height" />
        <TextField source="gross_area" />
        <TextField source="net_area" />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}

export function SpaceCreate() {
  return (
    <Create>
      <SpaceForm />
    </Create>
  );
}

export function SpaceEdit() {
  return (
    <Edit>
      <SpaceForm />
    </Edit>
  );
}
