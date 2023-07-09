'use client'

import Grid from "@mui/material/Grid";

export default function EntryDatum({ label, text }: { label: string, text: string | React.ReactNode }) {
  return (
    <tr>
        <td><strong>{label}</strong></td>
        <td style={{ width: '100%' }}><span>{text}</span></td>
    </tr>
  );
}
