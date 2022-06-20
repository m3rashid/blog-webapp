import React from 'react'
import { nanoid } from 'nanoid'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Box, Button, createStyles, Group, Paper, Title } from '@mantine/core'

import { authAtom } from '../atoms/auth'
import { useNavigate } from 'react-router-dom'
import { postAtom, PostType } from '../atoms/post'
import { useSafeApiCall } from '../api/safeApiCall'
import TitleSlug from '../components/post/titleSlug'
import ShowRender from '../components/post/showRender'
import ChooseTypeButton from '../components/post/select'
import PageWrapper from '../components/globals/pageWrapper'
const CreateOrEditPost = React.lazy(
  () => import('../components/post/createOrEditPost')
)

const useStyles = createStyles((theme) => ({
  buttonTop: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexDirection: 'row-reverse',
  },
  input: {
    flexGrow: 1,
    input: {
      borderWidth: '1px',
      borderColor: theme.colors.cyan[7],
    },
  },
}))

interface IProps {}

const CreatePost: React.FC<IProps> = () => {
  const user = useRecoilValue(authAtom)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/auth')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [data, setData] = useRecoilState(postAtom)
  const [type, setType] = React.useState<PostType>('text')
  const [postTitle, setPostTitle] = React.useState('')
  const [postSlug, setPostSlug] = React.useState('')

  const { classes } = useStyles()
  const { safeApiCall } = useSafeApiCall()

  const saveAndPublish = async () => {
    console.log({ data, postTitle, postSlug })
  }

  const saveAsDraft = () => {
    console.log({ data, postTitle, postSlug })
  }

  const handleAddSection = () => {
    setData((prev) => [...prev, { id: nanoid(), type: type, content: '' }])
  }

  return (
    <PageWrapper>
      <Box className={classes.buttonTop}>
        <Button onClick={saveAndPublish}>Save and Publish</Button>
        <Button onClick={saveAsDraft}>Save as draft</Button>
      </Box>

      <TitleSlug {...{ postTitle, setPostTitle, postSlug, setPostSlug }} />

      {data.map((section) => (
        <CreateOrEditPost key={section.id} id={section.id} />
      ))}

      <Paper shadow="xs" p="md">
        <Group style={{ alignItems: 'flex-end' }}>
          <ChooseTypeButton value={type} setValue={setType} labelType="new" />
          <Button onClick={handleAddSection}>Add Section</Button>
        </Group>
      </Paper>

      <Paper shadow="xs" p="xs" style={{ marginTop: '30px' }}>
        <ShowRender data={data} />
      </Paper>
    </PageWrapper>
  )
}

export default CreatePost
