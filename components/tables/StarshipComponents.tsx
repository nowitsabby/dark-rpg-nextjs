'use client'

import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from './components/FilterComponent';
import SrdMarkdown from '../util/SrdMarkdown';
import TableLink from './components/TableLink';
import { StarshipComponentRecord } from '../types/Records';
import { componentPowerString, hullString } from '../util/helpers';

export default function StarshipComponents({ rootPath, data }: { rootPath: string, data: StarshipComponentRecord[] }) {
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
      name: 'Component',
      wrap: true,
      selector: (row: StarshipComponentRecord) => row.name,
      format: (row: StarshipComponentRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Hulls',
      sortable: true,
      wrap: true,
      selector: (row: StarshipComponentRecord) => row.hulls.join(', '),
      format: (row: StarshipComponentRecord) => hullString(row.hulls),
    },
    {
      name: 'Power',
      sortable: true,
      wrap: true,
      selector: (row: StarshipComponentRecord) => row.power,
      format: (row: StarshipComponentRecord) => componentPowerString(row.power),
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
                  item.name
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
