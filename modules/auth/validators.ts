import Joi from 'joi'

import { initValidator } from '../../utils/validator'

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const register = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  role: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref('password'),
})

const forgotPassword = Joi.object({
  email: Joi.string().email().required(),
})

const resetPassword = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref('password'),
  otp: Joi.string().required(),
})

const deleteUser = Joi.object({
  userId: Joi.string().required(),
})

const recoverDeletedUser = Joi.object({
  userId: Joi.string().required(),
})

export const loginValidator = initValidator(login)
export const registerValidator = initValidator(register)
export const forgotPasswordValidator = initValidator(forgotPassword)
export const resetPasswordValidator = initValidator(resetPassword)
export const deleteUserValidator = initValidator(deleteUser)
export const recoverDeletedUserValidator = initValidator(recoverDeletedUser)
