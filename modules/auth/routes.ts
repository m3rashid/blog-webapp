import { Router } from 'express'

import { checkAuth, makeSafe } from '../../utils/router'
import { authRateLimiter, regularRateLimiter } from '../../utils/rateLimiters'
import {
  deleteUser,
  forgotPassword,
  getUser,
  login,
  recoverDeletedUser,
  register,
  resetPassword,
} from './controllers'

const r = Router()

r.post('/auth/login', authRateLimiter, makeSafe(login))
r.post('/auth/register', authRateLimiter, makeSafe(register))
r.post('/auth', checkAuth, regularRateLimiter, makeSafe(getUser))
r.post('/auth/forgot-password', authRateLimiter /* other middlewares */)
r.post('/auth/reset-password', authRateLimiter /* other middlewares */)

r.post('/auth/forgot-password', authRateLimiter, makeSafe(forgotPassword))
r.post('/auth/reset-password', authRateLimiter, makeSafe(resetPassword))
r.post('/auth/delete-user', authRateLimiter, makeSafe(deleteUser))
r.post('/auth/recover-user', authRateLimiter, makeSafe(recoverDeletedUser))

export const authRouter = r
