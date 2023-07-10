'use client'

import { ModRecord } from '../types/Records';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function ArmourEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: ModRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry rootPath={rootPath} name={datum.name} description={datum.description} >
        <EntryDatum label='Upgrades' value={`${datum.upgrades}`} />
        <EntryDatum label='Weight' value={datum.weight} />
        <EntryDatum label='Availability' value={datum.availability} />
      </Entry>
    )
  );
}
