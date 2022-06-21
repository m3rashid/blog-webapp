import { Router } from 'express'

import { checkAuth, makeSafe } from '../../utils/router'
import { authRateLimiter, regularRateLimiter } from '../../utils/rateLimiters'
import {
  createAuthorProfile,
  deleteAuthorProfile,
  editAuthorProfile,
  getAuthorDetails,
} from './controllers'
import {
  validateAddAuthor,
  validateDeleteAuthor,
  validateEditAuthor,
  validateGetAuthorDetails,
} from './validators'

const r = Router()

r.post(
  '/author/create',
  authRateLimiter,
  checkAuth,
  makeSafe(validateAddAuthor),
  makeSafe(createAuthorProfile)
)
r.post(
  '/author/delete',
  authRateLimiter,
  checkAuth,
  makeSafe(validateDeleteAuthor),
  makeSafe(deleteAuthorProfile)
)
r.post(
  '/author/edit',
  authRateLimiter,
  checkAuth,
  makeSafe(validateEditAuthor),
  makeSafe(editAuthorProfile)
)
r.post(
  '/author/get-details',
  regularRateLimiter,
  makeSafe(validateGetAuthorDetails),
  makeSafe(getAuthorDetails)
)

export const authorRouter = r
