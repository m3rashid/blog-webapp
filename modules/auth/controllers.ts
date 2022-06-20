import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'

import { issueJWT } from './helpers'
import { IUser, User } from './user.model'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ $and: [{ email }, { deleted: false }] })
  if (!user) throw new Error('User not found')

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error('Credentials Invalid')

  const token = issueJWT(user._id)
  return res.status(200).json({ user, token })
}

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId)
  return res.status(200).json(user)
}

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({
    $and: [{ email: email }, { deleted: false }],
  })
  if (user) throw new Error('User already exists')

  const hash = await bcrypt.hash(password, 12)
  const newUser: HydratedDocument<IUser> = new User({ email, password: hash })
  const savedUser = await newUser.save()

  const token = issueJWT(savedUser._id)
  return res.status(200).json({ user: savedUser, token })
}

export const forgotPassword = async (req: Request, res: Response) => {}

export const resetPassword = async (req: Request, res: Response) => {}

export const deleteUser = async (req: Request, res: Response) => {}

export const recoverDeletedUser = async (req: Request, res: Response) => {}
