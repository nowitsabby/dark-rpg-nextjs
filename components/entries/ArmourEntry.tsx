'use client'

import { ArmourRecord } from '../types/Records';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function ArmourEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: ArmourRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry rootPath={rootPath} name={datum.name} description={datum.description} >
        <EntryDatum label='Armour Points' text={`${datum.ap}`} />
        <EntryDatum label='Max Agility' text={`${datum.maxAg ? datum.maxAg : '-'}`} />
        <EntryDatum label='Locations Covered' text={datum.locations.length === 4 ? 'All' : datum.locations.join(', ')} />
        <EntryDatum label='Weight' text={datum.weight} />
        <EntryDatum label='Availability' text={datum.availability} />
      </Entry>
    )
  );
}
