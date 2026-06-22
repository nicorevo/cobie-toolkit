import {
  Create,
  Datagrid,
  DateField,
  Edit,
  required,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  useRecordContext,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import type { CSSProperties } from 'react';
import type { Tables } from '../../lib/supabase/types';
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
import { WorkbookScopedList } from '../components/WorkbookScopedList';
import { buildResourceListPath } from '../navigation';

type FloorRecord = Tables<{ schema: 'cobie' }, 'floor'>;

const navigationLinkStyle = {
  color: '#1976d2',
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  fontSize: '0.8125rem',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
} satisfies CSSProperties;

const floorFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="category_floor_id"
    source="category_floor_id"
    reference="category_floor"
    optionText="category_name"
    label="Category"
  />,
  <ReferenceAutocompleteInput
    key="facility_id"
    source="facility_id"
    reference="facility"
    optionText="name"
    label="Facility"
  />,
];

const requiredField = [required()];

function SpacesLinkField({ label: _label }: { label?: string }) {
  void _label;

  const record = useRecordContext<FloorRecord>();

  if (!record) return null;

  return (
    <RouterLink
      to={buildResourceListPath(
        'space',
        {
          workbook_id: record.workbook_id,
          floor_id: record.id,
        },
        [
          {
            label: 'Floors',
            to: '/admin/floor',
          },
          {
            label: record.name,
          },
        ],
      )}
      onClick={(event) => event.stopPropagation()}
      style={navigationLinkStyle}
    >
      Spaces
    </RouterLink>
  );
}

function FloorForm() {
  return (
    <SimpleForm>
      <OrganizationReferenceInput validate={requiredField} />
      <WorkbookReferenceInput validate={requiredField} />
      <TextInput source="name" validate={requiredField} fullWidth />
      <WorkbookScopedReferenceInput
        source="category_floor_id"
        reference="category_floor"
        optionText="category_name"
        label="Category"
      />
      <WorkbookScopedReferenceInput
        source="facility_id"
        reference="facility"
        optionText="name"
        label="Facility"
      />
      <TextInput source="elevation" fullWidth />
      <TextInput source="height" fullWidth />
      <TextInput source="description" fullWidth multiline />
    </SimpleForm>
  );
}

export function FloorList() {
  return (
    <WorkbookScopedList
      filters={floorFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <LookupReferenceField
          source="category_floor_id"
          reference="category_floor"
          optionText="category_name"
          label="Category"
        />
        <LookupReferenceField
          source="facility_id"
          reference="facility"
          optionText="name"
          label="Facility"
        />
        <TextField source="elevation" />
        <TextField source="height" />
        <TextField source="description" />
        <SpacesLinkField label="Spaces" />
      </Datagrid>
    </WorkbookScopedList>
  );
}

export function FloorShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="category_floor_id"
          reference="category_floor"
          optionText="category_name"
          label="Category"
        />
        <LookupReferenceField
          source="facility_id"
          reference="facility"
          optionText="name"
          label="Facility"
        />
        <TextField source="elevation" />
        <TextField source="height" />
        <TextField source="description" />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}

export function FloorCreate() {
  return (
    <Create>
      <FloorForm />
    </Create>
  );
}

export function FloorEdit() {
  return (
    <Edit>
      <FloorForm />
    </Edit>
  );
}
