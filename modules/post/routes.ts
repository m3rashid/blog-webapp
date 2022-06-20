import { Router } from 'express'

import { makeSafe } from '../../utils/router'
import { authRateLimiter, regularRateLimiter } from '../../utils/rateLimiters'
import {
  createPost,
  deletePost,
  editPost,
  getPostsForCard,
  getPostDetails,
  getAuthorPosts,
} from './controllers'

const r = Router()
r.post('/post/create', authRateLimiter, makeSafe(createPost))
r.post('/post/delete', authRateLimiter, makeSafe(deletePost))
r.post('/post/edit', authRateLimiter, makeSafe(editPost))
r.post('/post/card', regularRateLimiter, makeSafe(getPostsForCard))
r.post('/post/details', regularRateLimiter, makeSafe(getPostDetails))
r.post('/post/author', regularRateLimiter, makeSafe(getAuthorPosts))

export const postRouter = r
