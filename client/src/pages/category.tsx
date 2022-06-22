import { Box, Group, SimpleGrid } from '@mantine/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useSafeApiCall } from '../api/safeApiCall'
import { IPostCardForCard } from '../atoms/postCard'
import Categories from '../components/categories'
import PageWrapper from '../components/globals/pageWrapper'
import PostCard from '../components/post/postcard'
import { useHomePageStyles } from './home'
import { useStyles } from './post'

interface IProps {}

const Category: React.FC<IProps> = () => {
  const { slug } = useParams()
  const [posts, setPosts] = React.useState<IPostCardForCard[]>()

  const { safeApiCall } = useSafeApiCall()

  const getPosts = async () => {
    const res = await safeApiCall({
      body: { slug },
      endpoint: '/post/by-category',
      notif: { id: 'get-post-by-category-slug' },
    })
    if (!res) return
    setPosts(res.data)
  }

  const { classes } = useStyles()
  const { classes: thisPageClasses } = useHomePageStyles()

  React.useEffect(() => {
    window.scrollTo(0, 0)
    getPosts().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

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
      <Group style={{ alignItems: 'flex-start' }}>
        <SimpleGrid spacing={20} className={classes.firstChild}>
          <SimpleGrid className={thisPageClasses.inner} spacing={20}>
            {posts && posts?.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  categories={post.categories.map((c) => c.name)}
                  image={post.bannerImageUrl}
                  title={post.title}
                  slug={post.slug}
                />
              ))
            ) : (
              <Box>No posts found</Box>
            )}
          </SimpleGrid>
        </SimpleGrid>
        <SimpleGrid spacing={20} className={classes.secondChild}>
          <Categories />
        </SimpleGrid>
      </Group>
    </PageWrapper>
  )
}

export default Category
