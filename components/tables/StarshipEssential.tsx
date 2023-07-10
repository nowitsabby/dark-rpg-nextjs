'use client'

import StarshipComponents, {
} from './StarshipComponents';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { StarshipComponentRecord } from '../types/Records';

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

export type EssentialComponentsKey = keyof EssentialComponents;

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
          rootPath={`${rootPath}/plasma_drives`}
          data={data.plasmaDrives}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={`${rootPath}/warp_engines`}
          data={data.warpEngines}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={`${rootPath}/geller_fields`}
          data={data.gellerFields}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={`${rootPath}/void_shields`}
          data={data.voidShields}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={`${rootPath}/bridges`}
          data={data.bridges}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={`${rootPath}/life_sustainers`}
          data={data.lifeSustainers}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={`${rootPath}/crew_quarter`}
          data={data.crewQuarter}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={`${rootPath}/augur_arrays`}
          data={data.augurArrays}
        />
      </TabPanel>
    </Tabs>
  );
}
