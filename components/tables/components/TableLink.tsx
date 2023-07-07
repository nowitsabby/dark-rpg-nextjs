import Link from "next/link";

export default function TableLink(
  { 
    rootPath, 
    id, 
    name 
  }: 
  { 
    rootPath: string;
    id: string;
    name: string;
  }) {
  return (
    <Link href={`/${rootPath}/${id}`} id={id}>{name}</Link>
  )
}
