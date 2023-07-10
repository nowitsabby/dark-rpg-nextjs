'use client'

import {
  StarshipWeaponTable,
} from './components/StarshipWeaponTable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { StarshipWeaponRecord } from '../types/Records';

export interface WeaponComponents {
  macrobatteries: StarshipWeaponRecord[];
  lances: StarshipWeaponRecord[];
  novaCannons: StarshipWeaponRecord[];
  torpedoes: StarshipWeaponRecord[];
  landingBays: StarshipWeaponRecord[];
}

export type WeaponComponentsKey = keyof WeaponComponents;

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
          rootPath={`${rootPath}/macrobatteries`}
          data={data.macrobatteries} />
      </TabPanel>
      <TabPanel>
        <StarshipWeaponTable
          rootPath={`${rootPath}/lances`}
          data={data.lances} />
      </TabPanel>
      <TabPanel>
        <StarshipWeaponTable
          rootPath={`${rootPath}/nova_cannons`}
          data={data.novaCannons} />
      </TabPanel>
      <TabPanel>
        <StarshipWeaponTable
          rootPath={`${rootPath}/torpedoes`}
          data={data.torpedoes} />
      </TabPanel>
      <TabPanel>
        <StarshipWeaponTable
          rootPath={`${rootPath}/landing_bays`} 
          data={data.landingBays} />
      </TabPanel>
    </Tabs>
  );
}
