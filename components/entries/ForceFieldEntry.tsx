'use client'

import { ForceFieldRecord } from '../types/Records';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function ForceFieldEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: ForceFieldRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry rootPath={rootPath} name={datum.name} description={datum.description} >
        <EntryDatum label='Protection Rating' value={`${datum.protectionRating}`} />
        <EntryDatum label='Weight' value={datum.weight} />
        <EntryDatum label='Availability' value={datum.availability} />
      </Entry>
    )
  );
}
