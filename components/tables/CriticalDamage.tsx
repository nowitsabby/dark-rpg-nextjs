'use client'

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import DataTable from 'react-data-table-component';
import SrdMarkdown from '../util/SrdMarkdown';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

export interface CriticalDamageInfo {
  damage: string;
  effect: string;
}

export interface CriticalDamageParts {
  arm: CriticalDamageInfo[];
  body: CriticalDamageInfo[];
  head: CriticalDamageInfo[];
  leg: CriticalDamageInfo[];
}

export interface CriticalDamageTable {
  rending: CriticalDamageParts;
  impact: CriticalDamageParts;
  explosive: CriticalDamageParts;
  energy: CriticalDamageParts;
}

export default function CriticalDamage({ data }: { data: CriticalDamageTable }) {
  const columns = [
    {
      name: 'Damage',
      grow: 1,
      selector: (row: CriticalDamageInfo) => row.damage,
    },
    {
      name: 'Effect',
      grow: 7,
      wrap: true,
      selector: (row: CriticalDamageInfo) => row.description,
      format: (row: CriticalDamageInfo) => {
        return <SrdMarkdown text={row.description} />;
      },
    },
  ];

  const BodyParts = ({
    type,
    data,
  }: {
    type: string;
    data: CriticalDamageParts;
  }) => ( 
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreOutlinedIcon />}
          aria-controls={`${type}-arm-content`}
          id={`${type}-arm`}
        >
          <Typography>Arm</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DataTable columns={columns} data={data?.arm} striped />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreOutlinedIcon />}
          aria-controls={`${type}-body-content`}
          id={`${type}-body`}
        >
          <Typography>Body</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DataTable columns={columns} data={data?.body} striped />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreOutlinedIcon />}
          aria-controls={`${type}-head-content`}
          id={`${type}-head`}
        >
          <Typography>Head</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DataTable columns={columns} data={data?.head} striped />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreOutlinedIcon />}
          aria-controls={`${type}-leg-content`}
          id={`${type}-leg`}
        >
          <Typography>Leg</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DataTable columns={columns} data={data?.leg} striped />
        </AccordionDetails>
      </Accordion>
    </>
  );

  return (
    <Tabs>
      <TabList>
        <Tab key='rending-tab'>Rending</Tab>
        <Tab key='impact-tab'>Impact</Tab>
        <Tab key='explosive-tab'>Explosive</Tab>
        <Tab key='energy-tab'>Energy</Tab>
      </TabList>

      <TabPanel>
        <BodyParts type="rending" data={data?.rending} />
      </TabPanel>
      <TabPanel>
        <BodyParts type="impact" data={data?.impact} />
      </TabPanel>
      <TabPanel>
        <BodyParts type="explosive" data={data?.explosive} />
      </TabPanel>
      <TabPanel>
        <BodyParts type="energy" data={data?.energy} />
      </TabPanel>
    </Tabs>
  );
}
