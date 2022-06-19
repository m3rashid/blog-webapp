import { Router } from 'express'

import { makeSafe } from '../../utils/router'
import { authRateLimiter, regularRateLimiter } from '../../utils/rateLimiters'
import { createComment, deleteComment, editComment } from './controllers'
import {
  validateAddComment,
  validateDeleteComment,
  validateEditComment,
} from './validators'

const r = Router()
r.post(
  '/comment/create',
  authRateLimiter,
  makeSafe(validateAddComment),
  makeSafe(createComment)
)
r.post(
  '/comment/delete',
  authRateLimiter,
  makeSafe(validateDeleteComment),
  makeSafe(deleteComment)
)
r.post(
  '/comment/edit',
  authRateLimiter,
  makeSafe(validateEditComment),
  makeSafe(editComment)
)

export const commentRouter = r
