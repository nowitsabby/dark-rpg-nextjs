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
        <EntryDatum label='Upgrades' text={`${datum.upgrades}`} />
        <EntryDatum label='Weight' text={datum.weight} />
        <EntryDatum label='Availability' text={datum.availability} />
      </Entry>
    )
  );
}
