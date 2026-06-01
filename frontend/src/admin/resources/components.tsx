import { Datagrid, List, TextField } from 'react-admin';

export function ComponentList() {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="name" />
        <TextField source="type_name" />
        <TextField source="space_name" />
        <TextField source="serial_number" />
        <TextField source="asset_identifier" />
        <TextField source="tag_number" />
      </Datagrid>
    </List>
  );
}
