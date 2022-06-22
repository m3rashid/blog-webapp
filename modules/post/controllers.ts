import { Request, Response } from 'express'
import mongoose, { HydratedDocument } from 'mongoose'
import { bannedWordsForSlug } from '../../utils/helpers'
import { Category } from '../category'

import { IPost, Post } from './post.model'

export const createPost = async (req: Request, res: Response) => {
  const { title, slug, data, bannerImageUrl, authorId, categories, published } =
    req.body

  if (slug.length < 5) throw new Error('Slug too short')
  if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid slug')

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

export const editPost = async (req: Request, res: Response) => {
  const { postId, data, published, title, bannerImageUrl } = req.body
  const post = await Post.findById(postId)
  if (!post) throw new Error('Post not found')

  const updated = await post.updateOne({
    data,
    published,
    title,
    bannerImageUrl,
  })
  res.status(200).json(updated)
}

export const deletePost = async (req: Request, res: Response) => {
  const { slug } = req.body
  const post = await Post.findOneAndUpdate({ slug }, { deleted: true })
  res.status(200).json('Post Deleted')
}

export const getPostsForCard = async (req: Request, res: Response) => {
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
        published: 1,
      },
    },
  ])
  return res.status(200).json(post[0])
}

export const getAuthorPosts = async (req: Request, res: Response) => {
  const { authorId } = req.body
  const posts = await Post.aggregate([
    // @ts-ignore
    { $match: { author: new mongoose.Types.ObjectId(authorId) } },
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
        published: 1,
        categories: { name: 1, slug: 1 },
      },
    },
  ])
  return res.status(200).json(posts)
}

export const getRelatedPosts = async (req: Request, res: Response) => {
  const { slug } = req.body

  const posts = await Post.aggregate([
    // @ts-ignore
    { $match: { slug: slug, published: true } },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $project: {
        _id: 0,
        category: { name: 1, slug: 1, _id: 1 },
      },
    },
    { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'posts',
        localField: 'category._id',
        foreignField: 'categories',
        as: 'posts',
      },
    },
    {
      $project: {
        posts: { _id: 1, title: 1, slug: 1, bannerImageUrl: 1, createdAt: 1 },
      },
    },
    {
      $unwind: { path: '$posts', preserveNullAndEmptyArrays: true },
    },
    { $match: { 'posts.slug': { $ne: slug } } },
    {
      $project: {
        _id: '$posts._id',
        title: '$posts.title',
        slug: '$posts.slug',
        bannerImageUrl: '$posts.bannerImageUrl',
        createdAt: '$posts.createdAt',
      },
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          slug: '$slug',
          title: '$title',
          bannerImageUrl: '$bannerImageUrl',
          createdAt: '$createdAt',
        },
      },
    },
    { $limit: 5 },
    {
      $project: {
        _id: '$_id._id',
        title: '$_id.title',
        slug: '$_id.slug',
        bannerImageUrl: '$_id.bannerImageUrl',
        createdAt: '$_id.createdAt',
      },
    },
  ])

  return res.status(200).json(posts)
}

export const getPostsByCategory = async (req: Request, res: Response) => {
  const { slug } = req.body

  const posts = await Category.aggregate([
    { $match: { slug: slug } },
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'categories',
        as: 'posts',
      },
    },
    {
      $project: {
        _id: 0,
        name: 0,
        slug: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
    { $unwind: { path: '$posts', preserveNullAndEmptyArrays: false } },
    {
      $project: {
        title: '$posts.title',
        slug: '$posts.slug',
        bannerImageUrl: '$posts.bannerImageUrl',
        categories: '$posts.categories',
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
      },
    },
    {
      $project: { categories: { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 } },
    },
  ])

  if (!posts || posts.length === 0) {
    return res.status(200).json([])
  }
  return res.status(200).json(posts)
}
