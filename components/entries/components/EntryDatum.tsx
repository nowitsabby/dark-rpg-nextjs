'use client'

export default function EntryDatum({ label, value }: { label: string, value: string | string[] | React.ReactNode }) {
  return (
    <tr>
        <td><strong>{label}</strong></td>
        {
          Array.isArray(value) ? 
            value.map((v) => (<td key={v} style={{ width: '40%' }}><span>{v}</span></td>)) :
          <td style={{ width: '80%' }}><span>{value}</span></td>
        }
    </tr>
  );
}
