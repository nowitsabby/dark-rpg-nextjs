'use client'

import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import availability from '../util/Availability';
import SrdMarkdown from '../util/SrdMarkdown';
import FilterComponent from './components/FilterComponent';

export interface FieldRecord {
  field: string;
  protectionRating: number;
  weight: string;
  availability: string;
  description: string;
  source: string;
}

export default function ForceFields({ data }: { data: FieldRecord[] }) {
  const [filterText, setFilterText] = useState('');
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(event) => setFilterText(event.currentTarget.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  const columns = [
    {
      name: 'Field',
      sortable: true,
      wrap: true,
      selector: (row: FieldRecord) => row.field,
      format: (row: FieldRecord) => <strong>{row.field}</strong>,
    },
    {
      name: 'Protection Rating',
      sortable: true,
      wrap: true,
      selector: (row: FieldRecord) => row.protectionRating,
    },
    {
      name: 'Wgt',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: FieldRecord) => row.weight,
    },
    {
      name: 'Availability',
      sortable: true,
      wrap: true,
      selector: (row: FieldRecord) => availability(row.availability),
      format: (row: FieldRecord) => row.availability,
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
                  item.field
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
