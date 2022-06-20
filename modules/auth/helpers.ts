import fs from 'fs'
import path from 'path'
import JWT from 'jsonwebtoken'
import mongoose from 'mongoose'

const privateKey = fs.readFileSync(
  path.join(__dirname, './keys/private.pem'),
  'utf8'
)
const publicKey = fs.readFileSync(
  path.join(__dirname, './keys/public.pem'),
  'utf8'
)

export const issueJWT = (userId: mongoose.Types.ObjectId) => {
  const signedToken = JWT.sign({ userId }, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1d',
  })
  return 'Bearer ' + signedToken
}

export const verifyJWT = (token: string) => {
  try {
    const extractedToken = token.split(' ')[1]
    const payload = JWT.verify(extractedToken, publicKey)
    return { expired: false, payload }
  } catch (err: any) {
    console.error({ 'Verify JWT error': err })
    return {
      expired: err.message.includes('jwt expired'),
      payload: null,
    }
  }
}
