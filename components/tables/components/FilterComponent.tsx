import { ChangeEventHandler } from 'react';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import Stack from '@mui/material/Stack';

export default function FilterComponent({
  filterText,
  onFilter
}: {
  filterText: string;
  onFilter: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div style={{ padding: '4px', marginBottom: '0.5rem' }}>
      <Stack direction="row" gap={1}>
        <FilterListOutlinedIcon />
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
