import Link from 'next/link';
import { AnchorHTMLAttributes, PropsWithChildren } from 'react';

export default function SrdLink({
  children,
  ...props
}: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  // eslint-disable-next-line react/prop-types
  if (children) {
    return (
      <Link href={props.href as string}>{(children as string)[0]}</Link>
    );
  }
  return <Link href={props.href as string} />;
}
