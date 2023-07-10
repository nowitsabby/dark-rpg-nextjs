import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';
import SrdMarkdown from '../../util/SrdMarkdown';
import TableLink from './TableLink';

export interface AttackCraftRecord {
  name: string;
  id: string;
  type: string;
  speed: number;
  rating: number;
  size: number;
  special: { title: string; effect: string }[];
}

export function AttackCraftTable({
  rootPath,
  tableData,
  group,
}: {
  rootPath: string;
  tableData: AttackCraftRecord[];
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
      name: 'Craft',
      wrap: true,
      selector: (row: AttackCraftRecord) => row.name,
    },
    {
      name: 'Speed',
      sortable: true,
      wrap: true,
      selector: (row: AttackCraftRecord) => row.speed,
    },
    {
      name: 'Craft Rating',
      sortable: true,
      wrap: true,
      selector: (row: AttackCraftRecord) => row.rating,
    },
    {
      name: 'Squadron Size',
      sortable: true,
      wrap: true,
      selector: (row: AttackCraftRecord) => row.size,
    },
  ];

  return (
    <DataTable
      dense
      title={<h4>{group}</h4>}
      columns={columns}
      data={
        Array.isArray(tableData)
          ? tableData.filter((item) => {
              if (filterText) {
                return (
                  item.name
                    ?.toLowerCase()
                    .includes(filterText.toLowerCase()) ||
                  item.special
                    ?.map((value) => `${value.title} ${value.effect}`)
                    .join(' ')
                    .toLowerCase()
                    .includes(filterText.toLowerCase())
                );
              }
              return true;
            })
          : []
      }
      actions={subHeaderComponentMemo}
      expandableRows
      expandableRowDisabled={(row) => row.special.length < 1}
      expandableRowsComponent={({ data: row }) => (
        <>
          <div style={{ padding: '4px 4px 0 12px' }}>
            <SrdMarkdown
              text={row.special
                ?.map((value) => `__${value.title}:__ ${value.effect}`)
                .join('\n\n')}
            />
          </div>
          <hr />
        </>
      )}
      conditionalRowStyles={[
        {
          when: (row) => row.special.length < 1,
          classNames: ['no-expand'],
        },
      ]}
    />
  );
}
