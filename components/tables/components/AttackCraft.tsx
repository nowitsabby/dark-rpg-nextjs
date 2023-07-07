import { useEffect, useState } from 'react';
import { AttackCraftRecord, AttackCraftTable } from './AttackCraftTable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

export default function AttackCraft({ rootPath, data }: { rootPath: string, data: AttackCraftRecord[] }) {
  const [groups, setGroups] = useState([] as string[]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setGroups([...new Set(data.map((item) => item.type))]);
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
            <AttackCraftTable
                rootPath={rootPath}
                group={group}
                tableData={data.filter((item) => item.type === group)}
              />
          </TabPanel>
        ))}
    </Tabs>
  );
}
