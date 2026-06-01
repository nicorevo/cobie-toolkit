import { Datagrid, EmailField, List, TextField } from 'react-admin';

export function ContactList() {
  return (
    <List>
      <Datagrid rowClick="show">
        <EmailField source="email" />
        <TextField source="company" />
        <TextField source="given_name" />
        <TextField source="family_name" />
        <TextField source="phone" />
      </Datagrid>
    </List>
  );
}
