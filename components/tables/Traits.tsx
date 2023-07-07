'use client'

import DataTable from 'react-data-table-component';
import SrdMarkdown from '../util/SrdMarkdown';
import TableLink from './components/TableLink';

export interface TraitTable {
  name: string;
  id: string;
  description: string;
}

export default function Traits({ rootPath, data }: { rootPath: string, data: TraitTable[] }) {
  const columns = [
    {
      name: 'Trait',
      allowOverflow: true,
      selector: (row: TraitTable) => row.name,
      format: (row: TraitTable) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
  ];
  return (
    <DataTable
      columns={columns}
      data={data}
      striped
      expandableRows
      expandableRowExpanded={() => true}
      expandableRowsComponent={({ data: row }) => (
        <div style={{ padding: '4px' }}>
          <SrdMarkdown text={row.description} />
          <hr />
        </div>
      )}
    />
  );
}
