'use client'

import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from './components/FilterComponent';
import SrdMarkdown from '../util/SrdMarkdown';
import TableLink from './components/TableLink';

export interface TalentType {
  name: string;
  id: string;
  specialist: boolean;
  specialisations: string[] | null;
  tier: number | null;
  aptitudes: string[] | null;
  prerequisites: string[] | null;
  alignment: string | null;
  benefit: string;
  source: string;
}

export default function Talents({ rootPath, data }: { rootPath: string, data: TalentType[] }) {
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
      selector: (row: TalentType) => (row.tier ? row.tier : 0),
    },
    {
      name: 'Talent',
      grow: 2,
      sortable: true,
      wrap: true,
      selector: (row: TalentType) => row.name,
      format: (row: TalentType) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Specialist',
      grow: 1,
      sortable: true,
      wrap: true,
      selector: (row: TalentType) => (row.specialist ? 'Yes' : 'No'),
    },
    {
      name: 'Prerequisites',
      grow: 4,
      wrap: true,
      selector: (row: TalentType) =>
        row.prerequisites ? row.prerequisites.join(', ') : '-',
    },
    {
      name: 'Aptitudes',
      grow: 2,
      wrap: true,
      selector: (row: TalentType) =>
        row.aptitudes ? row.aptitudes.join(', ') : '-',
    },
    {
      name: 'Alignment',
      grow: 1,
      wrap: true,
      selector: (row: TalentType) => (row.alignment ? row.alignment : '-'),
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
              item.benefit
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
          <SrdMarkdown text={row.benefit} />
          <hr />
        </div>
      )}
    />
  );
}
