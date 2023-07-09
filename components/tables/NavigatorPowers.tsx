'use client'

import SrdMarkdown from '../util/SrdMarkdown';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableLink from './components/TableLink';
import { NavigatorPowerRecord } from '../types/Records';
import Container from '@mui/material/Container';

export default function NavigatorPowers({ rootPath, data }: { rootPath: string, data: NavigatorPowerRecord[] }) {
  return (
    <Container>
      <h2>Powers</h2>
      {data.map((power: NavigatorPowerRecord) => (
        <Accordion key={power.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${power.id}-content`}
            id={`${power.id}-header`}
            style={{ margin: '0' }}
          >
            <h3><TableLink rootPath={rootPath} id={power.id} name={power.name}/></h3>
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
