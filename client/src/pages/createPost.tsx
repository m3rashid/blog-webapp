import React from 'react'
import { nanoid } from 'nanoid'
import { useRecoilState } from 'recoil'
import { Box, Button, createStyles, Group } from '@mantine/core'

import { postAtom, PostType } from '../atoms/post'
import PageWrapper from '../components/pageWrapper'
import TitleSlug from '../components/post/titleSlug'
import ChooseTypeButton from '../components/post/select'
import ShowRender from '../components/post/showRender'

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
  const [data, setData] = useRecoilState(postAtom)
  const [type, setType] = React.useState<PostType>('text')
  const [postTitle, setPostTitle] = React.useState('')
  const [postSlug, setPostSlug] = React.useState('')

  const { classes } = useStyles()

  const saveAndPublish = () => {
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

      <Group style={{ alignItems: 'flex-end' }}>
        <ChooseTypeButton value={type} setValue={setType} labelType="new" />
        <Button onClick={handleAddSection}>Add Section</Button>
      </Group>

      <ShowRender data={data} />
    </PageWrapper>
  )
}

export default CreatePost
