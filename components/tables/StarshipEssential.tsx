'use client'

import StarshipComponents, {
  StarshipComponentRecord,
} from './StarshipComponents';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

export interface EssentialComponents {
  plasmaDrives: StarshipComponentRecord[];
  warpEngines: StarshipComponentRecord[];
  gellerFields: StarshipComponentRecord[];
  voidShields: StarshipComponentRecord[];
  bridges: StarshipComponentRecord[];
  lifeSustainers: StarshipComponentRecord[];
  crewQuarter: StarshipComponentRecord[];
  augurArrays: StarshipComponentRecord[];
}

export default function StarshipEssential({ data }: { data: EssentialComponents }) {
  return (
    <Tabs>
      <TabList>
        <Tab>Plasma Drives</Tab>
        <Tab>Warp Engines</Tab>
        <Tab>Geller Fields</Tab>
        <Tab>Void Shields</Tab>
        <Tab>Ship Bridges</Tab>
        <Tab>Life Sustainers</Tab>
        <Tab>Crew Quarters</Tab>
        <Tab>Augur Arrays</Tab>
      </TabList>

      <TabPanel>
        <StarshipComponents
            data={data.plasmaDrives}
          />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
            data={data.warpEngines}
          />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
            data={data.gellerFields}
          />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          data={data.voidShields}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          data={data.bridges}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          data={data.lifeSustainers}
        />
      </TabPanel>
      <TabPanel key="crew-quarter-tabpanel">
        <StarshipComponents
          data={data.crewQuarter}
        />
      </TabPanel>
      <TabPanel key="augur-arrays-tabpanel">
        <StarshipComponents
          data={data.augurArrays}
        />
      </TabPanel>
    </Tabs>
  );
}
