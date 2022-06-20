import React from 'react'
import { Box, Button, createStyles } from '@mantine/core'

import PageWrapper from '../components/globals/pageWrapper'
import TitleSlug from '../components/post/titleSlug'
// import { PostType } from '../atoms/post'
import { useRecoilValue } from 'recoil'
import { authAtom } from '../atoms/auth'
import { useNavigate } from 'react-router-dom'
// const CreateOrEditPost = React.lazy(
//   () => import('../components/post/createOrEditPost')
// )

const useStyles = createStyles((theme) => ({
  buttonTop: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexDirection: 'row-reverse',
  },
}))

interface IProps {}

const EditPost: React.FC<IProps> = () => {
  const user = useRecoilValue(authAtom)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/auth')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const [type, setType] = React.useState<PostType>('text')

  // get post on load from post slug
  // const post: any = []
  const [postTitle, setPostTitle] = React.useState('')
  const [postSlug, setPostSlug] = React.useState('')

  const { classes } = useStyles()
  const moveToDraft = () => {}
  const handlePublish = () => {}

  return (
    <PageWrapper>
      <Box className={classes.buttonTop}>
        <Button onClick={moveToDraft}>Move to draft</Button>
        <Button onClick={handlePublish}>Save and Publish</Button>
      </Box>

      <TitleSlug {...{ postTitle, setPostTitle, postSlug, setPostSlug }} />

      {/* <CreateOrEditPost /> */}
    </PageWrapper>
  )
}

export default EditPost
