'use client'

import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import availability from '../util/Availability';
import SrdMarkdown from '../util/SrdMarkdown';
import FilterComponent from './components/FilterComponent';
import TableLink from './components/TableLink';

export interface AmmunitionRecord {
  name: string;
  id: string;
  availability: string;
  usedWith: string[];
  effect: string;
  source: string;
}

export default function Ammunition({ rootPath, data }: { rootPath: string, data: AmmunitionRecord[] }) {
  const [filterText, setFilterText] = useState('');
  const subHeaderComponentMemo = useMemo(() => {
    return (
      <FilterComponent
        onFilter={(event) => setFilterText(event.currentTarget.value)}
        filterText={filterText}
      />
    );
  }, [filterText]);

  const columns = [
    {
      name: 'Ammunition',
      sortable: true,
      wrap: true,
      selector: (row: AmmunitionRecord) => row.name,
      format: (row: AmmunitionRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Used With',
      sortable: true,
      wrap: true,
      selector: (row: AmmunitionRecord) => row.usedWith.join('; '),
    },
    {
      name: 'Availability',
      sortable: true,
      wrap: true,
      selector: (row: AmmunitionRecord) => availability(row.availability),
      format: (row: AmmunitionRecord) => row.availability,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={
        Array.isArray(data)
          ? data.filter((item) => {
              if (filterText) {
                return (
                  item.name
                    ?.toLowerCase()
                    .includes(filterText.toLowerCase()) ||
                  item.usedWith
                    ?.join(' ')
                    .toLowerCase()
                    .includes(filterText.toLowerCase()) ||
                  item.effect
                    ?.toLowerCase()
                    .includes(filterText.toLowerCase()) ||
                  item.availability
                    ?.toLowerCase()
                    .includes(filterText.toLowerCase())
                );
              }
              return true;
            })
          : []
      }
      actions={subHeaderComponentMemo}
      expandableRows
      expandableRowsComponent={({ data: row }) => (
        <>
          <div style={{ padding: '4px 4px 0 12px' }}>
            <SrdMarkdown text={row.effect} />
          </div>
          <hr />
        </>
      )}
    />
  );
}
