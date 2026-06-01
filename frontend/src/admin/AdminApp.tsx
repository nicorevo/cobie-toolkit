import { Admin, Resource } from 'react-admin';
import { authProvider } from './authProvider';
import { dataProvider } from './dataProvider';
import { FacilityList } from './resources/facilities';
import { ComponentList } from './resources/components';
import { TypeList } from './resources/assets';
import { ContactList } from './resources/contacts';

export function AdminApp() {
  return (
    <Admin
      basename="/admin"
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth
    >
      <Resource name="facility" list={FacilityList} />
      <Resource name="component" list={ComponentList} />
      <Resource name="type" list={TypeList} />
      <Resource name="contact" list={ContactList} />
    </Admin>
  );
}
