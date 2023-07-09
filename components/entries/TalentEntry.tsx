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
        <EntryDatum label='Tier' text={`${datum.tier}`} />
        <EntryDatum label='Specialist' text={datum.specialist ? 'Yes' : 'No'} />
        {datum.specialisations && (
            <EntryDatum label='Specialisations' text={datum.specialisations.join(', ')} />
          )}
        <EntryDatum label='Prerequisites' text={datum.prerequisites ? datum.prerequisites.join(', ') : '-'} />
        <EntryDatum label='Aptitudes' text={datum.aptitudes ? datum.aptitudes.join(', ') : '-'} />
        <EntryDatum label='Alignment' text={datum.alignment ? datum.alignment : '-'} />
      </Entry>
    )
  );
}
