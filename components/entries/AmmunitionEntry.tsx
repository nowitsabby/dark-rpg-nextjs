'use client'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Link from "next/link";
import { AmmunitionRecord } from "../types/AmmunitionRecord";
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

export default function AmmunitionEntry({ 
  rootPath, 
  data, 
  id 
}: { 
  rootPath: string,
  data: AmmunitionRecord[],
  id: string }) {

  const datum = data.find((value) => value.id === id);

  return (
    datum && (
      <Stack gap={2}>
        <Link href={`/${rootPath}`}><NavigateBeforeIcon style={{ position: 'relative', top: '6px' }}/>Return</Link>
        <h3>{datum.name}</h3>
        <Container>
          <Stack gap={3} direction='row'><strong>Used With</strong><span>{datum.usedWith.join('; ')}</span></Stack>
          <Stack gap={3} direction='row'><strong>Availability</strong><span>{datum.availability}</span></Stack>
        </Container>
        <Container>{datum.effect}</Container>
      </Stack>
    )
  );
}
