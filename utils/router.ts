import { Request, Response, NextFunction } from 'express'

import { verifyJWT } from '../modules/auth/helpers'

// Global error checker
export const makeSafe =
  (check: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(check(req, res, next)).catch(next)
  }

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).json('Unauthorized')
  }
  const { expired, payload } = verifyJWT(token)
  if (expired) {
    return res.status(401).json('Unauthorized')
  }
  // @ts-ignore
  req.userId = payload?.userId
  next()
}

// </endpoint> <rateLimit> <validator> <auth> <controller>
