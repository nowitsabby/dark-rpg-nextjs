'use client'

import { StarshipComponentRecord } from '../types/Records';
import { componentPowerString, hullString } from '../util/helpers';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function StarshipComponentEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: StarshipComponentRecord[],
  id: string }) {

  const entryData = data.filter((value) => value.id === id);

  return (
    entryData && (
      <Entry 
      rootPath={rootPath} 
      name={entryData[0].name} 
      description={entryData[0].special?.map((value) => `__${value.title}:__ ${value.effect}`).join('\n\n')} 
      >
        {entryData.length > 1 ? (
          <>
            <EntryDatum label='Appropriate Hull Types' value={entryData.map((datum) => (hullString(datum.hulls)))} />
            <EntryDatum label='Power Consumed / Generated' value={entryData.map((datum) => (componentPowerString(datum.power)))} />
            <EntryDatum label='Space Used' value={entryData.map((datum) => datum.space)} />
            <EntryDatum label='Ship Point Cost' value={entryData.map((datum) => datum.shipPoints)} />
          </>
          ) : (
          <>
            <EntryDatum label='Appropriate Hull Types' value={hullString(entryData[0].hulls)} />
            <EntryDatum label='Power Consumed / Generated' value={componentPowerString(entryData[0].power)} />
            <EntryDatum label='Space Used' value={entryData[0].space} />
            <EntryDatum label='Ship Point Cost' value={entryData[0].shipPoints} />
          </>
        )}
      </Entry>
    )
  );
}
