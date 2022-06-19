import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import { CircleCheck, Error404 } from 'tabler-icons-react'
import { showNotification, updateNotification } from '@mantine/notifications'

import { authAtom } from '../atoms/auth'

export const instance = axios.create({
  baseURL: 'http://localhost:5000',
})

export interface INotifState {
  title: string
  message: string
}

export interface INotification {
  id: string
  loadingMsg?: INotifState
  successMsg?: INotifState
  errorMsg?: INotifState
}

interface ISafeApiCall {
  endpoint: string
  body: any
  notif: INotification
}

export const useSafeApiCall = () => {
  const setAuthState = useSetRecoilState(authAtom)

  const safeApiCall = async ({ endpoint, body, notif }: ISafeApiCall) => {
    try {
      showNotification({
        id: notif.id,
        loading: true,
        title: notif.loadingMsg?.title || 'In Progress',
        message: notif.loadingMsg?.message || 'Please wait...',
        autoClose: 5000,
        disallowClose: true,
      })

      const res = await instance.post(endpoint, JSON.stringify({ ...body }), {
        headers: {
          'Content-Type': 'application/json',
          // authorization: token || "",
        },
      })

      updateNotification({
        id: notif.id,
        color: 'teal',
        title:
          notif.successMsg?.title ||
          res.data.message ||
          'Successfully completed task',
        message:
          notif.successMsg?.message ||
          res.data.message ||
          'Your defined task was successfully completed',
        icon: <CircleCheck />,
        autoClose: 5000,
      })

      return res
    } catch (err: any) {
      if (err.response.status === 401) {
        setAuthState({ isAuthenticated: false, user: null, role: '' })
        return null
      }

      console.log(err)
      updateNotification({
        id: notif.id,
        color: 'red',
        title: notif.errorMsg?.title || 'Error in getting response',
        message:
          notif.errorMsg?.message ||
          'An error occurred while getting response from server. Please try again later.',
        icon: <Error404 />,
        autoClose: 5000,
      })
      return null
    }
  }

  return { safeApiCall }
}
