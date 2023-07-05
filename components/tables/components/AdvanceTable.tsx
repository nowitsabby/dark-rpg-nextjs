import DataTable from 'react-data-table-component';
import SrdMarkdown from '../../util/SrdMarkdown';

export interface AdvanceType {
  advance: string;
  cost: string;
  information: string;
}

export function AdvanceTable({ tableData }: { tableData: AdvanceType[] }) {
  const columns = [
    {
      name: 'Advance',
      grow: 1,
      sortable: true,
      wrap: true,
      selector: (row: AdvanceType) => row.advance,
    },
    {
      name: 'Cost',
      grow: 1,
      sortable: true,
      wrap: true,
      selector: (row: AdvanceType) => row.cost,
    },
    {
      name: 'Info',
      grow: 5,
      wrap: true,
      selector: (row: AdvanceType) => row.information,
      format: (row: AdvanceType) => <SrdMarkdown text={row.information} />,
    },
  ];

  return (
    <DataTable
      title={<h4>Advances</h4>}
      columns={columns}
      data={tableData}
      striped
    />
  );
}
