import { Datagrid, List, TextField } from 'react-admin';

export function FacilityList() {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="project_name" />
        <TextField source="site_name" />
        <TextField source="phase" />
      </Datagrid>
    </List>
  );
}
