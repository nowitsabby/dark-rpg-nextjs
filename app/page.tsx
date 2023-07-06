import Document from '@/components/util/Document'
import { loadDocument } from '@/lib/srd'

export default function Home() {
  return (
    <Document doc={loadDocument(['home']).content as string} />
  )
}
