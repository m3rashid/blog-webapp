import { Avatar, Box, Title } from '@mantine/core'
import React from 'react'

import { IAuthor } from '../types'

interface IProps {}

const Author: React.FC<IProps> = () => {
  const author = {
    photo: { url: '' },
    name: 'Author',
  }

  return (
    <>
      <Box>
        <Avatar size="xl" src={author.photo.url} mb={4} />
        <Title order={3}>{author.name}</Title>
      </Box>
    </>
  )
}

export default Author
