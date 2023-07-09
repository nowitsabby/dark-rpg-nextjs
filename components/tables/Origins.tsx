'use client'

import DataTable from 'react-data-table-component';
import SrdMarkdown from '../util/SrdMarkdown';
import TableLink from './components/TableLink';
import { OriginsRecord } from '../types/Records';

export default function Origins({ rootPath, data }: { rootPath: string, data: OriginsRecord[] }) {
  const columns = [
    {
      name: 'Origin',
      grow: 1,
      wrap: true,
      allowOverflow: true,
      selector: (row: OriginsRecord) => row.name,
      format: (row: OriginsRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Char. Mods',
      grow: 1.25,
      wrap: true,
      selector: (row: OriginsRecord) =>
        `+ ${row.characteristicModifiers.plus[0]}, + ${row.characteristicModifiers.plus[1]}, - ${row.characteristicModifiers.minus}`,
      format: (row: OriginsRecord) => (
        <SrdMarkdown
          text={`__+__ ${row.characteristicModifiers.plus[0]}\n\n__+__ ${row.characteristicModifiers.plus[1]}\n\n__-__ ${row.characteristicModifiers.minus}`}
        />
      ),
    },
    {
      name: 'Fate',
      grow: 1,
      wrap: true,
      selector: (row: OriginsRecord) =>
        `${row.fateThreshold} (Blessing ${row.blessing}+)`,
    },
    {
      name: 'Bonus',
      grow: 4,
      wrap: true,
      selector: (row: OriginsRecord) =>
        `${row.bonus.title}: ${row.bonus.effect}`,
      format: (row: OriginsRecord) => (
        <SrdMarkdown text={`__${row.bonus.title}:__ ${row.bonus.effect}`} />
      ),
    },
    {
      name: 'Aptitude',
      grow: 1,
      selector: (row: OriginsRecord) => row.aptitude,
    },
    {
      name: 'Wounds',
      grow: 1,
      selector: (row: OriginsRecord) => `${row.wounds} + 1d5`,
    },
  ];
  return (
    <DataTable columns={columns} data={data} striped dense />
  );
}
