import {
  Box,
  Button,
  Checkbox,
  createStyles,
  Paper,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import React from 'react'
import { AlphabetLatin } from 'tabler-icons-react'

const useStyles = createStyles((theme) => ({
  input: {
    fontFamily: theme.fontFamily,
    input: {},
  },
}))

interface IProps {
  slug: string
}

interface IComment {
  name: string
  comment: string
  remember: boolean
}

const CreateComment: React.FC<IProps> = ({ slug }) => {
  const { classes } = useStyles()

  const [comment, setComment] = React.useState<IComment>({
    name: window.localStorage.getItem('myName') || '',
    comment: '',
    remember: true,
  })

  const handleAddComment = async () => {}

  return (
    <Paper shadow="xs" radius="md" p={20}>
      <Title
        sx={(theme) => ({ fontFamily: theme.fontFamily, marginBottom: '10px' })}
        order={3}
      >
        Create Comment
      </Title>
      <SimpleGrid>
        <TextInput
          name="name"
          label="Enter your name"
          value={comment.name}
          required
          icon={<AlphabetLatin />}
          className={classes.input}
          onChange={(e) =>
            setComment((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Enter your name"
        />
        <Checkbox
          checked={comment.remember}
          onChange={(e) =>
            setComment((prev) => ({ ...prev, remember: e.target.checked }))
          }
          label="Remember my name for the next time"
        />
        <Textarea
          minRows={6}
          value={comment.comment}
          onChange={(e) =>
            setComment((prev) => ({ ...prev, comment: e.target.value }))
          }
          required
          label="Enter your comment"
          placeholder="Enter your comment (markdown supported)"
        />
        {comment.comment.length > 0 && (
          <Box
            my={10}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked(comment.comment)),
            }}
          />
        )}
        <Button onClick={handleAddComment}>Add Comment</Button>
      </SimpleGrid>
    </Paper>
  )
}

export default CreateComment
