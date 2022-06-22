import { Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'
import { Post } from '../post'

import { Comment, IComment } from './comment.model'

export const createComment = async (req: Request, res: Response) => {
  const { name, comment, postId } = req.body

  const newComment: HydratedDocument<IComment> = new Comment({ name, comment })
  const saved = await newComment.save()

  const savedPost = await Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: saved._id } }
  )

  return res.status(200).json(saved)
}

export const editComment = async (req: Request, res: Response) => {
  const { commentId } = req.body

  const comment = await Comment.findById(commentId)
  if (!comment) throw new Error('Comment not found')

  const newComment = await Comment.updateOne(
    { _id: commentId },
    { $set: { ...req.body } }
  )
  return res.status(200).json(newComment)
}

export const deleteComment = async (req: Request, res: Response) => {
  const { commentId } = req.body
  const deleted = await Comment.findByIdAndDelete(commentId)
  if (!deleted) throw new Error('Comment not found')

  return res.status(200).json(deleted)
}
