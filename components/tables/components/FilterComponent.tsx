import { ChangeEventHandler, MouseEventHandler } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Stack from '@mui/material/Stack';

export default function FilterComponent({
  filterText,
  onFilter,
  onClear,
}: {
  filterText: string;
  onFilter: ChangeEventHandler<HTMLInputElement>;
  onClear: MouseEventHandler;
}) {
  return (
    <div style={{ padding: '4px', marginBottom: '0.5rem' }}>
      <Stack direction="row" gap={1}>
        <SearchOutlinedIcon />
        <input
          type="text"
          value={filterText}
          style={{ border: 'none transparent', outline: 'none' }}
          placeholder="Filter by . . ."
          onChange={onFilter}
        />
      </Stack>
    </div>
  );
}
