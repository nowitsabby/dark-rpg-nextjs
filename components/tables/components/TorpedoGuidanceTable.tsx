import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import availability from '../../util/Availability';
import FilterComponent from './FilterComponent';
import SrdMarkdown from '../../util/SrdMarkdown';

export interface TorpedoGuidanceRecord {
  guidanceSystem: string;
  availability: string;
  rating: string;
  description: string;
}

export function TorpedoGuidanceTable({
  data,
}: {
  data: TorpedoGuidanceRecord[];
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
      name: 'Guidance System',
      wrap: true,
      selector: (row: TorpedoGuidanceRecord) => row.guidanceSystem,
      format: (row: TorpedoGuidanceRecord) => (
        <strong>{row.guidanceSystem}</strong>
      ),
    },
    {
      name: 'Availability',
      grow: 5,
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: TorpedoGuidanceRecord) => availability(row.availability),
      format: (row: TorpedoGuidanceRecord) => row.availability,
    },
    {
      name: 'Torpedo Rating',
      sortable: true,
      wrap: true,
      selector: (row: TorpedoGuidanceRecord) => row.rating,
    },
  ];

  return (
    <DataTable
      dense
      title={<h4>Warheads</h4>}
      columns={columns}
      data={
        data.filter((item) => {
          if (filterText) {
            return (
              item.guidanceSystem
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
