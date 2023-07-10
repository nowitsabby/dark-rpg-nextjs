'use client'

import { StarshipWeaponRecord } from '../types/Records';
import { componentPowerString, hullString } from '../util/helpers';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function StarshipWeaponEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: StarshipWeaponRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry 
      rootPath={rootPath} 
      name={datum.name} 
      description={datum.special?.map((value) => `__${value.title}:__ ${value.effect}`).join('\n\n')} 
      >
        <EntryDatum label='Appropriate Hull Types' value={hullString(datum.hulls)} />
        <EntryDatum label='Power Consumed / Generated' value={componentPowerString(datum.power)} />
        <EntryDatum label='Space Used' value={datum.space} />
        <EntryDatum label='Ship Point Cost' value={datum.shipPoints} />
        <EntryDatum label='Strength' value={datum.strength} />
        <EntryDatum label='Damage' value={datum.damage} />
        <EntryDatum label='Critical Rating' value={datum.crit} />
        <EntryDatum label='Range' value={datum.range} />
      </Entry>
    )
  );
}
