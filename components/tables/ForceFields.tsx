'use client'

import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import availability from '../util/Availability';
import SrdMarkdown from '../util/SrdMarkdown';
import FilterComponent from './components/FilterComponent';
import TableLink from './components/TableLink';
import { ForceFieldRecord } from '../types/Records';

export default function ForceFields({ rootPath, data }: { rootPath: string, data: ForceFieldRecord[] }) {
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
      name: 'Field',
      sortable: true,
      wrap: true,
      selector: (row: ForceFieldRecord) => row.name,
      format: (row: ForceFieldRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Protection Rating',
      sortable: true,
      wrap: true,
      selector: (row: ForceFieldRecord) => row.protectionRating,
    },
    {
      name: 'Wgt',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: ForceFieldRecord) => row.weight,
    },
    {
      name: 'Availability',
      sortable: true,
      wrap: true,
      selector: (row: ForceFieldRecord) => availability(row.availability),
      format: (row: ForceFieldRecord) => row.availability,
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
