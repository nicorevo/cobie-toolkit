import { Datagrid, List, TextField } from 'react-admin';

export function TypeList() {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="asset_type" />
        <TextField source="manufacturer" />
        <TextField source="model_number" />
      </Datagrid>
    </List>
  );
}
