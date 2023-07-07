import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';
import SrdMarkdown from '../../util/SrdMarkdown';
import TableLink from './TableLink';

export interface StarshipWeaponRecord {
  name: string;
  id: string;
  hulls: string[];
  power: number;
  space: number;
  shipPoints: number;
  strength: number | string;
  damage: string;
  crit: number | string;
  range: number | string;
  special: { title: string; effect: string }[];
}

export function StarshipWeaponTable({ rootPath, data }: { rootPath: string, data: StarshipWeaponRecord[] }) {
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
      name: 'Weapon',
      wrap: true,
      selector: (row: StarshipWeaponRecord) => row.name,
      format: (row: StarshipWeaponRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Appropriate Hull Types',
      sortable: true,
      wrap: true,
      selector: (row: StarshipWeaponRecord) => row.hulls.join(', '),
      format: (row: StarshipWeaponRecord) =>
        row.hulls.length === 6 ? 'All Ships' : row.hulls.join(', '),
    },
    {
      name: 'Power',
      sortable: true,
      wrap: true,
      selector: (row: StarshipWeaponRecord) => row.power,
      format: (row: StarshipWeaponRecord) =>
        `${row.power > 0 ? '+' : ''}${row.power}`,
    },
    {
      name: 'Space',
      sortable: true,
      wrap: true,
      selector: (row: StarshipWeaponRecord) => row.space,
    },
    {
      name: 'SP',
      sortable: true,
      wrap: true,
      selector: (row: StarshipWeaponRecord) => row.shipPoints,
    },
    {
      name: 'Str',
      sortable: true,
      wrap: true,
      selector: (row: StarshipWeaponRecord) => row.strength,
    },
    {
      name: 'Dmg',
      sortable: true,
      wrap: true,
      selector: (row: StarshipWeaponRecord) => row.damage,
    },
    {
      name: 'Crit',
      sortable: true,
      wrap: true,
      selector: (row: StarshipWeaponRecord) => row.crit,
    },
    {
      name: 'Range',
      sortable: true,
      wrap: true,
      selector: (row: StarshipWeaponRecord) => row.range,
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
