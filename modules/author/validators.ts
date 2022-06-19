import Joi from 'joi'

import { initValidator } from '../../utils/validator'

const addAuthorSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().required().min(3).max(50),
  bio: Joi.string().required().min(10).max(200),
  avatar: Joi.string().required(),
  website: Joi.string().optional(),
  githubUrl: Joi.string().optional(),
  twitterUrl: Joi.string().optional(),
  facebookUrl: Joi.string().optional(),
  instagramUrl: Joi.string().optional(),
  linkedinUrl: Joi.string().optional(),
  youtubeUrl: Joi.string().optional(),
})

const editAuthorSchema = Joi.object({
  authorId: Joi.string().required(),
  name: Joi.string().optional(),
  bio: Joi.string().optional(),
  avatar: Joi.string().optional(),
  website: Joi.string().optional(),
  githubUrl: Joi.string().optional(),
  twitterUrl: Joi.string().optional(),
  facebookUrl: Joi.string().optional(),
  instagramUrl: Joi.string().optional(),
  linkedinUrl: Joi.string().optional(),
  youtubeUrl: Joi.string().optional(),
})

const deleteAuthorSchema = Joi.object({
  authorId: Joi.string().required(),
})

const getAuthorDetailsSchema = Joi.object({
  authorId: Joi.string().required(),
})

export const validateAddAuthor = initValidator(addAuthorSchema)
export const validateEditAuthor = initValidator(editAuthorSchema)
export const validateDeleteAuthor = initValidator(deleteAuthorSchema)
export const validateGetAuthorDetails = initValidator(getAuthorDetailsSchema)
