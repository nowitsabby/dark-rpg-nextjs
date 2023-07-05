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

export default function StarshipSupplemental({ data }: { data: SupplementalComponents }) {
  
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
            data={data.cargoHolds}
          />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
            data={data.passengerBays}
          />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
            data={data.enhancements}
          />
      </TabPanel>
      <TabPanel>
        <StarshipComponents
          data={data.facilities}
        />
      </TabPanel>
    </Tabs>
  );
}
