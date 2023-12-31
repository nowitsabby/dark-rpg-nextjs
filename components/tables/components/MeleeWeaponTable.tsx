import { MeleeWeaponRecord } from '@/components/types/Records';
import availability from '../../util/Availability';
import TableLink from './TableLink';
import { WeaponGroupTable } from './WeaponGroupTable';

export default function MeleeWeaponTable({
  rootPath,
  tableData,
  group,
}: {
  rootPath: string,
  tableData: MeleeWeaponRecord[];
  group: string;
}) {
  const columns = [
    {
      name: 'Weapon',
      grow: 10,
      sortable: true,
      wrap: true,
      selector: (row: MeleeWeaponRecord) => row.name,
      format: (row: MeleeWeaponRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Class',
      grow: 0,
      minWidth: '50px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: MeleeWeaponRecord) => row.class,
    },
    {
      name: '2-H',
      grow: 0,
      minWidth: '50px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: MeleeWeaponRecord) => row.twoHanded,
      format: (row: MeleeWeaponRecord) => (row.twoHanded ? 'Yes' : 'No'),
    },
    {
      name: 'Rng',
      grow: 0,
      minWidth: '50px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: MeleeWeaponRecord) => row.range,
    },
    {
      name: 'Dmg',
      grow: 0,
      minWidth: '75px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: MeleeWeaponRecord) => row.damage,
    },
    {
      name: 'Pen',
      grow: 0,
      minWidth: '50px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: MeleeWeaponRecord) => row.penetration,
    },
    {
      name: 'Special',
      grow: 20,
      sortable: true,
      wrap: true,
      selector: (row: MeleeWeaponRecord) => row.special,
    },
    {
      name: 'Wgt',
      grow: 0,
      minWidth: '50px',
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: MeleeWeaponRecord) => row.weight,
    },
    {
      name: 'Availability',
      grow: 5,
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: MeleeWeaponRecord) => availability(row.availability),
      format: (row: MeleeWeaponRecord) => row.availability,
    },
  ];

  return (
    <WeaponGroupTable<MeleeWeaponRecord>
      tableData={tableData}
      group={group}
      columns={columns}
    />
  );
}
