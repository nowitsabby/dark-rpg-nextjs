import { NextResponse } from 'next/server'

import pages from '@/cache/pages.json'

export interface SrdSearchResult {
  srdPath: string;
  title: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  const maxResults = 10;

  if (query) {
    const results: Set<SrdSearchResult> = new Set();

    const inTitle = pages
    .filter((page) => page.title.toLowerCase().includes(query.toLowerCase()));

    inTitle.forEach((page) => results.add({ srdPath: page.srdPath, title: page.title }));

    if (results.size < maxResults) {
      const inPath = pages
      .filter((page) => page.srdPath.toLowerCase().replaceAll('/', ' ').includes(query.toLowerCase()));
      
      inPath.forEach((page) => results.add({ srdPath: page.srdPath, title: page.title }));
    }

    if (results.size < maxResults) {
      const inContents = pages
      .filter((page) => page.content.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        const aOccurences = a.content.toLowerCase().split(query.toLowerCase()).length - 1;
        const bOccurences = b.content.toLowerCase().split(query.toLowerCase()).length - 1;
        if (aOccurences < bOccurences) {
          return -1;
        } else if (aOccurences > bOccurences) {
          return 1;
        }
        return 0;
      });
      
      inContents.forEach((page) => results.add({ srdPath: page.srdPath, title: page.title }));
    }
    
    return NextResponse.json([...results].slice(0, maxResults));
  } else {
    return NextResponse.json([]);
  }
}
