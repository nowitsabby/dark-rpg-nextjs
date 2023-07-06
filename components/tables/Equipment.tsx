'use client'

import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import availability from '../util/Availability';
import SrdMarkdown from '../util/SrdMarkdown';
import FilterComponent from './components/FilterComponent';

export interface EquipmentRecord {
  item: string;
  weight: string;
  availability: string;
  description: string;
  source: string;
}

export default function Equipment({ data }: { data: EquipmentRecord[] }) {

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
      name: 'Item',
      sortable: true,
      wrap: true,
      selector: (row: EquipmentRecord) => row.item,
      format: (row: EquipmentRecord) => <strong>{row.item}</strong>,
    },
    {
      name: 'Availability',
      sortable: true,
      wrap: true,
      selector: (row: EquipmentRecord) => availability(row.availability),
      format: (row: EquipmentRecord) => row.availability,
    },
    {
      name: 'Wgt',
      compact: true,
      grow: 0,
      minWidth: '75px',
      sortable: true,
      wrap: true,
      selector: (row: EquipmentRecord) => row.weight,
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
                      item.item
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
  )
}
