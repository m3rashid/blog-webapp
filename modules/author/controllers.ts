import { Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'

import { Author, IAuthor } from './author.model'

export const createAuthorProfile = async (req: Request, res: Response) => {
  const {
    userId,
    name,
    bio,
    avatar,
    website,
    githubUrl,
    twitterUrl,
    facebookUrl,
    instagramUrl,
    linkedinUrl,
    youtubeUrl,
  } = req.body
  const author: HydratedDocument<IAuthor> = new Author({
    user: userId,
    name,
    bio,
    avatar,
    website,
    githubUrl,
    twitterUrl,
    facebookUrl,
    instagramUrl,
    linkedinUrl,
    youtubeUrl,
  })
  const saved = await author.save()
  return res.send(saved)
}

export const deleteAuthorProfile = async (req: Request, res: Response) => {
  const { authorId } = req.body
  const author = await Author.findById(authorId)
  if (!author) throw new Error('Author not found')

  author.deleted = true
  const saved = await author.save()
  return res.send(saved)
}

export const editAuthorProfile = async (req: Request, res: Response) => {
  const { authorId } = req.body
  const author = await Author.findById(authorId)

  if (!author) throw new Error('Author not found')
  const newAuthor = await Author.findOneAndUpdate(
    { _id: authorId },
    { $set: { ...req.body } }
  )

  return res.send(newAuthor)
}

export const getAuthorDetails = async (req: Request, res: Response) => {
  const { authorId } = req.body
  const author = await Author.findById(authorId).populate('user', 'categories')

  return res.send(author)
}
