'use client'

import StarshipComponents, {
  StarshipComponentRecord
} from './StarshipComponents';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

export interface SupplementalComponents {
  cargoHolds: StarshipComponentRecord[];
  passengerBays: StarshipComponentRecord[];
  enhancements: StarshipComponentRecord[];
  facilities: StarshipComponentRecord[];
}

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
          rootPath={rootPath}
          data={data.cargoHolds}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={rootPath}
          data={data.passengerBays}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={rootPath}
          data={data.enhancements}
        />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          rootPath={rootPath}
          data={data.facilities}
        />
      </TabPanel>
    </Tabs>
  );
}
