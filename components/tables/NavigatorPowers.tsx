'use client'

import Stack from '@mui/material/Stack';
import SrdMarkdown from '../util/SrdMarkdown';
import Container from '@mui/material/Container';

export interface NavigatorPowerType {
  name: string;
  id: string;
  novice: string;
  adept: string;
  master: string;
}

export default function NavigatorPowers({ data }: { data: NavigatorPowerType[] }) {
  
  return (
    data.map((power: NavigatorPowerType) => (
      <Container key={power.id}>
        <Stack>
          <h2 id={power.id}>{power.name}</h2>
          <div>
            <h4>Novice</h4>
            <SrdMarkdown text={power.novice} />
          </div>
          <div>
            <h4>Adept</h4>
            <SrdMarkdown text={power.adept} />
          </div>
          <div>
            <h4>Master</h4>
            <SrdMarkdown text={power.master} />
          </div>
        </Stack>
      </Container>
    ))
  );
}
