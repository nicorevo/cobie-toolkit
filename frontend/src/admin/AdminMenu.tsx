import { Menu } from 'react-admin';
import { lookupResources } from './resources/lookupResources';

const primaryResources = [
  'workbook',
  'facility',
  'floor',
  'space',
  'zone',
  'component',
  'type',
  'system',
  'attribute',
  'document',
  'job',
  'resource',
  'issue',
  'picklist',
  'cobie_validation_issues',
  'contact',
];

export function AdminMenu() {
  return (
    <Menu>
      {primaryResources.map((resource) => (
        <Menu.ResourceItem key={resource} name={resource} />
      ))}
      <Menu.Item to="/admin" primaryText="Sezione amministrativa" />
      {lookupResources.map((resource) => (
        <Menu.ResourceItem key={resource.name} name={resource.name} />
      ))}
    </Menu>
  );
}
