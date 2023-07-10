'use client'

import { ArmourRecord, EquipmentRecord } from '../types/Records';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function EquipmentEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: EquipmentRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry rootPath={rootPath} name={datum.name} description={datum.description} >
        <EntryDatum label='Weight' value={datum.weight} />
        <EntryDatum label='Availability' value={datum.availability} />
      </Entry>
    )
  );
}
