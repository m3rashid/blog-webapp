import React from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark-dimmed.css'
import { Box, Code, createStyles } from '@mantine/core'

import { ICreatePost } from '../../atoms/post'

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: (code: string, lang: string) => {
    return hljs.highlightAuto(code, [lang]).value
  },
})

const useStyles = createStyles((theme) => ({
  background: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '20px',
    margin: '40px 0',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[1]
        : theme.colors.dark[5],
  },
  contentBox: {
    padding: '0 5px',
  },
}))

interface IProps {
  data: ICreatePost[]
}

const ShowRender: React.FC<IProps> = ({ data }) => {
  const { classes } = useStyles()
  return (
    <Box className={classes.background}>
      {data.map((section) => {
        const render = (
          <Box
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked(section.content || '')),
            }}
          />
        )

        if (section?.type === 'code') {
          return (
            <Code
              key={section.id}
              style={{
                padding: '10px 5px',
                marginTop: '10px',
                marginBottom: '10p',
                width: '100%',
              }}
            >
              {render}
            </Code>
          )
        } else if (section?.type === 'text') {
          return (
            <Box key={section.id} className={classes.contentBox}>
              {render}
            </Box>
          )
        } else return null
      })}
    </Box>
  )
}

export default ShowRender
