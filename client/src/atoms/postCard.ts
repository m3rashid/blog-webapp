import { atom } from 'recoil'

export interface IPostCardForCard {
  _id: string
  title: string
  slug: string
  bannerImageUrl: string
  categories: {
    name: string
    slug: string
  }[]
}

export const postsForCardAtom = atom<IPostCardForCard[]>({
  key: 'posts-for-card',
  default: [],
})
