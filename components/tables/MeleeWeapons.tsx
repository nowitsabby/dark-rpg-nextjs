'use client'

import { useEffect, useState } from 'react';
import MeleeWeaponTable from './components/MeleeWeaponTable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { MeleeWeaponRecord } from '../types/Records';

export default function MeleeWeapons({ rootPath, data }: { rootPath: string, data: MeleeWeaponRecord[] }) { 
  const [weaponGroups, setWeaponGroups] = useState([] as string[]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setWeaponGroups([...new Set(data.map((item) => item.type))]);
    }
  }, [data]);

  return (
    <Tabs>
      <TabList>
        {weaponGroups?.map((group: string) => (
          <Tab key={`${group}-tab`}>{group}</Tab>
        ))}
      </TabList>

      {weaponGroups?.map((group: string) => (
          <TabPanel key={`${group}-tabpanel`}>
            <MeleeWeaponTable
              rootPath={rootPath}
              group={group}
              tableData={data.filter((item) => item.type === group)}
            />
          </TabPanel>
        ))}
    </Tabs>
  );
}
