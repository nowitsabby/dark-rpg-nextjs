'use client'

import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from './components/FilterComponent';
import SrdMarkdown from '../util/SrdMarkdown';

export interface StarshipComponentRecord {
  component: string;
  hulls: string[];
  power: number;
  space: number;
  shipPoints: number;
  special: { title: string; effect: string }[];
}

export default function StarshipComponents({ data }: { data: StarshipComponentRecord[] }) {
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
      name: 'Component',
      wrap: true,
      selector: (row: StarshipComponentRecord) => row.component,
      format: (row: StarshipComponentRecord) => (
        <strong>{row.component}</strong>
      ),
    },
    {
      name: 'Appropriate Hull Types',
      sortable: true,
      wrap: true,
      selector: (row: StarshipComponentRecord) => row.hulls.join(', '),
      format: (row: StarshipComponentRecord) =>
        row.hulls.length === 6 ? 'All Ships' : row.hulls.join(', '),
    },
    {
      name: 'Power',
      sortable: true,
      wrap: true,
      selector: (row: StarshipComponentRecord) => row.power,
      format: (row: StarshipComponentRecord) =>
        `${row.power > 0 ? '+' : ''}${row.power}`,
    },
    {
      name: 'Space',
      sortable: true,
      wrap: true,
      selector: (row: StarshipComponentRecord) => row.space,
    },
    {
      name: 'SP',
      sortable: true,
      wrap: true,
      selector: (row: StarshipComponentRecord) => row.shipPoints,
    },
  ];

  return (
    <DataTable
      dense
      columns={columns}
      data={
        data.filter((item) => {
              if (filterText) {
                return (
                  item.component
                    ?.toLowerCase()
                    .includes(filterText.toLowerCase()) ||
                  item.hulls
                    ?.join(' ')
                    .toLowerCase()
                    .includes(filterText.toLowerCase()) ||
                  item.special
                    ?.map((value) => `${value.title} ${value.effect}`)
                    .join(' ')
                    .toLowerCase()
                    .includes(filterText.toLowerCase())
                );
              }
              return true;
            })
      }
      actions={subHeaderComponentMemo}
      expandableRows
      expandableRowDisabled={(row) => row.special.length < 1}
      expandableRowsComponent={({ data: row }) => (
        <>
          <div style={{ padding: '4px 4px 0 12px' }}>
            <SrdMarkdown
              text={row.special
                ?.map((value) => `__${value.title}:__ ${value.effect}`)
                .join('\n\n')}
            />
          </div>
          <hr />
        </>
      )}
      conditionalRowStyles={[
        {
          when: (row) => row.special.length < 1,
          classNames: ['no-expand'],
        },
      ]}
    />
  );
}
