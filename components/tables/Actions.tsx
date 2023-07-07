'use client'

import DataTable from 'react-data-table-component';
import SrdMarkdown from '../util/SrdMarkdown';

export interface ActionsTable {
  name: string;
  id: string
  type: string;
  subtypes: string[];
  description: string;
}

export default function Actions({ data }: { data: ActionsTable[] }) {
  const columns = [
    {
      name: 'Action',
      grow: 1,
      wrap: true,
      selector: (row: ActionsTable) => row.name,
    },
    {
      name: 'Type',
      grow: 1,
      wrap: true,
      selector: (row: ActionsTable) => row.type,
    },
    {
      name: 'Sub-Types',
      grow: 1,
      wrap: true,
      selector: (row: ActionsTable) => row.subtypes.join(', '),
    },
    {
      name: 'Description',
      grow: 5,
      wrap: true,
      selector: (row: ActionsTable) => row.description,
      format: (row: ActionsTable) => {
        return <SrdMarkdown text={row.description} />;
      },
    },
  ];
  return ( 
    <DataTable
      columns={columns}
      data={data}
      striped
    />
  );
}
