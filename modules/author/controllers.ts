import { Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'
import { bannedWordsForSlug } from '../../utils/helpers'

import { User } from '../auth'
import { Author, IAuthor } from './author.model'

export const createAuthorProfile = async (req: Request, res: Response) => {
  const userId = req.userId

  const {
    name,
    slug,
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

  if (slug.length < 5) throw new Error('Slug too short')
  if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid slug')

  const author: HydratedDocument<IAuthor> = new Author({
    name,
    slug,
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
  const savedAuth = await User.findByIdAndUpdate(userId, { profile: saved._id })

  return res.status(200).json({ author: saved, user: savedAuth })
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
  const { slug } = req.body
  const author = await Author.findOne({ slug })

  if (!author) throw new Error('Author not found')
  const newAuthor = await Author.findOneAndUpdate(
    { slug: slug },
    { $set: { ...req.body } }
  )

  return res.send(newAuthor)
}

export const getAuthorDetails = async (req: Request, res: Response) => {
  const { slug } = req.body
  const author = await Author.findOne({ slug })

  return res.status(200).json(author)
}
