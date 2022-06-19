import Joi from 'joi'

import { initValidator } from '../../utils/validator'

const addCommentSchema = Joi.object({
  name: Joi.string().required(),
  comment: Joi.string().required(),
  postId: Joi.string().required(),
})

const editCommentSchema = Joi.object({
  commentId: Joi.string().required(),
  comment: Joi.string().optional(),
  postId: Joi.string().optional(),
})

const deleteCommentSchema = Joi.object({
  commentId: Joi.string().required(),
})

export const validateAddComment = initValidator(addCommentSchema)
export const validateEditComment = initValidator(editCommentSchema)
export const validateDeleteComment = initValidator(deleteCommentSchema)
