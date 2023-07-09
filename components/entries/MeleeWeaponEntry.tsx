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
        <EntryDatum label='Class' text={`${datum.class}`} />
        <EntryDatum label='Two-Handed' text={datum.twoHanded ? 'Yes' : 'No'} />
        <EntryDatum label='Range' text={datum.range} />
        <EntryDatum label='Damage' text={datum.damage} />
        <EntryDatum label='Penetration' text={datum.penetration} />
        <EntryDatum label='Special Qualities' text={datum.special} />
        <EntryDatum label='Weight' text={datum.weight} />
        <EntryDatum label='Availability' text={datum.availability} />
      </Entry>
    )
  );
}
