import { atom } from 'recoil'

export const authAtom = atom({
  key: 'auth',
  default: {
    user: {} as any,
    // change this to false
    isAuthenticated: true,
    role: '' as 'AUTHOR' | 'ADMIN' | '',
  },
})
