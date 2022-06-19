import { config } from 'dotenv'
config()
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoose from 'mongoose'
// import cookieParser from 'cookie-parser'
import express, { NextFunction, Request, Response } from 'express'

import { appConfig, isProduction, startLog } from './utils/appConfig'
import { auth, author, category, comment, post } from './modules'

const app = express()
app.use(helmet())
app.use(xss())
app.use(cors(appConfig.cors))
// app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.set('debug', !isProduction)

app.use(auth.deserializeUser)
app.use(auth.authRouter)
app.use(author.authorRouter)
app.use(category.categoryRouter)
app.use(comment.commentRouter)
app.use(post.postRouter)
/**
 * add more routes here
 * .......
 * .....
 */
app.all('/', (_: Request, res: Response) => {
  return res.json({ message: 'Server is OK' })
})

// Global error handler
app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  console.error(err)
  return res.status(500).json({
    message: appConfig.errorMessage,
  })
})

process.on('uncaughtException', (error: Error) => {
  console.error(error)
  process.exit(1)
})

const port = process.env.PORT || 5000
app.listen(port, async () => {
  try {
    await mongoose.connect(appConfig.mongodbUri)
    console.log('Mongoose is connected')
    console.log(startLog(port))
  } catch (err) {
    console.error('MongoDB connection error')
    console.error(JSON.stringify(err))
    process.exit(1)
  }
})
