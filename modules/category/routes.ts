import { Router } from 'express'

import { makeSafe } from '../../utils/router'
import { authRateLimiter, regularRateLimiter } from '../../utils/rateLimiters'
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategoriesByAuthor,
  getCategoriesByPost,
} from './controllers'
import {
  validateAddCategory,
  validateDeleteCategory,
  validateEditCategory,
} from './validators'

const r = Router()

r.post(
  '/category/create',
  authRateLimiter,
  makeSafe(validateAddCategory),
  makeSafe(createCategory)
)
r.post(
  '/category/delete',
  authRateLimiter,
  makeSafe(validateDeleteCategory),
  makeSafe(deleteCategory)
)
r.post(
  '/category/edit',
  authRateLimiter,
  makeSafe(validateEditCategory),
  makeSafe(editCategory)
)
r.post(
  '/category/get-category-by-author',
  regularRateLimiter,
  makeSafe(getCategoriesByAuthor)
)
r.post(
  '/category/get-category-by-post',
  regularRateLimiter,
  makeSafe(getCategoriesByPost)
)

export const categoryRouter = r
