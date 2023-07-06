'use client'

import { SrdSearchResult } from '@/app/api/search/route'
import Stack from '@mui/material/Stack'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SrdSearch() {
  const [results, setResults] = useState<SrdSearchResult[]>([])
  
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  const searchEndpoint = (query: string) => `/api/search?q=${query}`

  useEffect(() => {
    console.log(query);
    if (query && query.length) {
      fetch(searchEndpoint(query))
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setResults(res)
        })
    } else {
      setResults([])
    }
  }, [query]);

  return (
    <Stack>
      {results && 
        results.map((result) => 
          <Link key={result.title} href={`/${result.srdPath}`}>{result.title}</Link>)}
    </Stack>
    
  )
}
