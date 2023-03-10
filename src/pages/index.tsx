import Head from 'next/head'
import { Box, Container } from '@mui/material'
import { Search } from '@/components/Search'
import { MoviesList } from '@/components/MoviesList'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <Container maxWidth="md">
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Search />
        <MoviesList />
      </Box>
    </Container>
      </main>
    </>
  )
}
