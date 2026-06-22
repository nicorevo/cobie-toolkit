import {
  AutocompleteInput,
  FormDataConsumer,
  ReferenceField,
  ReferenceInput,
  TextField,
} from 'react-admin';
import type { ComponentProps } from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  selectCurrentOrganizationId,
  selectCurrentWorkbookId,
} from '../../app/store';

type AutocompleteValidate = ComponentProps<typeof AutocompleteInput>['validate'];

type WorkbookScopedReferenceInputProps = {
  source: string;
  reference: string;
  optionText: string;
  label: string;
};

type FormData = {
  organization_id?: string;
  workbook_id?: string;
};

type RequiredReferenceInputProps = {
  validate?: AutocompleteValidate;
};

export function ReferenceAutocompleteInput({
  source,
  reference,
  optionText,
  label,
}: WorkbookScopedReferenceInputProps) {
  return (
    <ReferenceInput
      source={source}
      reference={reference}
      sort={{ field: optionText, order: 'ASC' }}
    >
      <AutocompleteInput label={label} optionText={optionText} fullWidth />
    </ReferenceInput>
  );
}

export function OrganizationReferenceInput({
  validate,
}: RequiredReferenceInputProps) {
  const currentOrganizationId = useAppSelector(selectCurrentOrganizationId);

  return (
    <ReferenceInput
      source="organization_id"
      reference="organizations"
      sort={{ field: 'name', order: 'ASC' }}
    >
      <AutocompleteInput
        label="Organization"
        optionText="name"
        validate={validate}
        defaultValue={currentOrganizationId ?? undefined}
        disabled
        fullWidth
      />
    </ReferenceInput>
  );
}

export function WorkbookReferenceInput({
  validate,
}: RequiredReferenceInputProps) {
  const currentOrganizationId = useAppSelector(selectCurrentOrganizationId);
  const currentWorkbookId = useAppSelector(selectCurrentWorkbookId);

  return (
    <FormDataConsumer<FormData>>
      {({ formData }) => {
        const organizationId = formData.organization_id ?? currentOrganizationId;

        return (
          <ReferenceInput
            source="workbook_id"
            reference="workbook"
            filter={
              organizationId ? { organization_id: organizationId } : undefined
            }
            sort={{ field: 'name', order: 'ASC' }}
          >
            <AutocompleteInput
              label="Workbook"
              optionText="name"
              validate={validate}
              defaultValue={currentWorkbookId ?? undefined}
              disabled={Boolean(currentWorkbookId)}
              fullWidth
            />
          </ReferenceInput>
        );
      }}
    </FormDataConsumer>
  );
}

export function WorkbookFilterInput() {
  const currentWorkbookId = useAppSelector(selectCurrentWorkbookId);

  return (
    <ReferenceInput
      source="workbook_id"
      reference="workbook"
      sort={{ field: 'name', order: 'ASC' }}
    >
      <AutocompleteInput
        label="Workbook"
        optionText="name"
        defaultValue={currentWorkbookId ?? undefined}
        disabled={Boolean(currentWorkbookId)}
        fullWidth
      />
    </ReferenceInput>
  );
}

export function OrganizationReferenceField() {
  return (
    <ReferenceField
      source="organization_id"
      reference="organizations"
      label="Organization"
      link={false}
    >
      <TextField source="name" />
    </ReferenceField>
  );
}

export function WorkbookReferenceField() {
  return (
    <ReferenceField
      source="workbook_id"
      reference="workbook"
      label="Workbook"
      link="show"
    >
      <TextField source="name" />
    </ReferenceField>
  );
}

export function LookupReferenceField({
  source,
  reference,
  optionText,
  label,
}: WorkbookScopedReferenceInputProps) {
  return (
    <ReferenceField source={source} reference={reference} label={label} link="show">
      <TextField source={optionText} />
    </ReferenceField>
  );
}

export function WorkbookScopedReferenceInput({
  source,
  reference,
  optionText,
  label,
}: WorkbookScopedReferenceInputProps) {
  const currentWorkbookId = useAppSelector(selectCurrentWorkbookId);

  return (
    <FormDataConsumer<FormData>>
      {({ formData }) => {
        const workbookId = formData.workbook_id ?? currentWorkbookId;

        return (
          <ReferenceInput
            source={source}
            reference={reference}
            filter={workbookId ? { workbook_id: workbookId } : undefined}
            sort={{ field: optionText, order: 'ASC' }}
          >
            <AutocompleteInput label={label} optionText={optionText} fullWidth />
          </ReferenceInput>
        );
      }}
    </FormDataConsumer>
  );
}
