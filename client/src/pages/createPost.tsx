import React from 'react'
import { Box, Button, createStyles, Textarea } from '@mantine/core'

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

const CreatePost: React.FC<IProps> = () => {
  const { classes } = useStyles()
  const [text, setText] = React.useState('### Write something here in markdown')

  const saveAndPublish = () => {
    console.log(text)
  }

  const saveAsDraft = () => {}

  return (
    <PageWrapper>
      <Box className={classes.buttonTop}>
        <Button onClick={saveAndPublish}>Save and Publish</Button>
        <Button onClick={saveAsDraft}>Save as draft</Button>
      </Box>
      <CreateOrEditPost text={text} setText={setText} />
    </PageWrapper>
  )
}

export default CreatePost
