'use client'

import DataTable from 'react-data-table-component';
import SrdMarkdown from '../util/SrdMarkdown';
import TableLink from './components/TableLink';
import { TraitRecord } from '../types/Records';

export default function Traits({ rootPath, data }: { rootPath: string, data: TraitRecord[] }) {
  const columns = [
    {
      name: 'Trait',
      allowOverflow: true,
      selector: (row: TraitRecord) => row.name,
      format: (row: TraitRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
  ];
  return (
    <DataTable
      columns={columns}
      data={data}
      striped
      expandableRows
      expandableRowsComponent={({ data: row }) => (
        <div style={{ padding: '4px' }}>
          <SrdMarkdown text={row.description} />
          <hr />
        </div>
      )}
    />
  );
}
