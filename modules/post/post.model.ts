import mongoose from 'mongoose'

import { IComment } from '../comment'
import { IAuthor } from '../author'
import { ICategory } from '../category'

export interface IPost {
  tilte: string
  body: string
  bannerImageUrl: string
  comments: IComment[]
  author: IAuthor
  categories: ICategory[]
  deleted: boolean
}

const postSchema = new mongoose.Schema<IPost>(
  {
    tilte: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    bannerImageUrl: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export const Post = mongoose.model<IPost>('Post', postSchema)
