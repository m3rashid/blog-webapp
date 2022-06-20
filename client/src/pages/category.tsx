import { Box, Group, SimpleGrid, Stack } from '@mantine/core'
import React from 'react'
import PageWrapper from '../components/globals/pageWrapper'

interface IProps {}

const Category: React.FC<IProps> = () => {
  const posts: any = []

  return (
    <PageWrapper>
      {/* <Head>
        <title>Cubicle</title>
        <meta
          name="description"
          content="Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials"
        />
        <meta name="og:title" content={"Cubicle"} />
        <meta
          name="og:url"
          content={"https://cubicle.vercel.app/category/" + router.query.slug}
        />
        <meta
          name="og:description"
          content="Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials"
        />
        <meta name="twitter:title" content={"Cubicle"} />
        <meta
          name="twitter:description"
          content="Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials"
        />
        <meta name="image" content="https://cubicle.vercel.app/fav.png" />
        <meta name="og:image" content="https://cubicle.vercel.app/fav.png" />
        <meta
          name="twitter:image"
          content="https://cubicle.vercel.app/fav.png"
        />
      </Head> */}
      <Group style={{ justifyContent: 'center', padding: '10px' }}>
        <SimpleGrid cols={2} spacing={8} py={10}>
          {posts?.length > 0 ? (
            <SimpleGrid cols={2} spacing={6}>
              {posts.map((post: any) => (
                <Box key={post.id}>Hello</Box>
              ))}
            </SimpleGrid>
          ) : (
            <Box>No posts found</Box>
          )}
          <Stack spacing={6}>{/* Categories */}</Stack>
        </SimpleGrid>
      </Group>
    </PageWrapper>
  )
}

export default Category
