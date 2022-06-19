import React from 'react'
import { Box, Button, createStyles } from '@mantine/core'

import PageWrapper from '../components/pageWrapper'
const CreateOrEditPost = React.lazy(
  () => import('../components/createOrEditPost')
)

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
  const post: any = []
  // get post on load from post slug
  const [text, setText] = React.useState(post || '')

  const { classes } = useStyles()
  const moveToDraft = () => {}
  const handlePublish = () => {}

  return (
    <PageWrapper>
      <Box className={classes.buttonTop}>
        <Button onClick={moveToDraft}>Move to draft</Button>
        <Button onClick={handlePublish}>Save and Publish</Button>
      </Box>
      <CreateOrEditPost text={text} setText={setText} />
    </PageWrapper>
  )
}

export default EditPost
