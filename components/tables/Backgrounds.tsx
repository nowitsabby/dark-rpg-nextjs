'use client'

import DataTable from 'react-data-table-component';
import SrdMarkdown from '../util/SrdMarkdown';

export interface BackgroundsTable {
  background: string;
  id: string;
  skills: Array<string | Array<string | string[]>>;
  talents: Array<string | Array<string | string[]>>;
  equipment: Array<string | Array<string | string[]>>;
  bonuses: Array<{
    title: string;
    effect: string;
  }>;
  aptitude: string[];
  traits: string[] | string | null;
}

export default function Backgrounds({ data }: { data: BackgroundsTable[] }) {
  const choiceArrayToString = (
    choices: Array<string | Array<string | string[]>>
  ) => {
    let retVal = '';
    choices.forEach((i) => {
      if (Array.isArray(i)) {
        i.forEach((j) => {
          if (Array.isArray(j)) {
            retVal = retVal.concat('(', j.join(' and '), '), ');
          } else {
            retVal = retVal.concat(j, ' or ');
          }
        });
        if (retVal.endsWith(' or ')) {
          retVal = retVal.slice(0, retVal.length - 4).concat(', ');
        }
      } else {
        retVal = retVal.concat(i, ', ');
      }
    });

    retVal = retVal.trim();
    if (retVal.endsWith(',')) {
      retVal = retVal.slice(0, retVal.length - 1);
    }
    return retVal.replaceAll('{X}', 'Pick One');
  };

  const columns = [
    {
      name: 'Background',
      grow: 2,
      wrap: true,
      allowOverflow: true,
      selector: (row: BackgroundsTable) => row.background,
      format: (row: BackgroundsTable) => (
        <strong id={row.id} className="table-anchor">
          {row.background}
        </strong>
      ),
    },
    {
      name: 'Skills',
      grow: 3,
      wrap: true,
      selector: (row: BackgroundsTable) => choiceArrayToString(row.skills),
    },
    {
      name: 'Talents',
      grow: 2,
      wrap: true,
      selector: (row: BackgroundsTable) => choiceArrayToString(row.talents),
    },
    {
      name: 'Equipment',
      grow: 3,
      wrap: true,
      selector: (row: BackgroundsTable) => choiceArrayToString(row.equipment),
    },
    {
      name: 'Bonuses',
      grow: 4,
      wrap: true,
      selector: (row: BackgroundsTable) => {
        let retVal = '';
        row.bonuses.forEach((value) => {
          retVal = retVal.concat(`${value.title}: ${value.effect}`);
        });
        return retVal;
      },
      format: (row: BackgroundsTable) => {
        let retVal = '';
        row.bonuses.forEach((value) => {
          retVal = retVal.concat(`__${value.title}__: ${value.effect}\n\n`);
        });
        return <SrdMarkdown text={retVal} />;
      },
    },
    {
      name: 'Aptitude',
      grow: 1,
      wrap: true,
      selector: (row: BackgroundsTable) => row.aptitude.join(' or '),
    },
    {
      name: 'Trait(s)',
      grow: 2,
      wrap: true,
      selector: (row: BackgroundsTable) => JSON.stringify(row.traits),
      format: (row: BackgroundsTable) => {
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
    <DataTable columns={columns} data={data} striped />
  );
}
