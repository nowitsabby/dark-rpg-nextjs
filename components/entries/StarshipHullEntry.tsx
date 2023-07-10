'use client'

import { StarshipHullRecord } from '../types/Records';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function StarshipHullEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: StarshipHullRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry 
      rootPath={rootPath} 
      name={datum.name} 
      description={datum.special?.map((value) => `__${value.title}:__ ${value.effect}`).join('\n\n')} 
      >
        <EntryDatum label='Speed' value={datum.speed} />
        <EntryDatum label='Space Available' value={datum.space} />
        <EntryDatum label='Manoeuvrability' value={datum.manoeuvrability} />
        <EntryDatum label='Detection' value={datum.detection} />
        <EntryDatum label='Hull Integrity' value={datum.hull} />
        <EntryDatum label='Armour' value={datum.armour} />
        <EntryDatum label='Turret Rating' value={datum.turret} />
        <EntryDatum label='Ship Point Cost' value={datum.shipPoints} />
        <EntryDatum label='Weapon Capacity' value={datum.weapons && Array.isArray(datum.weapons)
          ? [...new Set(datum.weapons)]
              .map(
                (value) =>
                  `${datum.weapons.filter((str) => str === value).length} ${value}`
              )
              .join(', ')
          : []} />
      </Entry>
    )
  );
}
