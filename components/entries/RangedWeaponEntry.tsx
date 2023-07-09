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
        <EntryDatum label='Range' text={datum.range} />
        <EntryDatum label='Rate of Fire' text={datum.rateOfFire} />
        <EntryDatum label='Damage' text={datum.damage} />
        <EntryDatum label='Penetration' text={datum.penetration} />
        <EntryDatum label='Clip Size' text={datum.clip} />
        <EntryDatum label='Reload Time' text={datum.reload} />
        <EntryDatum label='Special Qualities' text={datum.special} />
        <EntryDatum label='Weight' text={datum.weight} />
        <EntryDatum label='Availability' text={datum.availability} />
      </Entry>
    )
  );
}
