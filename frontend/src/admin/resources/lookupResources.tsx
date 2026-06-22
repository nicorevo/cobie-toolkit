import {
  Create,
  Datagrid,
  DateField,
  DeleteButton,
  Edit,
  EditButton,
  required,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  TopToolbar,
} from 'react-admin';
import {
  OrganizationReferenceField,
  OrganizationReferenceInput,
  WorkbookReferenceField,
  WorkbookReferenceInput,
} from './referenceInputs';
import { WorkbookScopedList } from '../components/WorkbookScopedList';

export type LookupResourceConfig = {
  name: string;
  label: string;
  valueField: string;
  valueLabel: string;
};

export const lookupResources: LookupResourceConfig[] = [
  {
    name: 'category_contact',
    label: 'Contact Categories',
    valueField: 'category_name',
    valueLabel: 'Category',
  },
  {
    name: 'category_facility',
    label: 'Facility Categories',
    valueField: 'category_name',
    valueLabel: 'Category',
  },
  {
    name: 'category_floor',
    label: 'Floor Categories',
    valueField: 'category_name',
    valueLabel: 'Category',
  },
  {
    name: 'category_space',
    label: 'Space Categories',
    valueField: 'category_name',
    valueLabel: 'Category',
  },
  {
    name: 'category_zone',
    label: 'Zone Categories',
    valueField: 'category_name',
    valueLabel: 'Category',
  },
  {
    name: 'category_type',
    label: 'Type Categories',
    valueField: 'category_name',
    valueLabel: 'Category',
  },
  {
    name: 'asset_type',
    label: 'Asset Types',
    valueField: 'asset_type_name',
    valueLabel: 'Asset Type',
  },
  {
    name: 'category_system',
    label: 'System Categories',
    valueField: 'category_name',
    valueLabel: 'Category',
  },
  {
    name: 'assembly_type',
    label: 'Assembly Types',
    valueField: 'assembly_type_name',
    valueLabel: 'Assembly Type',
  },
  {
    name: 'connection_type',
    label: 'Connection Types',
    valueField: 'type_name',
    valueLabel: 'Connection Type',
  },
  {
    name: 'category_spare',
    label: 'Spare Categories',
    valueField: 'category_name',
    valueLabel: 'Category',
  },
  {
    name: 'category_resource',
    label: 'Resource Categories',
    valueField: 'category_name',
    valueLabel: 'Category',
  },
  {
    name: 'category_job',
    label: 'Job Categories',
    valueField: 'category_name',
    valueLabel: 'Category',
  },
  {
    name: 'job_status',
    label: 'Job Statuses',
    valueField: 'status_name',
    valueLabel: 'Status',
  },
  {
    name: 'impact_type',
    label: 'Impact Types',
    valueField: 'type_name',
    valueLabel: 'Impact Type',
  },
  {
    name: 'impact_stage',
    label: 'Impact Stages',
    valueField: 'stage_name',
    valueLabel: 'Stage',
  },
  {
    name: 'category_document',
    label: 'Document Categories',
    valueField: 'category_name',
    valueLabel: 'Category',
  },
  {
    name: 'document_stage',
    label: 'Document Stages',
    valueField: 'stage_name',
    valueLabel: 'Stage',
  },
  {
    name: 'category_attribute',
    label: 'Attribute Categories',
    valueField: 'category_name',
    valueLabel: 'Category',
  },
  {
    name: 'category_coordinate',
    label: 'Coordinate Categories',
    valueField: 'category_name',
    valueLabel: 'Category',
  },
  {
    name: 'issue_type',
    label: 'Issue Types',
    valueField: 'type_name',
    valueLabel: 'Issue Type',
  },
  {
    name: 'issue_risk',
    label: 'Issue Risks',
    valueField: 'risk_name',
    valueLabel: 'Risk',
  },
  {
    name: 'issue_chance',
    label: 'Issue Chances',
    valueField: 'chance_name',
    valueLabel: 'Chance',
  },
  {
    name: 'issue_impact',
    label: 'Issue Impacts',
    valueField: 'impact_name',
    valueLabel: 'Impact',
  },
];

const requiredField = [required()];

function lookupFilters(config: LookupResourceConfig) {
  return [
    <OrganizationReferenceInput key="organization_id" />,
    <WorkbookReferenceInput key="workbook_id" />,
    <TextInput
      key={config.valueField}
      source={`${config.valueField}@ilike`}
      label={config.valueLabel}
      alwaysOn
    />,
  ];
}

function LookupActions() {
  return (
    <TopToolbar>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </TopToolbar>
  );
}

function LookupForm({ config }: { config: LookupResourceConfig }) {
  return (
    <SimpleForm>
      <OrganizationReferenceInput validate={requiredField} />
      <WorkbookReferenceInput validate={requiredField} />
      <TextInput
        source={config.valueField}
        label={config.valueLabel}
        validate={requiredField}
        fullWidth
      />
    </SimpleForm>
  );
}

export function createLookupResourceViews(config: LookupResourceConfig) {
  const LookupList = () => (
    <WorkbookScopedList
      filters={lookupFilters(config)}
      perPage={25}
      sort={{ field: config.valueField, order: 'ASC' }}
    >
      <Datagrid rowClick="show">
        <TextField source={config.valueField} label={config.valueLabel} />
        <WorkbookReferenceField />
        <OrganizationReferenceField />
        <DateField source="updated_at" showTime />
        <ShowButton />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </WorkbookScopedList>
  );

  const LookupShow = () => (
    <Show actions={<LookupActions />}>
      <SimpleShowLayout>
        <TextField source="id" />
        <OrganizationReferenceField />
        <WorkbookReferenceField />
        <TextField source={config.valueField} label={config.valueLabel} />
        <DateField source="inserted_at" showTime />
        <DateField source="updated_at" showTime />
      </SimpleShowLayout>
    </Show>
  );

  const LookupCreate = () => (
    <Create>
      <LookupForm config={config} />
    </Create>
  );

  const LookupEdit = () => (
    <Edit actions={<LookupActions />}>
      <LookupForm config={config} />
    </Edit>
  );

  return {
    list: LookupList,
    show: LookupShow,
    create: LookupCreate,
    edit: LookupEdit,
  };
}
