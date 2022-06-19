import Redis from 'ioredis'
import RedisStore from 'rate-limit-redis'
import rateLimit, { Options } from 'express-rate-limit'

import { isProduction } from './appConfig'

const authRateLimitConfig: Partial<Options> = {
  windowMs: 5 * 60 * 1000, // 5 minutes (given here in milliseconds)
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  // legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}

const regularRateLimitConfig: Partial<Options> = {
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  // legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}

const initProdRateLimiter = (rateLimitConfig: Partial<Options>) => {
  const client = new Redis({ host: 'redis' })
  return rateLimit({
    ...rateLimitConfig,
    store: new RedisStore({
      // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
      sendCommand: (...args: string[]) => client.call(...args),
    }),
  })
}

const initDevRateLimiter = (rateLimitConfig: Partial<Options>) => {
  return rateLimit(rateLimitConfig)
}

const useRateLimiter = isProduction ? initProdRateLimiter : initDevRateLimiter

// use these as middlewares to limit the number of requests
export const authRateLimiter = useRateLimiter(authRateLimitConfig)
export const regularRateLimiter = useRateLimiter(regularRateLimitConfig)
