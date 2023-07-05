import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';
import SrdMarkdown from '../../util/SrdMarkdown';

export interface StarshipHullRecord {
  name: string;
  class: string;
  speed: number;
  manoeuvrability: number;
  detection: number;
  hull: number;
  armour: number;
  turret: number;
  space: number;
  shipPoints: number;
  weapons: string[];
  special: { title: string; effect: string }[];
}

export function HullTable({
  tableData,
  group,
}: {
  tableData: StarshipHullRecord[];
  group: string;
}) {
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
      name: 'Name',
      wrap: true,
      selector: (row: StarshipHullRecord) => row.name,
      format: (row: StarshipHullRecord) => <strong>{row.name}</strong>,
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
      name: 'Hull Integrity',
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
      name: 'Turret Rating',
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
        Array.isArray(tableData)
          ? tableData.filter((item) => {
              if (filterText) {
                return (
                  item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
                  item.special
                    ?.map((value) => `${value.title} ${value.effect}`)
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
          : []
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
