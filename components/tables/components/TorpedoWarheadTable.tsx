import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import availability from '../../util/Availability';
import FilterComponent from './FilterComponent';
import SrdMarkdown from '../../util/SrdMarkdown';

export interface TorpedoWarheadRecord {
  warhead: string;
  availability: string;
  speed: number;
  damage: string;
  crit: number | string;
  range: number;
  special: { title: string; effect: string }[];
}

export function TorpedoWarheadTable({
  data,
}: {
  data: TorpedoWarheadRecord[];
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
      name: 'Warhead',
      wrap: true,
      selector: (row: TorpedoWarheadRecord) => row.warhead,
      format: (row: TorpedoWarheadRecord) => <strong>{row.warhead}</strong>,
    },
    {
      name: 'Availability',
      grow: 5,
      compact: true,
      sortable: true,
      wrap: true,
      selector: (row: TorpedoWarheadRecord) => availability(row.availability),
      format: (row: TorpedoWarheadRecord) => row.availability,
    },
    {
      name: 'Speed',
      sortable: true,
      wrap: true,
      selector: (row: TorpedoWarheadRecord) => row.speed,
    },
    {
      name: 'Dmg',
      sortable: true,
      wrap: true,
      selector: (row: TorpedoWarheadRecord) => row.damage,
    },
    {
      name: 'Crit',
      sortable: true,
      wrap: true,
      selector: (row: TorpedoWarheadRecord) => row.crit,
    },
    {
      name: 'Range',
      sortable: true,
      wrap: true,
      selector: (row: TorpedoWarheadRecord) => row.range,
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
              item.warhead
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
