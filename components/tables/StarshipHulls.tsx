'use client'

import { useEffect, useState } from 'react';
import { HullTable, StarshipHullRecord } from './components/HullTable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

export default function StarshipHulls({ rootPath, data }: { rootPath: string, data: StarshipHullRecord[] }) {
  const [groups, setGroups] = useState([] as string[]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setGroups([...new Set(data.map((item) => item.class))]);
    }
  }, [data]);

  return (
    <Tabs>
      <TabList>
        {groups?.map((group: string) => (
          <Tab key={`${group}-tab`}>{group}</Tab>
        ))}
      </TabList>

      {groups?.map((group: string) => (
          <TabPanel key={`${group}-tabpanel`}>
            <HullTable
                rootPath={rootPath}
                group={group}
                tableData={data.filter((item) => item.class === group)}
              />
          </TabPanel>
        ))}
    </Tabs>
  );
}
