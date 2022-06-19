import { Request, Response, NextFunction, Router } from 'express'

// Global error checker
export const makeSafe =
  (check: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(check(req, res, next)).catch(next)
  }

// </endpoint> <rateLimit> <validator> <auth> <controller>
