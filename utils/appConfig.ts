import { CorsOptions } from 'cors'

export interface IAppConfig {
  cors: CorsOptions
  errorMessage: string | ((err: any) => string)
  mongodbUri: string
}

const devConfig: IAppConfig = {
  cors: {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    optionsSuccessStatus: 200,
  },
  errorMessage: (err: any) =>
    JSON.stringify(err.message) || 'Internal Server Error',
  mongodbUri: 'mongodb://localhost/blog',
}

const prodConfig: IAppConfig = {
  cors: {
    credentials: true,
    origin: [
      'https://cubicle.vercel.app',
      'https://cubicle-m3rashid.vercel.app',
    ],
    optionsSuccessStatus: 200,
  },
  errorMessage: 'Internal Server Error',
  mongodbUri: `mongodb+srv://${process.env.MONGO_USERNAME!}:${process.env
    .MONGO_PASSWORD!}@${process.env
    .MONGO_CLUSTER_NAME!}.2qudl.mongodb.net/${process.env
    .MONGO_DB_NAME!}?retryWrites=true&w=majority`,
}

export const isProduction = process.env.NODE_ENV === 'production'
export const startLog = (port: number | string) =>
  `Ready on port:${port}, env:${process.env.NODE_ENV}`

export const appConfig = isProduction ? prodConfig : devConfig
