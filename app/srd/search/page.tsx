'use client'

import { SrdSearchResult } from '@/app/api/search/route'
import SrdMarkdown from '@/components/util/SrdMarkdown'
import Container from '@mui/material/Container'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function SrdSearch() {
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [results, setResults] = useState<SrdSearchResult[]>([]);

  const [page, setPage] = useState(1);

  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  const searchEndpoint = (query: string, page: number) => `/api/search?q=${query}&page=${page}`

  const fetchSearch = useCallback((query: string, page: number) => 
    fetch(searchEndpoint(query, page))
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setResults(res.results);
        setTotalPages(res.totalPages);
        setTotalResults(res.totalResults);
      }), [])

  useEffect(() => {
    console.log(query);
    if (query && query.length) {
      fetchSearch(query, page);
    } else {
      setResults([])
    }
  }, [query, page, fetchSearch]);

  return (
    <>
      <Stack gap={1}>
        {results && 
          results.map((result) => 
            <Stack key={result.title} gap={1}>
              <Link href={`/${result.srdPath}`} style={{ fontSize: 'larger' }}>{result.title}</Link>
              <Container>{result.excerpt}</Container>
            </Stack>)}
      </Stack>
      {results && totalPages && <Pagination 
        count={totalPages} 
        showFirstButton 
        showLastButton 
        onChange={(_, value) => setPage(value)} />}
    </>
  )
}
