import React from 'react'
import { Box, Grid } from '@mantine/core'
import Hero from '../components/hero'
import PageWrapper from '../components/globals/pageWrapper'
import { useRecoilValue } from 'recoil'
import { allPostsAtom } from '../atoms/allPosts'
import PostCard from '../components/post/postcard'

interface IProps {}

const Home: React.FC<IProps> = () => {
  const posts = useRecoilValue(allPostsAtom)

  return (
    <PageWrapper>
      {/* <Head>
        <title>Home | Cubicle</title>
        <meta
          name="description"
          content="Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials"
        />
        <meta
          name="keywords"
          content="cubicle, programming, coding, life, web development, coder, programmer, new skills, latest, technology, computer, science, nerdy, nerd"
        />

        <meta name="og:title" content="Home | Cubicle" />
        <meta name="og:url" content="https://cubicle.vercel.app/" />
        <meta
          name="og:description"
          content="Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials"
        />

        <meta name="twitter:title" content="Home | Cubicle" />
        <meta
          name="twitter:description"
          content="Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials"
        />

        <link rel="apple-touch-icon" href="/favicon.png" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <meta name="image" content="https://cubicle.vercel.app/favicon.png" />
        <meta
          name="og:image"
          content="https://cubicle.vercel.app/favicon.png"
        />
        <meta
          name="twitter:image"
          content="https://cubicle.vercel.app/favicon.png"
        />
      </Head> */}
      <Box style={{ padding: '10px' }}>
        <Hero />
      </Box>
      <Grid columns={2} style={{ gap: '10px' }}>
        {posts.map((post) => {
          return (
            <PostCard
              key={post._id}
              categories={['sdfa', 'asdfasd']}
              image={post.featuredImage}
              title={post.title}
            />
          )
        })}
      </Grid>
    </PageWrapper>
  )
}

export default Home
