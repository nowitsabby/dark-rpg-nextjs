'use client'

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


export default function NavBar({ title }: { title: string }) {
  const [query, setQuery] = useState('')
  
  const router = useRouter()

  const openHomePage = () => router.push(`/`)
  const openSearchPage = () => query && router.push(`/srd/search?q=${query}`)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ minHeight: 'auto' }}>
          <Stack sx={{ flexGrow: 1 }} direction="row" gap={1} onClick={openHomePage} style={{ cursor: 'pointer' }} >
            <HomeIcon style={{ position: 'relative', top: '3px' }}/>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <input
              type="text"
              value={query}
              style={{ border: 'none transparent', outline: 'none' }}
              placeholder="Search SRD . . ."
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event)=> event.key == "Enter" && openSearchPage()}
            />
            <SearchOutlinedIcon onClick={openSearchPage} style={{ cursor: 'pointer' }} />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
