'use client'

import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from './components/FilterComponent';
import SrdMarkdown from '../util/SrdMarkdown';
import TableLink from './components/TableLink';
import { TalentRecord } from '../types/Records';



export default function Talents({ rootPath, data }: { rootPath: string, data: TalentRecord[] }) {
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
      name: 'Tier',
      grow: 0.25,
      sortable: true,
      wrap: true,
      selector: (row: TalentRecord) => (row.tier ? row.tier : 0),
    },
    {
      name: 'Talent',
      grow: 2,
      sortable: true,
      wrap: true,
      selector: (row: TalentRecord) => row.name,
      format: (row: TalentRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Specialist',
      grow: 1,
      sortable: true,
      wrap: true,
      selector: (row: TalentRecord) => (row.specialist ? 'Yes' : 'No'),
    },
    {
      name: 'Prerequisites',
      grow: 4,
      wrap: true,
      selector: (row: TalentRecord) =>
        row.prerequisites ? row.prerequisites.join(', ') : '-',
    },
    {
      name: 'Aptitudes',
      grow: 2,
      wrap: true,
      selector: (row: TalentRecord) =>
        row.aptitudes ? row.aptitudes.join(', ') : '-',
    },
    {
      name: 'Alignment',
      grow: 1,
      wrap: true,
      selector: (row: TalentRecord) => (row.alignment ? row.alignment : '-'),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={
        data.filter((item) => {
          if (filterText) {
            return (
              item.name
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.aptitudes
                ?.join(' ')
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.specialisations
                ?.join(' ')
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.prerequisites
                ?.join(' ')
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.alignment
                ?.toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(filterText.toLowerCase())
            );
          }
          return true;
        })
      }
      striped
      actions={subHeaderComponentMemo}
      expandableRows
      expandableRowsComponent={({ data: row }) => (
        <div style={{ padding: '4px' }}>
          {row.specialisations && (
            <SrdMarkdown text={`_${row.specialisations.join(', ')}_`} />
          )}
          <SrdMarkdown text={row.description} />
          <hr />
        </div>
      )}
    />
  );
}
