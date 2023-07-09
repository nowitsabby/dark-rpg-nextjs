import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import availability from '../../util/Availability';
import FilterComponent from './FilterComponent';
import SrdMarkdown from '../../util/SrdMarkdown';
import TableLink from './TableLink';
import { ArmourRecord } from '@/components/types/Records';

export function ArmourGroupTable({
  rootPath,
  tableData,
  group,
}: {
  rootPath: string;
  tableData: ArmourRecord[];
  group: string;
}) {
  const [filterText, setFilterText] = useState('');
  const subHeaderComponentMemo = useMemo(() => {
    return (
      <FilterComponent
        onFilter={(event) => setFilterText(event.currentTarget.value)}
        filterText={filterText}
      />
    );
  }, [filterText]);

  const columns = [
    {
      name: 'Armour',
      grow: 10,
      sortable: true,
      wrap: true,
      selector: (row: ArmourRecord) => row.name,
      format: (row: ArmourRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'AP',
      grow: 0,
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: ArmourRecord) => row.ap,
    },
    {
      name: 'Max Ag',
      grow: 0,
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: ArmourRecord) => (row.maxAg ? row.maxAg : '-'),
    },
    {
      name: 'Locations',
      grow: 10,
      sortable: true,
      wrap: true,
      selector: (row: ArmourRecord) =>
        row.locations.length === 4 ? 'All' : row.locations.join(', '),
    },
    {
      name: 'Wgt',
      grow: 0,
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: ArmourRecord) => row.weight,
    },
    {
      name: 'Availability',
      grow: 5,
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: ArmourRecord) => availability(row.availability),
      format: (row: ArmourRecord) => row.availability,
    },
  ];

  return (
    <DataTable
      dense
      title={<h4>{group}</h4>}
      columns={columns}
      data={
        tableData.filter((item) => {
          if (filterText) {
            return (
              item.name
                ?.toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.locations
                ?.join(' ')
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.availability
                ?.toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.description
                ?.toLowerCase()
                .includes(filterText.toLowerCase())
            );
          }
          return true;
        })
      }
      actions={subHeaderComponentMemo}
      expandableRows
      expandableRowDisabled={(row) => row.description.length < 1}
      expandableRowsComponent={({ data: row }) => (
        <>
          <div style={{ padding: '4px 4px 0 12px' }}>
            <SrdMarkdown text={row.description} />
          </div>
          <hr />
        </>
      )}
      conditionalRowStyles={[
        {
          when: (row) => row.description.length < 1,
          classNames: ['no-expand'],
        },
      ]}
    />
  );
}
