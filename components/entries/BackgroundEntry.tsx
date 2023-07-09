'use client'

import { BackgroundRecord } from '../types/Records';
import SrdMarkdown from '../util/SrdMarkdown';
import { choiceArrayToString } from '../util/helpers';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function BackgroundEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: BackgroundRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry rootPath={rootPath} name={datum.name} description='' >
        <EntryDatum label='Skills' text={`${choiceArrayToString(datum.skills)}`} />
        <EntryDatum label='Talents' text={`${choiceArrayToString(datum.talents)}`} />
        <EntryDatum label='Equipment' text={`${choiceArrayToString(datum.equipment)}`} />
        <EntryDatum 
          label='Bonuses' 
          text={
            <SrdMarkdown 
              text={datum.bonuses.map((value) => `__${value.title}__: ${value.effect}`).join('\n\n')} 
            /> 
          } 
        />
        <EntryDatum label='Aptitude' text={datum.aptitude.join(' or ')} />
        <EntryDatum 
          label='Trait(s)' 
          text={
            Array.isArray(datum.traits) ? 
            `One of: ${datum.traits.join(', ')}` :
            datum.traits ? datum.traits : '-'
          }
        />
      </Entry>
    )
  );
}
