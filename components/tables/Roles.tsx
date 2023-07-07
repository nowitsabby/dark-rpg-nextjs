'use client'

import DataTable from 'react-data-table-component';
import SrdMarkdown from '../util/SrdMarkdown';
import TableLink from './components/TableLink';

export interface RolesTable {
  name: string;
  id: string;
  bonus: {
    title: string;
    effect: string;
  };
  aptitudes: Array<string | string[]>;
  talent: string[];
}

export default function Roles({ rootPath, data }: { rootPath: string, data: RolesTable[] }) {
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
      selector: (row: RolesTable) => row.name,
      format: (row: RolesTable) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Bonus',
      grow: 4,
      wrap: true,
      selector: (row: RolesTable) => `${row.bonus.title}: ${row.bonus.effect}`,
      format: (row: RolesTable) => (
        <SrdMarkdown text={`__${row.bonus.title}:__ ${row.bonus.effect}`} />
      ),
    },
    {
      name: 'Aptitudes',
      grow: 3,
      wrap: true,
      selector: (row: RolesTable) => choiceArrayToString(row.aptitudes),
    },
    {
      name: 'Talent',
      grow: 1,
      wrap: true,
      selector: (row: RolesTable) =>
        row.talent.join(' or ').replaceAll('{X}', 'Pick One'),
    },
  ];
  return (
    <DataTable columns={columns} data={data} striped />
  );
}
