import { Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'
import { IPost, Post } from './post.model'

export const createPost = async (req: Request, res: Response) => {
  const { title, slug, data, bannerImageUrl, authorId, categories, published } =
    req.body
  const post: HydratedDocument<IPost> = new Post({
    title,
    slug,
    data,
    bannerImageUrl,
    author: authorId,
    categories,
    published,
  })
  const saved = await post.save()
  res.status(201).json(saved)
}

export const editPost = async (req: Request, res: Response) => {}

export const deletePost = async (req: Request, res: Response) => {
  const { slug } = req.body
  const post = await Post.findOneAndUpdate({ slug }, { deleted: true })
  res.status(200).json('Post Deleted')
}

export const getPostsForCard = async (req: Request, res: Response) => {
  // use aggregation for only desired results
  const posts = await Post.find({ published: true }).limit(6)
  res.status(200).json(posts)
}

export const getPostDetails = async (req: Request, res: Response) => {
  const { slug } = req.body
  const post = await Post.findOne({ slug })
  return res.status(200).json(post)
}

export const getAuthorPosts = async (req: Request, res: Response) => {
  // get all posts draft or not
  const { id } = req.body
  const posts = await Post.find({ author: id })
  return res.status(200).json(posts)
}
