'use client'

import {
  StarshipWeaponRecord,
  StarshipWeaponTable,
} from './components/StarshipWeaponTable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

export interface WeaponComponents {
  macrobatteries: StarshipWeaponRecord[];
  lances: StarshipWeaponRecord[];
  novaCannons: StarshipWeaponRecord[];
  torpedoes: StarshipWeaponRecord[];
  landingBays: StarshipWeaponRecord[];
}

export default function StarshipWeapons({ rootPath, data }: { rootPath: string, data: WeaponComponents }) {
  return (
    <Tabs>
      <TabList>
        <Tab>Macrobatteries</Tab>
        <Tab>Lances</Tab>
        <Tab>Nova Cannons</Tab>
        <Tab>Torpedoes</Tab>
        <Tab>Landing Bays</Tab>
      </TabList>

      <TabPanel>
        <StarshipWeaponTable
          rootPath={rootPath}
          data={data.macrobatteries} />
      </TabPanel>
      <TabPanel>
        <StarshipWeaponTable
          rootPath={rootPath}
          data={data.lances} />
      </TabPanel>
      <TabPanel>
        <StarshipWeaponTable
          rootPath={rootPath}
          data={data.novaCannons} />
      </TabPanel>
      <TabPanel>
        <StarshipWeaponTable
          rootPath={rootPath}
          data={data.torpedoes} />
      </TabPanel>
      <TabPanel>
        <StarshipWeaponTable
          rootPath={rootPath} 
          data={data.landingBays} />
      </TabPanel>
    </Tabs>
  );
}
