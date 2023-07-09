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
      <Entry rootPath={rootPath} name={datum.name} description={datum.effect} >
        <EntryDatum label='Used With' text={datum.usedWith.join('; ')} />
        <EntryDatum label='Availability' text={datum.availability} />
      </Entry>
    )
  );
}