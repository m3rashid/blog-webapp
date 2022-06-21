import { Avatar, Box, Paper, Stack, Text, Title } from '@mantine/core'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import React from 'react'

interface IProps {
  comments: any[]
}

const Comments: React.FC<IProps> = ({ comments }) => {
  return (
    <Paper
      style={{ width: '100%', height: 'min-content' }}
      shadow="xs"
      p="md"
      radius="md"
    >
      <Title order={3} sx={(theme) => ({ fontFamily: theme.fontFamily })}>
        Comments
      </Title>
      <Stack spacing={4} mt={2}>
        {comments.length === 0 ? (
          <Text>No comments yet</Text>
        ) : (
          comments.map((comment) => {
            return (
              <Box key={comment._id}>
                <Avatar />
                <Text>{comment.name}</Text>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(marked(comment.comment)),
                  }}
                />
                <Text>
                  {dayjs(comment.createdAt).format('dddd, DD MMMM YYYY')}
                </Text>
              </Box>
            )
          })
        )}
      </Stack>
    </Paper>
  )
}

export default Comments
