import { atom } from 'recoil'

import { IPost } from '../types'

export const allPostsAtom = atom<IPost[]>({
  key: 'posts-for-card',
  default: [],
})
