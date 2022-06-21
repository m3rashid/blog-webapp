import { Grid, Group, Stack } from '@mantine/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useSafeApiCall } from '../api/safeApiCall'

import Author from '../components/author'
import Categories from '../components/categories'
import Comments from '../components/comments'
import PageWrapper from '../components/globals/pageWrapper'
import PostDetail from '../components/postDetail'
import RelatedPosts from '../components/relatedPosts'
import { IAuthor, ICategory } from '../types'
const CreateComment = React.lazy(() => import('../components/createComment'))

export interface IPost {
  bannerImageUrl: string
  categories: ICategory[]
  data: any
  comments: any[]
  _id?: string
  author: IAuthor | string
  slug: string
  title: string
  excerpt: string
  createdAt?: string
  updatedAt?: string
}

interface IProps {}

const Post: React.FC<IProps> = () => {
  const { slug } = useParams()
  const { safeApiCall } = useSafeApiCall()
  const [postDetail, setPostDetail] = React.useState<IPost>()

  const getPost = async () => {
    const res = await safeApiCall({
      endpoint: '/post/details',
      body: { slug },
      notif: { id: 'get-post' },
    })
    if (!res) return
    console.log(res.data)
  }

  React.useEffect(() => {
    getPost().then().catch()
  }, [])

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
