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
        <EntryDatum label='Armour Points' value={`${datum.ap}`} />
        <EntryDatum label='Max Agility' value={`${datum.maxAg ? datum.maxAg : '-'}`} />
        <EntryDatum label='Locations Covered' value={datum.locations.length === 4 ? 'All' : datum.locations.join(', ')} />
        <EntryDatum label='Weight' value={datum.weight} />
        <EntryDatum label='Availability' value={datum.availability} />
      </Entry>
    )
  );
}
