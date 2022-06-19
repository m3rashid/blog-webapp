import mongoose from 'mongoose'

import { IAuthor } from '../author'

export enum ROLE {
  AUTHOR = 'AUTHOR',
  ADMIN = 'ADMIN',
}

export interface IUser {
  password: string
  email: string
  role: ROLE
  profile: IAuthor
  deleted: boolean
}

const userSchema = new mongoose.Schema<IUser>(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
