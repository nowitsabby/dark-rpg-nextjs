'use client'

import { OriginRecord } from '../types/Records';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function OriginEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: OriginRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry rootPath={rootPath} name={datum.name} description='' >
        <EntryDatum label='Characteristic Modifiers' value={
          <>
            <div>
              <strong>+ </strong><span>{datum.characteristicModifiers.plus[0]}</span>
            </div>
            <div>
              <strong>+ </strong><span>{datum.characteristicModifiers.plus[1]}</span>
            </div>
            <div>
              <strong>- </strong><span>{datum.characteristicModifiers.minus}</span>
            </div>
          </>} 
        />
        <EntryDatum label='Fate Threshold' value={`${datum.fateThreshold} (Blessing ${datum.blessing}+)`}/>
        <EntryDatum 
          label='Bonus' 
          value={
            <div>
              <strong>{datum.bonus.title}: </strong><span>{datum.bonus.effect}</span>
            </div>
          } 
        />
        <EntryDatum label='Aptitude' value={datum.aptitude} />
        <EntryDatum label='Wounds' value={`${datum.wounds} + 1d5`} />
      </Entry>
    )
  );
}
