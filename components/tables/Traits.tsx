'use client'

import DataTable from 'react-data-table-component';
import SrdMarkdown from '../util/SrdMarkdown';

export interface TraitTable {
  trait: string;
  id: string;
  description: string;
}

export default function Traits({ data }: { data: TraitTable[] }) {
  const columns = [
    {
      name: 'Trait',
      allowOverflow: true,
      selector: (row: TraitTable) => row.trait,
      format: (row: TraitTable) => (
        <h5 id={row.id} className="table-anchor">
          {row.trait}
        </h5>
      ),
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
