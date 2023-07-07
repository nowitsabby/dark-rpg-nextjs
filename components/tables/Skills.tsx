'use client'

import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import abbreviation from '../util/Abbreviation';
import FilterComponent from './components/FilterComponent';
import SrdMarkdown from '../util/SrdMarkdown';
import Stack from '@mui/material/Stack';
import TableLink from './components/TableLink';

export interface SkillsTable {
  name: string;
  id: string;
  specialist: boolean;
  specialisations: string[] | null;
  primaryCharacteristic: string;
  aptitudes: string[];
  descriptors: string[] | null;
  alternateCharacteristics: string[] | null;
  skillUse: string;
  description: string;
  exampleModifiers: string;
  specialUses: string[] | null;
}

export default function Skills({ rootPath, data }: { rootPath: string, data: SkillsTable[] }) {
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
      name: 'Skill',
      grow: 1,
      wrap: true,
      selector: (row: SkillsTable) =>
        `${row.name} ${row.primaryCharacteristic} ${abbreviation(
          row.primaryCharacteristic
        )}`,
        format: (row: SkillsTable) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
    {
      name: 'Specialist',
      grow: 1,
      wrap: true,
      selector: (row: SkillsTable) => (row.specialist ? 'Yes' : 'No'),
    },
    {
      name: 'Aptitudes',
      grow: 1,
      wrap: true,
      selector: (row: SkillsTable) => row.aptitudes.join(', '),
    },
    {
      name: 'Descriptors',
      grow: 2,
      wrap: true,
      selector: (row: SkillsTable) =>
        row.descriptors ? row.descriptors.join(', ') : '-',
    },
    {
      name: 'Skill Use',
      grow: 2,
      wrap: true,
      selector: (row: SkillsTable) => row.skillUse,
    },
    {
      name: 'Alt. Characteristics',
      grow: 2,
      wrap: true,
      selector: (row: SkillsTable) =>
        row.alternateCharacteristics
          ? row.alternateCharacteristics.join(', ')
          : '-',
    },
  ];

  const SkillInfo = ({
    specialisations,
    description,
    exampleModifiers,
    specialUses,
  }: {
    specialisations: string[] | null;
    description: string;
    exampleModifiers: string;
    specialUses: string[] | null;
  }) => (
    <Stack>
      {specialisations && (
        <SrdMarkdown text={`_${specialisations.join(', ')}_`} />
      )}
      <Stack direction="row" style={{ alignItems: 'start' }}>
        <Stack style={{ width: '60%', borderRight: '1px solid' }}>
          <SrdMarkdown text={description} />
          {specialUses && (
            <div>
              <strong>Special Uses</strong>
              <SrdMarkdown text={specialUses.join('\n\n')} />
            </div>
          )}
        </Stack>
        <div style={{ width: '40%', padding: '8px' }}>
          <strong>Example Modifiers</strong>
          <SrdMarkdown text={exampleModifiers} />
        </div>
      </Stack>
    </Stack>
  );

  return (
    <DataTable
      columns={columns}
      data={data.filter((item) => {
          if (filterText) {
            return (
              item.name
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.primaryCharacteristic
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
              item.descriptors
                ?.join(' ')
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.alternateCharacteristics
                ?.join(' ')
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.skillUse
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.specialUses
                ?.join(' ')
                .toLowerCase()
                .includes(filterText.toLowerCase())
            );
          }
          return true;
        })
      }
      striped
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      expandableRows
      expandableRowsComponent={({ data: row }) => (
        <SkillInfo
          specialisations={row.specialisations}
          description={row.description}
          exampleModifiers={row.exampleModifiers}
          specialUses={row.specialUses}
        />
      )}
    />
  );
}
