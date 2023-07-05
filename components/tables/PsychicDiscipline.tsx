'use client'

import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from './components/FilterComponent';
import SrdMarkdown from '../util/SrdMarkdown';
import Stack from '@mui/material/Stack';

export interface PsychicPowerRecord {
  power: string;
  cost: number;
  prerequisites: string[];
  action: string;
  focus: string;
  range: string;
  sustained: string;
  subtypes: string[];
  effects: string;
  source: string;
}

export interface PsychicDisciplineRecord {
  discipline: string;
  information: string;
  powers: PsychicPowerRecord[];
}

export default function PsychicDiscipline({ data }: { data: PsychicDisciplineRecord }) {
  
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
      name: 'Power',
      grow: 1,
      sortable: true,
      wrap: true,
      selector: (row: PsychicPowerRecord) => row.power,
      format: (row: PsychicPowerRecord) => <strong>{row.power}</strong>,
    },
    {
      name: 'Cost',
      grow: 0.25,
      sortable: true,
      wrap: true,
      selector: (row: PsychicPowerRecord) => `${row.cost}xp`,
    },
    {
      name: 'Prerequisites',
      grow: 1,
      wrap: true,
      selector: (row: PsychicPowerRecord) =>
        row.prerequisites ? row.prerequisites.join(', ') : '-',
    },
    {
      name: 'Action',
      grow: 1,
      wrap: true,
      selector: (row: PsychicPowerRecord) => row.action,
    },
    {
      name: 'Focus',
      grow: 1,
      wrap: true,
      selector: (row: PsychicPowerRecord) => row.focus,
    },
    {
      name: 'Range',
      grow: 1,
      wrap: true,
      selector: (row: PsychicPowerRecord) => row.range,
    },
    {
      name: 'Sustained',
      grow: 1,
      wrap: true,
      selector: (row: PsychicPowerRecord) => row.sustained,
    },
    {
      name: 'Subtypes',
      grow: 1,
      wrap: true,
      selector: (row: PsychicPowerRecord) => row.subtypes.join(', '),
    },
  ];

  const tableData = data.powers;

  return (
    <Stack>
      <SrdMarkdown text={data?.information} />
      <DataTable
        title={<h4>Powers</h4>}
        columns={columns}
        data={
          Array.isArray(tableData)
            ? tableData.filter((item) => {
                if (filterText) {
                  return (
                    item.power
                      ?.toLowerCase()
                      .includes(filterText.toLowerCase()) ||
                    item.prerequisites
                      ?.join(' ')
                      .toLowerCase()
                      .includes(filterText.toLowerCase()) ||
                    item.focus
                      ?.toLowerCase()
                      .includes(filterText.toLowerCase()) ||
                    item.subtypes
                      ?.join(' ')
                      .toLowerCase()
                      .includes(filterText.toLowerCase())
                  );
                }
                return true;
              })
            : []
        }
        striped
        actions={subHeaderComponentMemo}
        expandableRows
        expandableRowsComponent={({ data: row }) => (
          <div style={{ padding: '4px' }}>
            <SrdMarkdown text={row.effects} />
            <hr />
          </div>
        )}
      />
    </Stack>
  );
}