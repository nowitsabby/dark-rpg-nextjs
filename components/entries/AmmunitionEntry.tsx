'use client'

import { AmmunitionRecord } from '../types/Records';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function AmmunitionEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: AmmunitionRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry rootPath={rootPath} name={datum.name} description={datum.description} >
        <EntryDatum label='Used With' value={datum.usedWith.join('; ')} />
        <EntryDatum label='Availability' value={datum.availability} />
      </Entry>
    )
  );
}
