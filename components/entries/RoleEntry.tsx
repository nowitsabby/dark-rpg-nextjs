'use client'

import { RoleRecord } from '../types/Records';
import { choiceArrayToString } from '../util/helpers';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function RoleEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: RoleRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry rootPath={rootPath} name={datum.name} description='' >
        <EntryDatum 
          label='Bonus' 
          value={
            <div>
              <strong>{datum.bonus.title}: </strong><span>{datum.bonus.description}</span>
            </div>
          } 
        />
        <EntryDatum label='Aptitudes' value={choiceArrayToString(datum.aptitudes)} />
        <EntryDatum label='Talent' value={datum.talent.join(' or ').replaceAll('{X}', 'Pick One')} />
      </Entry>
    )
  );
}
