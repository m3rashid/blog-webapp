import { Group, Loader } from '@mantine/core'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { useSafeApiCall } from './api/safeApiCall'
import { authAtom } from './atoms/auth'
import PageWrapper from './components/globals/pageWrapper'
const NotFound = React.lazy(() => import('./pages/404'))
const Auth = React.lazy(() => import('./pages/auth'))
const AuthorProfile = React.lazy(() => import('./pages/authorProfile'))
const Category = React.lazy(() => import('./pages/category'))
const CreateProfile = React.lazy(() => import('./pages/createProfile'))
const CreatePost = React.lazy(() => import('./pages/createPost'))
const EditPost = React.lazy(() => import('./pages/editPost'))
const Home = React.lazy(() => import('./pages/home'))
const Post = React.lazy(() => import('./pages/post'))

const App = () => {
  const { safeApiCall } = useSafeApiCall()
  const setAuth = useSetRecoilState(authAtom)

  React.useEffect(() => {
    safeApiCall({ body: {}, endpoint: '/auth', notif: { id: 'authCheck' } })
      .then((res) => {
        if (!res) return
        setAuth({ isAuthenticated: true, user: res.data })
      })
      .catch()
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
          <Route path="/author/create" element={<CreateProfile />} />
          <Route path="/author/:userId" element={<AuthorProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </div>
  )
}

export default App
