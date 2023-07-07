import availability from '../../util/Availability';
import TableLink from './TableLink';
import { RangedWeaponRecord, WeaponGroupTable } from './WeaponGroupTable';

export default function RangedWeaponTable({
  rootPath,
  tableData,
  group,
}: {
  rootPath: string;
  tableData: RangedWeaponRecord[];
  group: string;
}) {
  const columns = [
    {
      name: 'Weapon',
      grow: 10,
      sortable: true,
      wrap: true,
      selector: (row: RangedWeaponRecord) => row.name,
      format: (row: RangedWeaponRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Class',
      grow: 0,
      minWidth: '60px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: RangedWeaponRecord) => row.class,
    },
    {
      name: 'Rng',
      grow: 0,
      minWidth: '50px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: RangedWeaponRecord) => row.range,
    },
    {
      name: 'RoF',
      grow: 0,
      minWidth: '50px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: RangedWeaponRecord) => row.rateOfFire,
    },
    {
      name: 'Dmg',
      grow: 0,
      minWidth: '75px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: RangedWeaponRecord) => row.damage,
    },
    {
      name: 'Pen',
      grow: 0,
      minWidth: '50px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: RangedWeaponRecord) => row.penetration,
    },
    {
      name: 'Clip',
      grow: 0,
      minWidth: '50px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: RangedWeaponRecord) => row.clip,
    },
    {
      name: 'Rld',
      grow: 0,
      minWidth: '50px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: RangedWeaponRecord) => row.reload,
    },
    {
      name: 'Special',
      grow: 20,
      sortable: true,
      wrap: true,
      selector: (row: RangedWeaponRecord) => row.special,
    },
    {
      name: 'Wgt',
      grow: 0,
      minWidth: '50px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: RangedWeaponRecord) => row.weight,
    },
    {
      name: 'Availability',
      grow: 5,
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: RangedWeaponRecord) => availability(row.availability),
      format: (row: RangedWeaponRecord) => row.availability,
    },
  ];

  return (
    <WeaponGroupTable<RangedWeaponRecord>
      tableData={tableData}
      group={group}
      columns={columns}
    />
  );
}
