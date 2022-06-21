import Joi from 'joi'

import { initValidator } from '../../utils/validator'

const addAuthorSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  slug: Joi.string().required().min(3).max(10),
  bio: Joi.string().required().min(10).max(1000),
  avatar: Joi.string().required(),
  website: Joi.string().optional().allow(null, ''),
  githubUrl: Joi.string().optional().allow(null, ''),
  twitterUrl: Joi.string().optional().allow(null, ''),
  facebookUrl: Joi.string().optional().allow(null, ''),
  instagramUrl: Joi.string().optional().allow(null, ''),
  linkedinUrl: Joi.string().optional().allow(null, ''),
  youtubeUrl: Joi.string().optional().allow(null, ''),
})

const editAuthorSchema = Joi.object({
  authorId: Joi.string().required(),
  name: Joi.string().optional().min(3).max(50),
  slug: Joi.string().optional().min(3).max(10),
  bio: Joi.string().optional().min(10).max(1000),
  avatar: Joi.string().optional(),
  website: Joi.string().optional().allow(null, ''),
  githubUrl: Joi.string().optional().allow(null, ''),
  twitterUrl: Joi.string().optional().allow(null, ''),
  facebookUrl: Joi.string().optional().allow(null, ''),
  instagramUrl: Joi.string().optional().allow(null, ''),
  linkedinUrl: Joi.string().optional().allow(null, ''),
  youtubeUrl: Joi.string().optional().allow(null, ''),
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
