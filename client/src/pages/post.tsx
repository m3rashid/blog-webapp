import { Grid, Group, Stack } from '@mantine/core'
import React from 'react'

import Author from '../components/author'
import Categories from '../components/categories'
import Comments from '../components/comments'
import PageWrapper from '../components/globals/pageWrapper'
import PostDetail from '../components/postDetail'
import RelatedPosts from '../components/relatedPosts'
const CreateComment = React.lazy(() => import('../components/createComment'))

interface IProps {}

const Post: React.FC<IProps> = () => {
  // const post: any = ''

  // const postTitle = post.title || 'Post'
  // const keywords = postTitle.split(' ')
  // const result = keywords.filter((word: string) => word.length > 4)

  return (
    <PageWrapper>
      {/* <Head>
        <title>{postTitle} | Cubicle</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={result.join(", ")} />
        <meta name="og:title" content={postTitle + " | Cubicle"} />
        <meta name="og:description" content={post.excerpt} />
        <meta
          name="og:url"
          content={"https://cubicle.vercel.app/post/" + post.slug}
        />
        <meta name="twitter:title" content={postTitle + " | Cubicle"} />
        <meta name="twitter:description" content={post.excerpt} />

        <meta name="image" content={post.featuredImage} />
        <meta name="og:image" content={post.featuredImage} />
        <meta name="twitter:image" content={post.featuredImage} />
      </Head> */}
      <Grid>
        <Group>
          <PostDetail />
          <Comments />
        </Group>
        <Stack spacing={6}>
          <Author />
          <RelatedPosts />
          <Categories />
          <CreateComment />
        </Stack>
      </Grid>
    </PageWrapper>
  )
}

export default Post
