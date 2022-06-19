import mongoose from 'mongoose'

import { IUser } from '../auth'
import { ICategory } from '../category'
import { IPost } from '../post'

export interface IAuthor {
  user: IUser
  name: string
  bio: string
  avatar: string
  website?: string
  githubUrl?: string
  twitterUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
  posts: IPost[]
  categories: ICategory[]
  deleted: boolean
}

const authorSchema = new mongoose.Schema<IAuthor>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    twitterUrl: {
      type: String,
    },
    facebookUrl: {
      type: String,
    },
    instagramUrl: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
    youtubeUrl: {
      type: String,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
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

export const Author = mongoose.model<IAuthor>('Author', authorSchema)
