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

type FacilityRecord = Tables<{ schema: 'cobie' }, 'facility'>;

const navigationLinkStyle = {
  color: '#1976d2',
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  fontSize: '0.8125rem',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
} satisfies CSSProperties;

const facilityFilters = [
  <WorkbookFilterInput key="workbook_id" />,
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <ReferenceAutocompleteInput
    key="category_facility_id"
    source="category_facility_id"
    reference="category_facility"
    optionText="category_name"
    label="Category"
  />,
  <TextInput key="project_name" source="project_name@ilike" label="Project" />,
];

const requiredField = [required()];

function FloorsLinkField({ label: _label }: { label?: string }) {
  void _label;

  const record = useRecordContext<FacilityRecord>();

  if (!record) return null;

  return (
    <RouterLink
      to={buildResourceListPath(
        'floor',
        {
          workbook_id: record.workbook_id,
          facility_id: record.id,
        },
        [
          {
            label: 'Facilities',
            to: '/admin/facility',
          },
          {
            label: record.name,
          },
        ],
      )}
      onClick={(event) => event.stopPropagation()}
      style={navigationLinkStyle}
    >
      Floor
    </RouterLink>
  );
}

function FacilityForm() {
  return (
    <SimpleForm>
      <OrganizationReferenceInput validate={requiredField} />
      <WorkbookReferenceInput validate={requiredField} />
      <TextInput source="name" validate={requiredField} fullWidth />
      <WorkbookScopedReferenceInput
        source="category_facility_id"
        reference="category_facility"
        optionText="category_name"
        label="Category"
      />
      <TextInput source="project_name" fullWidth />
      <TextInput source="project_description" fullWidth multiline />
      <TextInput source="site_name" fullWidth />
      <TextInput source="site_description" fullWidth multiline />
      <TextInput source="phase" fullWidth />
      <TextInput source="linear_units" fullWidth />
      <TextInput source="area_units" fullWidth />
      <TextInput source="area_measurement" fullWidth />
      <TextInput source="volume_units" fullWidth />
      <TextInput source="currency_unit" fullWidth />
      <TextInput source="description" fullWidth multiline />
    </SimpleForm>
  );
}

export function FacilityList() {
  return (
    <WorkbookScopedList
      filters={facilityFilters}
      perPage={25}
      sort={{ field: 'name', order: 'ASC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <LookupReferenceField
          source="category_facility_id"
          reference="category_facility"
          optionText="category_name"
          label="Category"
        />
        <TextField source="project_name" />
        <TextField source="site_name" />
        <TextField source="phase" />
        <FloorsLinkField label="Floor" />
      </Datagrid>
    </WorkbookScopedList>
  );
}

export function FacilityShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source="name" />
        <LookupReferenceField
          source="category_facility_id"
          reference="category_facility"
          optionText="category_name"
          label="Category"
        />
        <TextField source="project_name" />
        <TextField source="project_description" />
        <TextField source="site_name" />
        <TextField source="site_description" />
        <TextField source="phase" />
        <TextField source="linear_units" />
        <TextField source="area_units" />
        <TextField source="area_measurement" />
        <TextField source="volume_units" />
        <TextField source="currency_unit" />
        <TextField source="description" />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}

export function FacilityCreate() {
  return (
    <Create>
      <FacilityForm />
    </Create>
  );
}

export function FacilityEdit() {
  return (
    <Edit>
      <FacilityForm />
    </Edit>
  );
}
