'use client'

import { AdvanceTable, AdvanceType } from './components/AdvanceTable';
import SrdMarkdown from '../util/SrdMarkdown';
import Talents from './Talents';
import Stack from '@mui/material/Stack';
import { TalentRecord } from '../types/Records';

export interface EliteAdvanceRecord {
  eliteAdvance: string;
  cost: number;
  prerequisites: { title: string; description: string }[];
  instantChanges: string[];
  information: { title: string; description: string }[] | null | undefined;
  advances: AdvanceType[] | null | undefined;
  talents: TalentRecord[] | null | undefined;
}

export default function EliteAdvance({ rootPath, data }: { rootPath: string, data: EliteAdvanceRecord }) {
  return (
    <Stack gap={1}>
      <h4>Cost</h4>
      <div style={{ paddingLeft: '24px' }}>{`${data?.cost} XP`}</div>
      <h4>Prerequisites</h4>
      <div style={{ paddingLeft: '24px' }}>
        {data?.prerequisites?.map(({ title, description }) => (
          <SrdMarkdown key={title} text={`__${title}:__ ${description}`} />
        ))}
      </div>
      <h4>Instant Changes</h4>
      <div style={{ paddingLeft: '24px' }}>
        <SrdMarkdown text={`${data?.instantChanges?.join('\n\n')}`} />
      </div>
      {data?.information &&
        data?.information?.map(({ title, description }) => (
          <div key={title}>
            <h4>{title}</h4>
            <SrdMarkdown text={description} />
          </div>
        ))}
      <h4>Unlocked Advances</h4>
      {data?.advances && <AdvanceTable tableData={data?.advances} />}
      {data?.talents && <Talents rootPath={rootPath} data={data?.talents} />}
    </Stack>
  );
}
