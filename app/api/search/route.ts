import { NextResponse } from 'next/server'

import pages from '@/cache/pages.json'

export interface SrdSearchResult {
  srdPath: string;
  title: string;
  excerpt: string;
}

export interface PagedSearchResponse {
  totalResults: number;
  totalPages: number;
  results: SrdSearchResult[];
}

const addToResults = (results: SrdSearchResult[], item: SrdSearchResult) => {
  if (!results.some((value) => value.srdPath === item.srdPath)) {
    results.push(item)
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q');
  const page = parseInt(searchParams.get('page') || '1');
  const size = Math.min(parseInt(searchParams.get('size') || '10'), 100);

  if (query) {
    const results: SrdSearchResult[] = [];

    const inTitle = pages
    .filter((page) => page.title.toLowerCase().includes(query.toLowerCase()));

    inTitle.forEach((page) => addToResults(results, page));
    
    const inPath = pages
    .filter((page) => page.srdPath.toLowerCase().replaceAll('/', ' ').includes(query.toLowerCase()));
    
    inPath.forEach((page) => addToResults(results, page));

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
      
      inContents.forEach((page) => addToResults(results, page));
    
    return NextResponse.json({
      totalPages: Math.ceil(results.length / size),
      totalResults: results.length,
      results: results.slice((page - 1) * size, page * size).map((result) => {
        return { srdPath: result.srdPath, title: result.title, excerpt: result.excerpt }
      })
    });
  } else {
    return NextResponse.json([]);
  }
}
