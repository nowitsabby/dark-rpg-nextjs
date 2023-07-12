'use client'

import DataTable from 'react-data-table-component';
import SrdMarkdown from '../util/SrdMarkdown';
import TableLink from './components/TableLink';
import { BackgroundRecord } from '../types/Records';
import { choiceArrayToString } from '../util/helpers';

export default function Backgrounds({ rootPath, data }: { rootPath: string, data: BackgroundRecord[] }) {
  const columns = [
    {
      name: 'Background',
      grow: 2,
      wrap: true,
      allowOverflow: true,
      selector: (row: BackgroundRecord) => row.name,
      format: (row: BackgroundRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Skills',
      grow: 3,
      wrap: true,
      selector: (row: BackgroundRecord) => choiceArrayToString(row.skills),
    },
    {
      name: 'Talents',
      grow: 2,
      wrap: true,
      selector: (row: BackgroundRecord) => choiceArrayToString(row.talents),
    },
    {
      name: 'Equipment',
      grow: 3,
      wrap: true,
      selector: (row: BackgroundRecord) => choiceArrayToString(row.equipment),
    },
    {
      name: 'Bonuses',
      grow: 4,
      wrap: true,
      selector: (row: BackgroundRecord) => {
        let retVal = '';
        row.bonuses.forEach((value) => {
          retVal = retVal.concat(`${value.title}: ${value.description}`);
        });
        return retVal;
      },
      format: (row: BackgroundRecord) => {
        let retVal = '';
        row.bonuses.forEach((value) => {
          retVal = retVal.concat(`__${value.title}__: ${value.description}\n\n`);
        });
        return <SrdMarkdown text={retVal} />;
      },
    },
    {
      name: 'Aptitude',
      grow: 2,
      wrap: true,
      selector: (row: BackgroundRecord) => row.aptitude.join(' or '),
    },
    {
      name: 'Trait(s)',
      grow: 2,
      wrap: true,
      selector: (row: BackgroundRecord) => JSON.stringify(row.traits),
      format: (row: BackgroundRecord) => {
        if (Array.isArray(row.traits)) {
          return (
            <SrdMarkdown text={`One of: \n\n${row.traits.join('\n\n')}`} />
          );
        }
        return row.traits ? row.traits : '-';
      },
    },
  ];

  return (
    <DataTable columns={columns} data={data} striped  dense />
  );
}
