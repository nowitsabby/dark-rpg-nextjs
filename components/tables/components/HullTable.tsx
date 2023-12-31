import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';
import SrdMarkdown from '../../util/SrdMarkdown';
import TableLink from './TableLink';
import { StarshipHullRecord } from '@/components/types/Records';

export function HullTable({
  rootPath,
  tableData,
  group,
}: {
  rootPath: string;
  tableData: StarshipHullRecord[];
  group: string;
}) {
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
      name: 'Name',
      wrap: true,
      selector: (row: StarshipHullRecord) => row.name,
      format: (row: StarshipHullRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Speed',
      sortable: true,
      wrap: true,
      selector: (row: StarshipHullRecord) => row.speed,
    },
    {
      name: 'Manoeuv.',
      sortable: true,
      wrap: true,
      selector: (row: StarshipHullRecord) => row.manoeuvrability,
    },
    {
      name: 'Detection',
      sortable: true,
      wrap: true,
      selector: (row: StarshipHullRecord) => row.detection,
    },
    {
      name: 'Hull',
      sortable: true,
      wrap: true,
      selector: (row: StarshipHullRecord) => row.hull,
    },
    {
      name: 'Armour',
      sortable: true,
      wrap: true,
      selector: (row: StarshipHullRecord) => row.armour,
    },
    {
      name: 'Turret',
      sortable: true,
      wrap: true,
      selector: (row: StarshipHullRecord) => row.turret,
    },
    {
      name: 'Space',
      sortable: true,
      wrap: true,
      selector: (row: StarshipHullRecord) => row.space,
    },
    {
      name: 'SP',
      sortable: true,
      wrap: true,
      selector: (row: StarshipHullRecord) => row.shipPoints,
    },
    {
      name: 'Weapon Capacity',
      sortable: true,
      wrap: true,
      selector: (row: StarshipHullRecord) => row.weapons.join(', '),
      format: (row: StarshipHullRecord) =>
        row.weapons && Array.isArray(row.weapons)
          ? [...new Set(row.weapons)]
              .map(
                (value) =>
                  `${
                    row.weapons.filter((str) => str === value).length
                  } ${value}`
              )
              .join(', ')
          : [],
    },
  ];

  return (
    <DataTable
      dense
      title={<h4>{group}</h4>}
      columns={columns}
      data={
        tableData.filter((item) => {
          if (filterText) {
            return (
              item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
              item.special
                ?.map((value) => `${value.title} ${value.description}`)
                .join(' ')
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.weapons
                ?.join(' ')
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
                ?.map((value) => `__${value.title}:__ ${value.description}`)
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
