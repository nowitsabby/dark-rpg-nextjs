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

export default function StarshipEssential({ rootPath, data }: { rootPath: string, data: EssentialComponents }) {
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
          rootPath={rootPath}
            data={data.plasmaDrives}
          />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={rootPath}
            data={data.warpEngines}
          />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={rootPath}
            data={data.gellerFields}
          />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={rootPath}
          data={data.voidShields}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={rootPath}
          data={data.bridges}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={rootPath}
          data={data.lifeSustainers}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={rootPath}
          data={data.crewQuarter}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={rootPath}
          data={data.augurArrays}
        />
      </TabPanel>
    </Tabs>
  );
}
