import { Group, Loader } from '@mantine/core'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { useSafeApiCall } from './api/safeApiCall'
import { authAtom } from './atoms/auth'
import PageWrapper from './components/globals/pageWrapper'
import NotFound from './pages/404'
import Auth from './pages/auth'
import AuthorProfile from './pages/authorProfile'
import Category from './pages/category'
import CreateProfile from './pages/createProfile'
import CreatePost from './pages/createPost'
import EditPost from './pages/editPost'
import Home from './pages/home'
import Post from './pages/post'
import { categoryAtom } from './atoms/categories'
import { postsForCardAtom } from './atoms/postCard'

const App = () => {
  const { safeApiCall } = useSafeApiCall()
  const setAuth = useSetRecoilState(authAtom)
  const setCategory = useSetRecoilState(categoryAtom)
  const setPosts = useSetRecoilState(postsForCardAtom)

  const getAuth = async () => {
    const res = await safeApiCall({
      body: {},
      endpoint: '/auth',
      notif: { id: 'authCheck' },
    })
    if (!res) return
    setAuth({ isAuthenticated: true, user: res.data })
  }

  const getAllPosts = async () => {
    const res = await safeApiCall({
      body: {},
      endpoint: '/post/card',
      notif: { id: 'get-all-posts' },
    })

    if (!res) return
    setPosts(res.data)
  }

  const getAllCategories = async () => {
    const res = await safeApiCall({
      body: {},
      endpoint: '/category/all',
      notif: { id: 'get-all-categories' },
    })
    if (!res) return
    setCategory(
      res.data.map((data: any) => ({
        label: data.name,
        value: data._id,
        slug: data.slug,
      }))
    )
  }

  React.useEffect(() => {
    getAuth().then().catch()
    getAllCategories().then().catch()
    getAllPosts().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <React.Suspense
        fallback={
          <PageWrapper>
            <Group style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Loader />
            </Group>
          </PageWrapper>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/post/create" element={<CreatePost />} />
          <Route path="/post/edit/:slug" element={<EditPost />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/author/me" element={<AuthorProfile />} />
          <Route path="/author/me/create" element={<CreateProfile />} />
          <Route path="/author/me/edit" element={<></>} />
          <Route path="/author/me/posts" element={<></>} />
          <Route path="/author/:slug" element={<AuthorProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </div>
  )
}

export default App
