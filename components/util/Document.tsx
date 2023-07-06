/* eslint-disable react/prop-types */
'use client'
import { createElement, PropsWithChildren } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { HeadingProps } from 'react-markdown/lib/ast-to-react';
import { Element, Link } from 'react-scroll';
import rehypeRaw from 'rehype-raw';
import TocSidebar from '../layout/TocSidebar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import ScrollToTop from 'react-scroll-to-top';

interface SrdDoc {
  doc: string;
  includeToc?: boolean;
}

export default function Document({ doc, includeToc = false }: SrdDoc) {

  const toc: {
    level: number;
    id: string;
    title: string;
  }[] = [];

  // Magic.
  const addToTOC = ({
    children,
    ...props
  }: PropsWithChildren<HeadingProps>) => {
    const level = Number(props.node.tagName.match(/h(\d)/)?.slice(1));
    if (level && children && typeof children[0] === 'string') {
      const id = children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-');
      toc.push({
        level,
        id,
        title: children[0],
      });
      return (
        <Element name={id} id={id}>
          {createElement(props.node.tagName, props, children)}
        </Element>
      );
    }
    return createElement(props.node.tagName, props, children);
  };

  return (
    <Stack direction="row">
      <Container>
        <ReactMarkdown
          components={{
            h1: addToTOC,
            h2: addToTOC,
            h3: addToTOC,
          }}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {doc}
        </ReactMarkdown>
      </Container>
      {includeToc && (
        <TocSidebar toc={toc} />
      )}
      <ScrollToTop style={{ boxShadow: 'none' }} color='white'/>
    </Stack>
  )
}
