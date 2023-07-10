'use client'

import DataTable from 'react-data-table-component';
import SrdMarkdown from '../util/SrdMarkdown';
import TableLink from './components/TableLink';
import { OriginRecord } from '../types/Records';

export default function Origins({ rootPath, data }: { rootPath: string, data: OriginRecord[] }) {
  const columns = [
    {
      name: 'Origin',
      grow: 1,
      wrap: true,
      allowOverflow: true,
      selector: (row: OriginRecord) => row.name,
      format: (row: OriginRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Char. Mods',
      grow: 1.25,
      wrap: true,
      selector: (row: OriginRecord) =>
        `+ ${row.characteristicModifiers.plus[0]}, + ${row.characteristicModifiers.plus[1]}, - ${row.characteristicModifiers.minus}`,
      format: (row: OriginRecord) => (
        <SrdMarkdown
          text={`__+__ ${row.characteristicModifiers.plus[0]}\n\n__+__ ${row.characteristicModifiers.plus[1]}\n\n__-__ ${row.characteristicModifiers.minus}`}
        />
      ),
    },
    {
      name: 'Fate',
      grow: 1,
      wrap: true,
      selector: (row: OriginRecord) =>
        `${row.fateThreshold} (Blessing ${row.blessing}+)`,
    },
    {
      name: 'Bonus',
      grow: 4,
      wrap: true,
      selector: (row: OriginRecord) =>
        `${row.bonus.title}: ${row.bonus.effect}`,
      format: (row: OriginRecord) => (
        <SrdMarkdown text={`__${row.bonus.title}:__ ${row.bonus.effect}`} />
      ),
    },
    {
      name: 'Aptitude',
      grow: 1,
      selector: (row: OriginRecord) => row.aptitude,
    },
    {
      name: 'Wounds',
      grow: 1,
      selector: (row: OriginRecord) => `${row.wounds} + 1d5`,
    },
  ];
  return (
    <DataTable columns={columns} data={data} striped dense />
  );
}
