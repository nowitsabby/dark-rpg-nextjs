'use client'

import DataTable from 'react-data-table-component';
import SrdMarkdown from '../util/SrdMarkdown';
import TableLink from './components/TableLink';
import { RoleRecord } from '../types/Records';

export default function Roles({ rootPath, data }: { rootPath: string, data: RoleRecord[] }) {
  const choiceArrayToString = (choices: Array<string | string[]>) => {
    let retVal = '';
    choices.forEach((i) => {
      if (Array.isArray(i)) {
        retVal = retVal.concat(i.join(' or '), ', ');
      } else {
        retVal = retVal.concat(i, ', ');
      }
    });

    retVal = retVal.trim();
    if (retVal.endsWith(',')) {
      retVal = retVal.slice(0, retVal.length - 1);
    }
    return retVal;
  };

  const columns = [
    {
      name: 'Role',
      grow: 2,
      wrap: true,
      allowOverflow: true,
      selector: (row: RoleRecord) => row.name,
      format: (row: RoleRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Bonus',
      grow: 4,
      wrap: true,
      selector: (row: RoleRecord) => `${row.bonus.title}: ${row.bonus.effect}`,
      format: (row: RoleRecord) => (
        <SrdMarkdown text={`__${row.bonus.title}:__ ${row.bonus.effect}`} />
      ),
    },
    {
      name: 'Aptitudes',
      grow: 3,
      wrap: true,
      selector: (row: RoleRecord) => choiceArrayToString(row.aptitudes),
    },
    {
      name: 'Talent',
      grow: 1,
      wrap: true,
      selector: (row: RoleRecord) =>
        row.talent.join(' or ').replaceAll('{X}', 'Pick One'),
    },
  ];
  return (
    <DataTable columns={columns} data={data} striped />
  );
}
