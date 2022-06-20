import mongoose from 'mongoose'

import { IAuthor } from '../author'

export interface IUser {
  email: string
  password: string
  profile: IAuthor
  deleted: boolean
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export const User = mongoose.model<IUser>('User', userSchema)
