import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const initValidator =
  (schema: Joi.ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    await schema.validateAsync({ ...req.body })
    next()
  }
