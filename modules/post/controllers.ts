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
  const posts = await Post.aggregate([
    { $limit: 6 },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
      },
    },
    {
      $project: {
        title: 1,
        slug: 1,
        bannerImageUrl: 1,
        categories: { name: 1, slug: 1 },
      },
    },
  ])
  res.status(200).json(posts)
}

export const getPostDetails = async (req: Request, res: Response) => {
  const { slug } = req.body
  const post = await Post.aggregate([
    { $match: { slug: slug } },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: 'comments',
        foreignField: '_id',
        as: 'comments',
      },
    },
    {
      $lookup: {
        from: 'authors',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
    { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        title: 1,
        slug: 1,
        data: 1,
        bannerImageUrl: 1,
        comments: 1,
        author: 1,
        categories: { name: 1, slug: 1 },
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ])
  return res.status(200).json(post)
}

export const getAuthorPosts = async (req: Request, res: Response) => {
  // get all posts draft or not
  const { id } = req.body
  const posts = await Post.find({ author: id })
  return res.status(200).json(posts)
}
