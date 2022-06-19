import React from 'react'
import { Route, Routes } from 'react-router-dom'

import NotFound from './pages/404'
import Category from './pages/category'
import CreatePost from './pages/createPost'
import EditPost from './pages/editPost'
import Home from './pages/home'
import Post from './pages/post'

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={'routes loading'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/post/create" element={<CreatePost />} />
          <Route path="/post/edit/:slug" element={<EditPost />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </div>
  )
}

export default App
