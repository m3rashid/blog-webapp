import { NextFunction, Request, Response } from 'express'
import { issueJWT, verifyJWT } from './helpers'
import { getSession } from './sessions'

export const deserializeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies?.accessToken
  const refreshToken = req.cookies?.refreshToken

  console.log({ refreshToken, accessToken })

  if (!accessToken) return next()

  const { payload, expired } = verifyJWT(accessToken)
  if (payload) {
    req.user = payload
    return next()
  }

  const { payload: refresh } =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null }
  if (!refresh) return next()

  // @ts-ignore
  const session = getSession(refresh.sessionId)
  if (!session) return next()

  const newAccessToken = issueJWT(session, '5s')

  res.cookie('accessToken', newAccessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  })
  req.user = verifyJWT(newAccessToken).payload
  return next()
}
