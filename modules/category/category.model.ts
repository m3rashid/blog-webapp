import mongoose from 'mongoose'

export interface ICategory {
  name: string
  slug: string
  deleted: boolean
}

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export const Category = mongoose.model<ICategory>('Category', categorySchema)
