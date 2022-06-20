import React from 'react'
import { Box, Button, createStyles, Group, Textarea } from '@mantine/core'

import { useRecoilState } from 'recoil'
import ChooseTypeButton from './select'
import { ICreatePost, postAtom, PostType } from '../../atoms/post'
import { deepClone } from '../utils'

const useStyles = createStyles((theme) => ({
  textboxContainer: {
    marginBottom: '30px',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[1]
        : theme.colors.dark[5],
  },
  textBox: {
    marginBottom: '10px',
    textarea: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}))

interface IProps {
  id: string
}

const CreateOrEditPost: React.FC<IProps> = ({ id }) => {
  const [data, setData] = useRecoilState(postAtom)

  const concerned = data.find((section) => section.id === id)
  const [content, setContent] = React.useState(concerned?.content || '')

  const { classes } = useStyles()

  const setType = (val: PostType) => {
    setData((prev) => {
      const newData = deepClone<ICreatePost>(prev)
      const index = newData.findIndex((section) => section.id === id)
      newData[index].type = val
      return newData
    })
  }

  // sync global state with local state
  React.useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = deepClone<ICreatePost>(prev)
        return newData.map((section) => {
          if (section.id === id) {
            section.content = content
          }
          return section
        })
      })
    }, 50)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleRemoveThisBox = () => {
    setData((prev) => {
      const newData = [...prev]
      const newSection = newData.find((section) => section.id === id)
      if (newSection) {
        newData.splice(newData.indexOf(newSection), 1)
      }
      return newData
    })
  }

  return (
    <>
      <Group
        style={{
          marginBottom: '5px',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <ChooseTypeButton
          labelType="change"
          value={concerned?.type || 'text'}
          setValue={setType}
          showLabel={false}
        />
        <Button
          style={{ flexGrow: 1 }}
          onClick={handleRemoveThisBox}
          sx={(theme) => ({ backgroundColor: theme.colors.red[6] })}
        >
          Remove Section
        </Button>
      </Group>
      <Box className={classes.textboxContainer}>
        <Textarea
          minRows={10}
          value={content}
          className={classes.textBox}
          onChange={handleChange}
        />
      </Box>
    </>
  )
}

export default CreateOrEditPost
