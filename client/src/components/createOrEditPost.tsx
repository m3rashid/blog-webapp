import React from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'
import 'highlight.js/styles/github-dark-dimmed.css'
import { Box, Button, createStyles, Textarea } from '@mantine/core'

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: (code: string, lang: string) => {
    return hljs.highlightAuto(code, [lang]).value
  },
})

const useStyles = createStyles((theme) => ({
  twoColGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '10px',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[1]
        : theme.colors.dark[5],
  },
  textBox: {
    textarea: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}))

interface IProps {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
}

const CreateOrEditPost: React.FC<IProps> = ({ text, setText }) => {
  const { classes } = useStyles()

  return (
    <>
      <Box className={classes.twoColGrid}>
        <Textarea
          minRows={20}
          value={text}
          className={`scrollbar-style ${classes.textBox}`}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <Box
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(text)) }}
        />
      </Box>
    </>
  )
}

export default CreateOrEditPost
