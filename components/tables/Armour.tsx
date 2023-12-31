'use client'

import { useEffect, useState } from 'react';
import { ArmourGroupTable } from './components/ArmourGroupTable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ArmourRecord } from '../types/Records';

export default function Armour({ rootPath, data }: { rootPath: string, data: ArmourRecord[] }) {
  const [armourGroups, setArmourGroups] = useState([] as string[]);

  useEffect(() => {
    setArmourGroups([...new Set(data.map((item) => item.type))]);
  }, [data]);

  return (
    <Tabs>
      <TabList>
        {armourGroups?.map((group: string) => (
          <Tab key={`${group}-tab`}>{group}</Tab>
        ))}
      </TabList>

      {armourGroups?.map((group: string) => (
          <TabPanel key={`${group}-tabpanel`}>
            <ArmourGroupTable
              rootPath={rootPath}
              group={group}
              tableData={data.filter((item) => item.type === group)}
            />
          </TabPanel>
        ))}
    </Tabs>
  );
}
