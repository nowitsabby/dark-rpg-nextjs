'use client'

import Stack from '@mui/material/Stack';
import { NavigatorPowerRecord } from '../types/Records';
import ReturnLink from './components/ReturnLink';
import Container from '@mui/material/Container';
import SrdMarkdown from '../util/SrdMarkdown';

export default function ArmourEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: NavigatorPowerRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
    <Stack gap={2}>
      <ReturnLink rootPath={rootPath} />
      <h2>{datum.name}</h2>
      <Container>
        <div>
          <h4>Novice</h4>
          <SrdMarkdown text={datum.novice} />
        </div>
        <div>
          <h4>Adept</h4>
          <SrdMarkdown text={datum.adept} />
        </div>
        <div>
          <h4>Master</h4>
          <SrdMarkdown text={datum.master} />
        </div>
      </Container>
    </Stack>
    )
  );
}
