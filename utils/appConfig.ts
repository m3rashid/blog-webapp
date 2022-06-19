import { CorsOptions } from 'cors'

export interface IAppConfig {
  cors: CorsOptions
  errorMessage: string | ((err: any) => string)
  mongodbUri: string
}

const devConfig: IAppConfig = {
  cors: {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  },
  errorMessage: (err: any) =>
    JSON.stringify(err.message) || 'Internal Server Error',
  mongodbUri: 'mongodb://localhost/blog',
}

const prodConfig: IAppConfig = {
  cors: {
    origin: [],
    optionsSuccessStatus: 200,
  },
  errorMessage: 'Internal Server Error',
  mongodbUri: `mongodb://mongo/blog`,
}

export const isProduction = process.env.NODE_ENV === 'production'
export const startLog = (port: number | string) =>
  `Ready on port:${port}, env:${process.env.NODE_ENV}`

export const appConfig = isProduction ? prodConfig : devConfig
