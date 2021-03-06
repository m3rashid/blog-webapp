import { Router } from 'express'

import { checkAuth, makeSafe } from '../../utils/router'
import { authRateLimiter, regularRateLimiter } from '../../utils/rateLimiters'
import {
  createPost,
  deletePost,
  editPost,
  getPostsForCard,
  getPostDetails,
  getAuthorPosts,
  getRelatedPosts,
  getPostsByCategory,
} from './controllers'

const r = Router()
r.post('/post/create', checkAuth, authRateLimiter, makeSafe(createPost))
r.post('/post/delete', checkAuth, authRateLimiter, makeSafe(deletePost))
r.post('/post/edit', checkAuth, authRateLimiter, makeSafe(editPost))
r.post('/post/card', regularRateLimiter, makeSafe(getPostsForCard))
r.post('/post/details', regularRateLimiter, makeSafe(getPostDetails))
r.post('/post/author', regularRateLimiter, makeSafe(getAuthorPosts))
r.post('/post/related', regularRateLimiter, makeSafe(getRelatedPosts))
r.post('/post/by-category', regularRateLimiter, makeSafe(getPostsByCategory))

export const postRouter = r
