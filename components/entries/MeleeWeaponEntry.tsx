'use client'

import { MeleeWeaponRecord } from '../types/Records';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function MeleeWeaponEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: MeleeWeaponRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry rootPath={rootPath} name={datum.name} description={datum.description} >
        <EntryDatum label='Class' value={`${datum.class}`} />
        <EntryDatum label='Two-Handed' value={datum.twoHanded ? 'Yes' : 'No'} />
        <EntryDatum label='Range' value={datum.range} />
        <EntryDatum label='Damage' value={datum.damage} />
        <EntryDatum label='Penetration' value={datum.penetration} />
        <EntryDatum label='Special Qualities' value={datum.special} />
        <EntryDatum label='Weight' value={datum.weight} />
        <EntryDatum label='Availability' value={datum.availability} />
      </Entry>
    )
  );
}
