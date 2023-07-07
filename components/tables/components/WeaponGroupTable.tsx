import { useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import FilterComponent from './FilterComponent';
import SrdMarkdown from '../../util/SrdMarkdown';

export interface WeaponRecord {
  name: string;
  id: string;
  type: string;
  class: string;
  range: string;
  damage: string;
  penetration: number | string;
  special: string;
  description: string;
  weight: string;
  availability: string;
  source: string;
}

export interface RangedWeaponRecord extends WeaponRecord {
  rateOfFire: string;
  clip: number | string;
  reload: string;
}

export interface MeleeWeaponRecord extends WeaponRecord {
  twoHanded: boolean;
}

export function WeaponGroupTable<Type extends WeaponRecord>({
  tableData,
  group,
  columns,
}: {
  tableData: Type[];
  group: string;
  columns: TableColumn<Type>[];
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
                  item.class
                    ?.toLowerCase()
                    .includes(filterText.toLowerCase()) ||
                  item.special
                    ?.toLowerCase()
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
