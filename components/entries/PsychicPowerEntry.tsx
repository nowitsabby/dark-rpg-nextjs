'use client'

import { PsychicPowerRecord } from '../types/Records';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function PsychicPowerEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: PsychicPowerRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry rootPath={rootPath} name={datum.name} description={datum.description} >
        <EntryDatum label='Cost' value={`${datum.cost}xp`} />
        <EntryDatum label='Prerequisites' value={`${datum.prerequisites ? datum.prerequisites.join(', ') : '-'}`}/>
        <EntryDatum label='Action' value={datum.action} />
        <EntryDatum label='Focus' value={datum.focus} />
        <EntryDatum label='Range' value={datum.range} />
        <EntryDatum label='Sustained' value={datum.sustained} />
        <EntryDatum label='Subtypes' value={datum.subtypes.join(', ')} />
      </Entry>
    )
  );
}
