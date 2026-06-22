import type { ComponentProps } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { List } from 'react-admin';
import { useTheme } from '@mui/material/styles';
import type { CSSProperties } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentWorkbookId } from '../../app/store';

type WorkbookScopedListProps = ComponentProps<typeof List>;

const promptStyle = {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: 24,
} satisfies CSSProperties;

const promptTitleStyle = {
  fontSize: '1.25rem',
  fontWeight: 500,
  lineHeight: 1.6,
  margin: 0,
} satisfies CSSProperties;

const promptTextStyle = {
  fontSize: '0.875rem',
  lineHeight: 1.43,
  margin: 0,
} satisfies CSSProperties;

const promptLinkBaseStyle = {
  borderRadius: 4,
  display: 'inline-flex',
  fontSize: '0.875rem',
  fontWeight: 500,
  lineHeight: 1.75,
  padding: '6px 16px',
  textDecoration: 'none',
  textTransform: 'uppercase',
} satisfies CSSProperties;

function SelectWorkbookPrompt() {
  const theme = useTheme();
  const textStyle = {
    ...promptTextStyle,
    color: theme.palette.text.secondary,
  } satisfies CSSProperties;
  const linkStyle = {
    ...promptLinkBaseStyle,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  } satisfies CSSProperties;

  return (
    <section style={promptStyle}>
      <h2 style={promptTitleStyle}>Seleziona un workbook</h2>
      <p style={textStyle}>
        Le risorse COBie sono disponibili solo dopo aver scelto il workbook
        corrente.
      </p>
      <RouterLink to="/admin/workbook" style={linkStyle}>
        Vai ai Workbooks
      </RouterLink>
    </section>
  );
}

export function WorkbookScopedList(props: WorkbookScopedListProps) {
  const currentWorkbookId = useAppSelector(selectCurrentWorkbookId);

  if (!currentWorkbookId) return <SelectWorkbookPrompt />;

  return <List {...props} />;
}
