'use client'

import { RangedWeaponRecord } from '../types/Records';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function RangedWeaponEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: RangedWeaponRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry rootPath={rootPath} name={datum.name} description={datum.description} >
        <EntryDatum label='Range' value={datum.range} />
        <EntryDatum label='Rate of Fire' value={datum.rateOfFire} />
        <EntryDatum label='Damage' value={datum.damage} />
        <EntryDatum label='Penetration' value={datum.penetration} />
        <EntryDatum label='Clip Size' value={datum.clip} />
        <EntryDatum label='Reload Time' value={datum.reload} />
        <EntryDatum label='Special Qualities' value={datum.special} />
        <EntryDatum label='Weight' value={datum.weight} />
        <EntryDatum label='Availability' value={datum.availability} />
      </Entry>
    )
  );
}
