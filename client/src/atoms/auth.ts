import { atom } from 'recoil'

export interface IAuthState {
  user: any
  isAuthenticated: boolean
}

export const authAtom = atom<IAuthState>({
  key: 'auth',
  default: {
    user: {},
    isAuthenticated: false,
  },
})
