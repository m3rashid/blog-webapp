import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { authAtom } from '../atoms/auth'
import PageWrapper from '../components/globals/pageWrapper'

interface IProps {}

const CreateEditProfile: React.FC<IProps> = () => {
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
      <div>CreateEditProfile</div>
    </PageWrapper>
  )
}

export default CreateEditProfile
