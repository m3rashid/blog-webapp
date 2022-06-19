import mongoose from 'mongoose'

import { IPost } from '../post'

export interface IComment {
  name: string
  comment: string
  post: IPost
}

const commentSchema = new mongoose.Schema<IComment>(
  {
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  { timestamps: true }
)

export const Comment = mongoose.model<IComment>('Comment', commentSchema)
