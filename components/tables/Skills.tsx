'use client'

import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import abbreviation from '../util/Abbreviation';
import FilterComponent from './components/FilterComponent';
import TableLink from './components/TableLink';
import { SkillRecord } from '../types/Records';
import SkillInfo from './components/SkillInfo';

export default function Skills({ rootPath, data }: { rootPath: string, data: SkillRecord[] }) {
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
      selector: (row: SkillRecord) =>
        `${row.name} ${row.primaryCharacteristic} ${abbreviation(
          row.primaryCharacteristic
        )}`,
        format: (row: SkillRecord) => (
          <TableLink rootPath={rootPath} id={row.id} name={`${row.name} (${abbreviation(row.primaryCharacteristic)})`} />
        ),
    },
    {
      name: 'Specialist',
      grow: 1,
      wrap: true,
      selector: (row: SkillRecord) => (row.specialist ? 'Yes' : 'No'),
    },
    {
      name: 'Aptitudes',
      grow: 1,
      wrap: true,
      selector: (row: SkillRecord) => row.aptitudes.join(', '),
    },
    {
      name: 'Alignment',
      grow: 1,
      wrap: true,
      selector: (row: SkillRecord) => row.alignment,
    },
    {
      name: 'Descriptors',
      grow: 2,
      wrap: true,
      selector: (row: SkillRecord) =>
        row.descriptors ? row.descriptors.join(', ') : '-',
    },
    {
      name: 'Use',
      grow: 2,
      wrap: true,
      selector: (row: SkillRecord) => row.skillUse,
    },
    {
      name: 'Alt. Char.',
      grow: 2,
      wrap: true,
      selector: (row: SkillRecord) =>
        row.alternateCharacteristics
          ? row.alternateCharacteristics.join(', ')
          : '-',
    },
  ];

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
