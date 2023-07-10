'use client'

import SrdMarkdown from '../util/SrdMarkdown';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableLink from './components/TableLink';
import { NavigatorPowerRecord } from '../types/Records';
import Container from '@mui/material/Container';
import DataTable from 'react-data-table-component';

export default function NavigatorPowers({ rootPath, data }: { rootPath: string, data: NavigatorPowerRecord[] }) {
  const columns = [
    {
      name: '',
      allowOverflow: true,
      selector: (row: NavigatorPowerRecord) => row.name,
      format: (row: NavigatorPowerRecord) => <TableLink rootPath={rootPath} id={row.id} name={row.name}/>,
    },
  ];
  return (
    <Container>
      <DataTable
        title={<h2>Powers</h2>}
        columns={columns}
        data={data}
        striped
        expandableRows
        expandableRowsComponent={({ data: row }) => (
          <div style={{ padding: '4px' }}>
            <div>
              <h4>Novice</h4>
              <SrdMarkdown text={row.novice} />
            </div>
            <div>
              <h4>Adept</h4>
              <SrdMarkdown text={row.adept} />
            </div>
            <div>
              <h4>Master</h4>
              <SrdMarkdown text={row.master} />
            </div>
            <hr />
          </div>
        )}
      />
    </Container>
    
  );
}
