import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';
import SrdMarkdown from '../../util/SrdMarkdown';

export interface AttackCraftRecord {
  craft: string;
  type: string;
  speed: number;
  rating: number;
  size: number;
  special: { title: string; effect: string }[];
}

export function AttackCraftTable({
  tableData,
  group,
}: {
  tableData: AttackCraftRecord[];
  group: string;
}) {
  const [filterText, setFilterText] = useState('');
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(event) => setFilterText(event.currentTarget.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  const columns = [
    {
      name: 'Craft',
      wrap: true,
      selector: (row: AttackCraftRecord) => row.craft,
      format: (row: AttackCraftRecord) => <strong>{row.craft}</strong>,
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
                  item.craft
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