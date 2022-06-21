import { Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'
import { Category, ICategory } from './category.model'

export const getAllCategories = async (req: Request, res: Response) => {
  const categories = await Category.find()
  res.json(categories)
}

export const createCategory = async (req: Request, res: Response) => {
  const { name, slug } = req.body
  const category: HydratedDocument<ICategory> = new Category({ name, slug })

  const saved = await category.save()
  return res.send(saved)
}

export const editCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.body
  const category = await Category.findById(categoryId)
  if (!category) throw new Error('Category not found')

  const newCategory = await Category.updateOne(
    { _id: categoryId },
    { $set: { ...req.body } }
  )
  return res.send(newCategory)
}

export const deleteCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.body
  const category = await Category.findById(categoryId)
  if (!category) throw new Error('Category not found')

  await Category.deleteOne({ _id: categoryId })

  return res.send('Category Deleted')
}

export const getCategoriesByPost = async (req: Request, res: Response) => {}

export const getCategoriesByAuthor = async (req: Request, res: Response) => {}
