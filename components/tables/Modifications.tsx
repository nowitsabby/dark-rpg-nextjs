'use client'

import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import availability from '../util/Availability';
import SrdMarkdown from '../util/SrdMarkdown';
import FilterComponent from './components/FilterComponent';

export interface ModRecord {
  mod: string;
  weight: string;
  availability: string;
  upgrades: string;
  description: string;
  source: string;
}

export default function Modifications({ data }: { data: ModRecord[] }) {
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
      name: 'Modification',
      grow: 5,
      sortable: true,
      wrap: true,
      selector: (row: ModRecord) => row.mod,
      format: (row: ModRecord) => <strong>{row.mod}</strong>,
    },
    {
      name: 'Weight',
      grow: 1,
      sortable: true,
      wrap: true,
      selector: (row: ModRecord) => row.weight,
    },
    {
      name: 'Upgrades',
      grow: 10,
      sortable: true,
      wrap: true,
      selector: (row: ModRecord) => row.upgrades,
    },
    {
      name: 'Availability',
      grow: 5,
      sortable: true,
      wrap: true,
      selector: (row: ModRecord) => availability(row.availability),
      format: (row: ModRecord) => row.availability,
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
                  item.mod
                    ?.toLowerCase()
                    .includes(filterText.toLowerCase()) ||
                  item.upgrades
                    ?.toLowerCase()
                    .includes(filterText.toLowerCase()) ||
                  item.description
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
            <SrdMarkdown text={row.description} />
          </div>
          <hr />
        </>
      )}
    />
  );
}
