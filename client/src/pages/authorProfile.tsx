import React from 'react'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'

import { authAtom } from '../atoms/auth'
import PageWrapper from '../components/globals/pageWrapper'

interface IProps {}

const AuthorProfile: React.FC<IProps> = () => {
  const user = useRecoilValue(authAtom)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/auth')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageWrapper>
      <div>AuthorProfile</div>
    </PageWrapper>
  )
}

export default AuthorProfile
