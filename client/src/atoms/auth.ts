import { atom } from 'recoil'

export interface IAuthState {
  user: {
    _id: string
    email: string
    createdAt: string
    updatedAt: string
    profile: string
    author?: {
      name: string
      slug: string
    }
  }
  isAuthenticated: boolean
}

export const authAtom = atom<IAuthState>({
  key: 'auth',
  default: {
    user: {} as any,
    isAuthenticated: false,
  },
})
