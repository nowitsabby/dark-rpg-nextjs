import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import {
  TorpedoGuidanceRecord,
  TorpedoGuidanceTable,
} from './TorpedoGuidanceTable';
import {
  TorpedoWarheadRecord,
  TorpedoWarheadTable,
} from './TorpedoWarheadTable';

export interface TorpedoesRecord {
  warheads: TorpedoWarheadRecord[];
  guidanceSystems: TorpedoGuidanceRecord[];
}

export function Torpedoes({ data }: { data: TorpedoesRecord }) {
  return (
    <Tabs>
      <TabList>
        <Tab>Warheads</Tab>
        <Tab>Guidance Systems</Tab>
      </TabList>

      <TabPanel>
        <TorpedoWarheadTable data={data?.warheads} />
      </TabPanel>
      <TabPanel>
        <TorpedoGuidanceTable data={data?.guidanceSystems} />
      </TabPanel>
    </Tabs>
  );
}
