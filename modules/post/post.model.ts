import mongoose from 'mongoose'

import { IComment } from '../comment'
import { IAuthor } from '../author'
import { ICategory } from '../category'

export enum POST_DATA_TYPE {
  CODE = 'code',
  TEXT = 'text',
}

export interface IPostData {
  id: string
  content: string
  type: 'code' | 'text'
}

export interface IPost {
  tilte: string
  data: IPostData[]
  bannerImageUrl: string
  comments: IComment[]
  author: IAuthor
  categories: ICategory[]
  published: boolean
  deleted: boolean
}

const postSchema = new mongoose.Schema<IPost>(
  {
    tilte: {
      type: String,
      required: true,
    },
    data: [
      {
        id: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: Object.values(POST_DATA_TYPE),
        },
      },
    ],
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
    published: {
      type: Boolean,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export const Post = mongoose.model<IPost>('Post', postSchema)
