import { Router } from 'express'

import { checkAuth, makeSafe } from '../../utils/router'
import { authRateLimiter, regularRateLimiter } from '../../utils/rateLimiters'
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategoriesByAuthor,
  getCategoriesByPost,
} from './controllers'
import {
  validateAddCategory,
  validateDeleteCategory,
  validateEditCategory,
} from './validators'

const r = Router()

r.post('/category/all', regularRateLimiter, makeSafe(getAllCategories))
r.post(
  '/category/create',
  authRateLimiter,
  checkAuth,
  makeSafe(validateAddCategory),
  makeSafe(createCategory)
)
r.post(
  '/category/delete',
  authRateLimiter,
  checkAuth,
  makeSafe(validateDeleteCategory),
  makeSafe(deleteCategory)
)
r.post(
  '/category/edit',
  authRateLimiter,
  checkAuth,
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
