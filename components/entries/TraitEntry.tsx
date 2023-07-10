'use client'

import { TraitRecord } from '../types/Records';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function TalentEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: TraitRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry rootPath={rootPath} name={datum.name} description={datum.description} />
    )
  );
}
