'use client'

import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import SrdMarkdown from '../util/SrdMarkdown';
import FilterComponent from './components/FilterComponent';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

export interface StarshipActionRecord {
  action: string;
  test: string;
  benefit: string;
}

export interface StarshipActionGroups {
  extended: StarshipActionRecord[];
  shooting: StarshipActionRecord[];
  manouevre: StarshipActionRecord[];
}

export default function StarshipActions({ data }: { data: StarshipActionGroups }) {
const columns = [
    {
      name: 'Action',
      selector: (row: StarshipActionRecord) => row.action,
    },
    {
      name: 'Test',
      wrap: true,
      selector: (row: StarshipActionRecord) => row.test,
    },
  ];

  const ActionsTable = ({ data }: { data: StarshipActionRecord[] }) => {
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
        columns={columns}
        data={
          Array.isArray(data)
            ? data.filter((item) => {
                if (filterText) {
                  return (
                    item.action
                      ?.toLowerCase()
                      .includes(filterText.toLowerCase()) ||
                    item.benefit
                      ?.toLowerCase()
                      .includes(filterText.toLowerCase()) ||
                    item.test?.toLowerCase().includes(filterText.toLowerCase())
                  );
                }
                return true;
              })
            : []
        }
        actions={subHeaderComponentMemo}
        expandableRows
        expandableRowsComponent={({ data: row }) => (
          <>
            <div style={{ padding: '4px 4px 0 12px' }}>
              <SrdMarkdown text={row.benefit} />
            </div>
            <hr />
          </>
        )}
      />
    );
  };

  return (
    <Tabs>
      <TabList>
        <Tab key="maneouver-tab">Maneouver Actions</Tab>
        <Tab key="shooting-tab">Shooting Actions</Tab>
        <Tab key="extended-tab">Extended Actions</Tab>
      </TabList>

      <TabPanel key="maneouver-tabpanel">
        <ActionsTable data={data?.manouevre} />
      </TabPanel>
      <TabPanel key="shotting-tabpanel">
        <ActionsTable data={data?.shooting} />
      </TabPanel>
      <TabPanel key="extended-tabpanel">
        <ActionsTable data={data?.extended} />
      </TabPanel>
    </Tabs>
  );
}
