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
      <Entry rootPath={rootPath} name={datum.name} description={datum.effects} >
        <EntryDatum label='Cost' text={`${datum.cost}xp`} />
        <EntryDatum label='Prerequisites' text={`${datum.prerequisites ? datum.prerequisites.join(', ') : '-'}`}/>
        <EntryDatum label='Action' text={datum.action} />
        <EntryDatum label='Focus' text={datum.focus} />
        <EntryDatum label='Range' text={datum.range} />
        <EntryDatum label='Sustained' text={datum.sustained} />
        <EntryDatum label='Subtypes' text={datum.subtypes.join(', ')} />
      </Entry>
    )
  );
}
