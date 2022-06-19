import Joi from 'joi'

import { initValidator } from '../../utils/validator'

const addCategorySchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
})

const editCategorySchema = Joi.object({
  categoryId: Joi.string().required(),
  name: Joi.string().optional(),
  slug: Joi.string().optional(),
})

const deleteCategorySchema = Joi.object({
  categoryId: Joi.string().required(),
})

export const validateAddCategory = initValidator(addCategorySchema)
export const validateEditCategory = initValidator(editCategorySchema)
export const validateDeleteCategory = initValidator(deleteCategorySchema)
