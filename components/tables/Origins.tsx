'use client'

import DataTable from 'react-data-table-component';
import SrdMarkdown from '../util/SrdMarkdown';
import TableLink from './components/TableLink';

export interface OriginsTable {
  name: string;
  id: string;
  characteristicModifiers: {
    plus: string[];
    minus: string;
  };
  fateThreshold: number;
  blessing: number;
  bonus: {
    title: string;
    effect: string;
  };
  aptitude: string;
  wounds: number;
}

export default function Origins({ rootPath, data }: { rootPath: string, data: OriginsTable[] }) {
  const columns = [
    {
      name: 'Origin',
      grow: 1,
      wrap: true,
      allowOverflow: true,
      selector: (row: OriginsTable) => row.name,
      format: (row: OriginsTable) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Characteristic Modifiers',
      grow: 1.25,
      wrap: true,
      selector: (row: OriginsTable) =>
        `+ ${row.characteristicModifiers.plus[0]}, + ${row.characteristicModifiers.plus[1]}, - ${row.characteristicModifiers.minus}`,
      format: (row: OriginsTable) => (
        <SrdMarkdown
          text={`__+__ ${row.characteristicModifiers.plus[0]}\n\n__+__ ${row.characteristicModifiers.plus[1]}\n\n__-__ ${row.characteristicModifiers.minus}`}
        />
      ),
    },
    {
      name: 'Fate Threshold',
      grow: 1,
      wrap: true,
      selector: (row: OriginsTable) =>
        `${row.fateThreshold} (Emperor's Blessing ${row.blessing}+)`,
    },
    {
      name: 'Bonus',
      grow: 4,
      wrap: true,
      selector: (row: OriginsTable) =>
        `${row.bonus.title}: ${row.bonus.effect}`,
      format: (row: OriginsTable) => (
        <SrdMarkdown text={`__${row.bonus.title}:__ ${row.bonus.effect}`} />
      ),
    },
    {
      name: 'Aptitude',
      grow: 1,
      selector: (row: OriginsTable) => row.aptitude,
    },
    {
      name: 'Wounds',
      grow: 1,
      selector: (row: OriginsTable) => `${row.wounds} + 1d5`,
    },
  ];
  return (
    <DataTable columns={columns} data={data} striped />
  );
}
