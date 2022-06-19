import Redis from 'ioredis'
import { v4 as uuidv4 } from 'uuid'
import session from 'express-session'
import connectRedis from 'connect-redis'

import { isProduction } from './appConfig'

const initProdSession = () => {
  const RedisStore = connectRedis(session)
  const redisClient = new Redis({ host: 'redis' })

  const prodSession: session.SessionOptions = {
    genid: (req) => uuidv4(),
    secret: process.env.COOKIE_SECRET!,
    name: 'spark',
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',
    },
  }

  return prodSession
}

const initDevSession = () => {
  const devSession: session.SessionOptions = {
    genid: (req) => uuidv4(),
    secret: process.env.COOKIE_SECRET!,
    name: 'spark',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'lax',
    },
  }

  return devSession
}

export const serverSession = session(
  isProduction ? initProdSession() : initDevSession()
)
