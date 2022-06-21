import { atom } from 'recoil'

export interface IPostCard {
  _id: string
  title: string
  slug: string
  bannerImageUrl: string
  categories: {
    name: string
    slug: string
  }[]
}

export const postsForCardAtom = atom<IPostCard[]>({
  key: 'posts-for-card',
  default: [],
})
