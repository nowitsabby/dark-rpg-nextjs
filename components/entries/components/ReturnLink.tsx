import Link from "next/link";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function ReturnLink({ rootPath }: { rootPath: string }) {
  return (
    <Link href={`/${rootPath}`}><NavigateBeforeIcon style={{ position: 'relative', top: '6px' }}/>To List</Link>
  );
}
