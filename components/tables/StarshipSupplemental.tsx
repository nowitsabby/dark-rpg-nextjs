'use client'

import StarshipComponents from './StarshipComponents';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { StarshipComponentRecord } from '../types/Records';

export interface SupplementalComponents {
  cargoHolds: StarshipComponentRecord[];
  passengerBays: StarshipComponentRecord[];
  enhancements: StarshipComponentRecord[];
  facilities: StarshipComponentRecord[];
}

export type SupplementalComponentsKey = keyof SupplementalComponents;

export default function StarshipSupplemental({ rootPath, data }: { rootPath: string, data: SupplementalComponents }) {
  
  return (
    <Tabs>
      <TabList>
        <Tab>Cargo Holds</Tab>
        <Tab>Passenger Bays</Tab>
        <Tab>Augments and Enhancements</Tab>
        <Tab>Additional Facilities</Tab>
      </TabList>

      <TabPanel>
        <StarshipComponents
          rootPath={`${rootPath}/cargo_holds`}
          data={data.cargoHolds}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={`${rootPath}/passenger_bays`}
          data={data.passengerBays}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={`${rootPath}/enhancements`}
          data={data.enhancements}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={`${rootPath}/facilities`}
          data={data.facilities}
        />
      </TabPanel>
    </Tabs>
  );
}
