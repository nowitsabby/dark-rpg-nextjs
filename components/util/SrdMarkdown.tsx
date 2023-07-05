import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SrdLink from './SrdLink';
import rehypeRaw from 'rehype-raw';

export default function SrdMarkdown({ text }: { text: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ a: SrdLink }}>
      {text}
    </ReactMarkdown>
  );
}
