import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'

import { issueJWT } from './helpers'
import { IUser, User } from './user.model'
import { createSession, invalidateSession } from './sessions'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ $and: [{ email }, { deleted: false }] })
  if (!user) throw new Error('User not found')

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error('Credentials Invalid')

  const session = createSession(email, user.role)
  const accessToken = issueJWT(
    {
      email: user.email,
      role: user.role,
      sessionId: session.sessionId,
    },
    '5s'
  )
  const refreshToken = issueJWT({ sessionId: session.sessionId }, '1y')

  res.cookie('accessToken', accessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  })
  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
  })
  return res.send(session)
}

export const getAuthSession = async (req: Request, res: Response) => {
  return res.send(req.user)
}

export const logout = async (req: Request, res: Response) => {
  res.cookie('accessToken', '', { maxAge: 0, httpOnly: true })
  res.cookie('refreshToken', '', { maxAge: 0, httpOnly: true })

  const session = invalidateSession(req.user.sessionId)
  return res.send(session)
}

export const register = async (req: Request, res: Response) => {
  const { email, phone, password, role } = req.body

  const user = await User.findOne({ $and: [{ phone }, { deleted: false }] })
  if (user) throw new Error('User already exists')

  const hash = await bcrypt.hash(password, 12)
  const newUser: HydratedDocument<IUser> = new User({
    email,
    phone,
    role,
    password: hash,
  })
  const savedUser = await newUser.save()

  const session = createSession(savedUser.email, savedUser.role)
  const accessToken = issueJWT(
    {
      email: savedUser.email,
      role: savedUser.role,
      sessionId: session.sessionId,
    },
    '5s'
  )
  const refreshToken = issueJWT({ sessionId: session.sessionId }, '1y')

  res.cookie('accessToken', accessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  })
  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
  })
  return res.send(session)
}

export const forgotPassword = async (req: Request, res: Response) => {}

export const resetPassword = async (req: Request, res: Response) => {}

export const deleteUser = async (req: Request, res: Response) => {}

export const recoverDeletedUser = async (req: Request, res: Response) => {}
