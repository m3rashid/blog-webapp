import { createStyles, Group, Paper, TextInput } from '@mantine/core'
import React from 'react'
import { Article, Webhook } from 'tabler-icons-react'

const useStyles = createStyles((theme) => ({
  buttonTop: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexDirection: 'row-reverse',
  },
  input: {
    flexGrow: 1,
  },
}))

interface IProps {
  postTitle: string
  postSlug: string
  setPostTitle: React.Dispatch<React.SetStateAction<string>>
  setPostSlug: React.Dispatch<React.SetStateAction<string>>
}

const TitleSlug: React.FC<IProps> = ({
  postSlug,
  postTitle,
  setPostSlug,
  setPostTitle,
}) => {
  const { classes } = useStyles()

  return (
    <Paper shadow="xs" p="md" style={{ marginBottom: '30px' }}>
      <Group>
        <TextInput
          name="postTitle"
          value={postTitle}
          required
          icon={<Article />}
          className={classes.input}
          onChange={(e: any) => setPostTitle(e.target.value)}
          placeholder="Enter Post title"
        />
        <TextInput
          name="postSlug"
          value={postSlug}
          required
          icon={<Webhook />}
          className={classes.input}
          onChange={(e: any) => setPostSlug(e.target.value)}
          placeholder="Enter Post slug"
        />
      </Group>
    </Paper>
  )
}

export default TitleSlug