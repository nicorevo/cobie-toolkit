import { Admin, Resource } from 'react-admin';
import { authProvider } from './authProvider';
import { dataProvider } from './dataProvider';
import {
  FacilityCreate,
  FacilityEdit,
  FacilityList,
  FacilityShow,
} from './resources/facilities';
import {
  FloorCreate,
  FloorEdit,
  FloorList,
  FloorShow,
} from './resources/floors';
import {
  SpaceCreate,
  SpaceEdit,
  SpaceList,
  SpaceShow,
} from './resources/spaces';
import { ZoneCreate, ZoneEdit, ZoneList, ZoneShow } from './resources/zones';
import {
  ComponentCreate,
  ComponentEdit,
  ComponentList,
  ComponentShow,
} from './resources/components';
import {
  SystemCreate,
  SystemEdit,
  SystemList,
  SystemShow,
} from './resources/systems';
import {
  AttributeCreate,
  AttributeEdit,
  AttributeList,
  AttributeShow,
} from './resources/attributes';
import {
  DocumentCreate,
  DocumentEdit,
  DocumentList,
  DocumentShow,
} from './resources/documents';
import {
  ValidationIssueList,
  ValidationIssueShow,
} from './resources/validationIssues';
import { JobList, JobShow } from './resources/jobs';
import { IssueList, IssueShow } from './resources/issues';
import { PicklistList, PicklistShow } from './resources/picklists';
import {
  CobieResourceList,
  CobieResourceShow,
} from './resources/resources';
import { TypeCreate, TypeEdit, TypeList, TypeShow } from './resources/assets';
import {
  ContactCreate,
  ContactEdit,
  ContactList,
  ContactShow,
} from './resources/contacts';
import {
  WorkbookCreate,
  WorkbookEdit,
  WorkbookList,
  WorkbookShow,
} from './resources/workbooks';

export function AdminApp() {
  return (
    <Admin
      basename="/admin"
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth
    >
      <Resource
        name="workbook"
        list={WorkbookList}
        show={WorkbookShow}
        create={WorkbookCreate}
        edit={WorkbookEdit}
        options={{ label: 'Workbooks' }}
      />
      <Resource
        name="facility"
        list={FacilityList}
        show={FacilityShow}
        create={FacilityCreate}
        edit={FacilityEdit}
      />
      <Resource
        name="floor"
        list={FloorList}
        show={FloorShow}
        create={FloorCreate}
        edit={FloorEdit}
      />
      <Resource
        name="space"
        list={SpaceList}
        show={SpaceShow}
        create={SpaceCreate}
        edit={SpaceEdit}
      />
      <Resource
        name="zone"
        list={ZoneList}
        show={ZoneShow}
        create={ZoneCreate}
        edit={ZoneEdit}
      />
      <Resource
        name="component"
        list={ComponentList}
        show={ComponentShow}
        create={ComponentCreate}
        edit={ComponentEdit}
      />
      <Resource
        name="type"
        list={TypeList}
        show={TypeShow}
        create={TypeCreate}
        edit={TypeEdit}
        options={{ label: 'Types' }}
      />
      <Resource
        name="system"
        list={SystemList}
        show={SystemShow}
        create={SystemCreate}
        edit={SystemEdit}
      />
      <Resource
        name="attribute"
        list={AttributeList}
        show={AttributeShow}
        create={AttributeCreate}
        edit={AttributeEdit}
      />
      <Resource
        name="document"
        list={DocumentList}
        show={DocumentShow}
        create={DocumentCreate}
        edit={DocumentEdit}
      />
      <Resource name="job" list={JobList} show={JobShow} />
      <Resource
        name="resource"
        list={CobieResourceList}
        show={CobieResourceShow}
        options={{ label: 'Resources' }}
      />
      <Resource name="issue" list={IssueList} show={IssueShow} />
      <Resource
        name="picklist"
        list={PicklistList}
        show={PicklistShow}
        options={{ label: 'Picklists' }}
      />
      <Resource
        name="cobie_validation_issues"
        list={ValidationIssueList}
        show={ValidationIssueShow}
        options={{ label: 'Validation Issues' }}
      />
      <Resource
        name="contact"
        list={ContactList}
        show={ContactShow}
        create={ContactCreate}
        edit={ContactEdit}
      />
    </Admin>
  );
}
