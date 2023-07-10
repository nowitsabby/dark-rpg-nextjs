'use client'

import { TalentRecord } from '../types/Records';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function TalentEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: TalentRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry rootPath={rootPath} name={datum.name} description={datum.benefit} >
        <EntryDatum label='Tier' value={`${datum.tier}`} />
        <EntryDatum label='Specialist' value={datum.specialist ? 'Yes' : 'No'} />
        {datum.specialisations && (
            <EntryDatum label='Specialisations' value={datum.specialisations.join(', ')} />
          )}
        <EntryDatum label='Prerequisites' value={datum.prerequisites ? datum.prerequisites.join(', ') : '-'} />
        <EntryDatum label='Aptitudes' value={datum.aptitudes ? datum.aptitudes.join(', ') : '-'} />
        <EntryDatum label='Alignment' value={datum.alignment ? datum.alignment : '-'} />
      </Entry>
    )
  );
}
