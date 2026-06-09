import {
  AutocompleteInput,
  FormDataConsumer,
  ReferenceField,
  ReferenceInput,
  TextField,
} from 'react-admin';
import type { ComponentProps } from 'react';

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
        fullWidth
      />
    </ReferenceInput>
  );
}

export function WorkbookReferenceInput({
  validate,
}: RequiredReferenceInputProps) {
  return (
    <FormDataConsumer<FormData>>
      {({ formData }) => (
        <ReferenceInput
          source="workbook_id"
          reference="workbook"
          filter={
            formData.organization_id
              ? { organization_id: formData.organization_id }
              : undefined
          }
          sort={{ field: 'name', order: 'ASC' }}
        >
          <AutocompleteInput
            label="Workbook"
            optionText="name"
            validate={validate}
            fullWidth
          />
        </ReferenceInput>
      )}
    </FormDataConsumer>
  );
}

export function WorkbookFilterInput() {
  return (
    <ReferenceInput
      source="workbook_id"
      reference="workbook"
      sort={{ field: 'name', order: 'ASC' }}
    >
      <AutocompleteInput label="Workbook" optionText="name" fullWidth />
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
      link={false}
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
    <ReferenceField source={source} reference={reference} label={label} link={false}>
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
  return (
    <FormDataConsumer<FormData>>
      {({ formData }) => (
        <ReferenceInput
          source={source}
          reference={reference}
          filter={
            formData.workbook_id
              ? { workbook_id: formData.workbook_id }
              : undefined
          }
          sort={{ field: optionText, order: 'ASC' }}
        >
          <AutocompleteInput label={label} optionText={optionText} fullWidth />
        </ReferenceInput>
      )}
    </FormDataConsumer>
  );
}
