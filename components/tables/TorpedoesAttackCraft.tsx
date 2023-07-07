'use client'

import AttackCraft from './components/AttackCraft';
import { AttackCraftRecord } from './components/AttackCraftTable';
import { Torpedoes, TorpedoesRecord } from './components/Torpedoes';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

export interface TorpedoAttackCraft {
    attackCraft: AttackCraftRecord[];
    torpedoes: TorpedoesRecord;
  };

export default function TorpedoesAttackCraft({ rootPath, data }: { rootPath: string, data: TorpedoAttackCraft }) {

  return (
    <Tabs>
      <TabList>
        <Tab>Torpedoes</Tab>
        <Tab>Attack Craft</Tab>
      </TabList>

      <TabPanel>
        <Torpedoes data={data?.torpedoes} />
      </TabPanel>
      <TabPanel>
        <AttackCraft rootPath={`${rootPath}`} data={data?.attackCraft} />
      </TabPanel>
    </Tabs>
  );
}
