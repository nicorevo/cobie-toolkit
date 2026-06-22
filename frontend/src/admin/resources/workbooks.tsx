import {
  Button,
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
  useRecordContext,
} from 'react-admin';
import type { Tables } from '../../lib/supabase/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCurrentWorkbookId,
  setCurrentWorkbookContext,
} from '../../app/store';
import {
  OrganizationReferenceField,
  OrganizationReferenceInput,
} from './referenceInputs';

type WorkbookRecord = Tables<{ schema: 'cobie' }, 'workbook'>;

const workbookFilters = [
  <TextInput key="name" source="name@ilike" label="Name" alwaysOn />,
  <TextInput key="status" source="status" label="Status" alwaysOn />,
];

const requiredField = [required()];

function WorkbookForm() {
  return (
    <SimpleForm>
      <OrganizationReferenceInput validate={requiredField} />
      <TextInput source="name" validate={requiredField} fullWidth />
      <TextInput source="standard_version" fullWidth />
      <TextInput source="template_name" fullWidth />
      <TextInput source="template_source_url" fullWidth />
      <TextInput source="template_checksum" fullWidth />
      <TextInput source="ifc_schema" fullWidth />
      <TextInput source="status" fullWidth />
      <TextInput source="notes" fullWidth multiline />
    </SimpleForm>
  );
}

function SelectCurrentWorkbookButton() {
  const record = useRecordContext<WorkbookRecord>();
  const dispatch = useAppDispatch();
  const currentWorkbookId = useAppSelector(selectCurrentWorkbookId);

  if (!record) return null;

  const isCurrent = currentWorkbookId === record.id;

  return (
    <Button
      label={isCurrent ? 'Current' : 'Select'}
      disabled={isCurrent}
      onClick={(event) => {
        event.stopPropagation();
        dispatch(
          setCurrentWorkbookContext({
            workbookId: record.id,
            workbookName: record.name,
            organizationId: record.organization_id,
          }),
        );
      }}
    />
  );
}

export function WorkbookList() {
  return (
    <List
      filters={workbookFilters}
      perPage={25}
      sort={{ field: 'created_at', order: 'DESC' }}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="standard_version" />
        <TextField source="template_name" />
        <TextField source="status" />
        <DateField source="updated_at" showTime />
        <SelectCurrentWorkbookButton />
      </Datagrid>
    </List>
  );
}

export function WorkbookShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <TextField source="name" />
        <TextField source="standard_version" />
        <TextField source="template_name" />
        <TextField source="template_source_url" />
        <TextField source="template_checksum" />
        <TextField source="ifc_schema" />
        <TextField source="status" />
        <TextField source="notes" />
        <DateField source="created_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );
}

export function WorkbookCreate() {
  return (
    <Create>
      <WorkbookForm />
    </Create>
  );
}

export function WorkbookEdit() {
  return (
    <Edit>
      <WorkbookForm />
    </Edit>
  );
}
