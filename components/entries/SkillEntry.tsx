'use client'

import SkillInfo from '../tables/components/SkillInfo';
import { SkillRecord } from '../types/Records';
import Entry from './components/Entry';
import EntryDatum from './components/EntryDatum';

export default function SkillEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: SkillRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Entry 
        rootPath={rootPath} 
        name={datum.name} 
        description={
          <SkillInfo
            description={datum.description}
            exampleModifiers={datum.exampleModifiers}
            specialUses={datum.specialUses}
          />} 
        >
        <EntryDatum label='Primary Characteristic' value={`${datum.primaryCharacteristic}`} />
        <EntryDatum 
          label='Alternative Characteristic(s)' 
          text={datum.alternateCharacteristics
            ? datum.alternateCharacteristics.join(', ')
            : '-'} />
        <EntryDatum label='Aptitudes' value={datum.aptitudes ? datum.aptitudes.join(', ') : '-'} />
        <EntryDatum label='Alignment' value={datum.alignment} />
        <EntryDatum label='Descriptors' value={datum.descriptors ? datum.descriptors.join(', ') : '-'} />
        <EntryDatum label='Skill Use' value={datum.skillUse} />
        <EntryDatum label='Specialist' value={datum.specialist ? 'Yes' : 'No'} />
        {datum.specialisations && (
            <EntryDatum label='Specialisations' value={datum.specialisations.join(', ')} />
          )}
      </Entry>
    )
  );
}
