import React from 'react'
import { nanoid } from 'nanoid'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  Box,
  Button,
  createStyles,
  Group,
  Paper,
  Switch,
  Title,
} from '@mantine/core'

import { authAtom } from '../atoms/auth'
import { useNavigate } from 'react-router-dom'
import { postAtom, PostType } from '../atoms/post'
import { useSafeApiCall } from '../api/safeApiCall'
import TitleSlug, { IPostMeta } from '../components/post/titleSlug'
import ShowRender from '../components/post/showRender'
import ChooseTypeButton from '../components/post/select'
import PageWrapper from '../components/globals/pageWrapper'
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
  switch: {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: '10px',
    padding: '0 10px',
  },
  switchInput: {
    fontSize: '0.7rem',
  },
  switchLabel: {
    padding: 0,
    fontWeight: 600,
  },
}))

interface IProps {}

const CreatePost: React.FC<IProps> = () => {
  const user = useRecoilValue(authAtom)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/auth')
    } else if (!user.user.profile) {
      navigate('/author/me/create')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isAuthenticated])

  const [data, setData] = useRecoilState(postAtom)
  const [type, setType] = React.useState<PostType>('text')
  const [publish, setPublish] = React.useState(true)

  const postMetaInitialState: IPostMeta = React.useMemo(
    () => ({
      title: '',
      slug: '',
      bannerImageUrl: '',
      categories: [],
    }),
    []
  )

  const [postMeta, setPostMeta] =
    React.useState<IPostMeta>(postMetaInitialState)

  const { classes } = useStyles()
  const { safeApiCall } = useSafeApiCall()

  const saveAndPublish = async () => {
    const res = await safeApiCall({
      body: {
        title: postMeta.title,
        slug: postMeta.slug,
        data: data,
        bannerImageUrl: postMeta.bannerImageUrl,
        author: user.user.profile,
        categories: postMeta.categories,
        published: publish,
      },
      endpoint: '/post/create',
      notif: { id: 'create-post' },
    })

    if (!res) return
    setPostMeta(postMetaInitialState)
    setData([])
  }

  const handleAddSection = () => {
    setData((prev) => [...prev, { id: nanoid(), type: type, content: '' }])
  }

  return (
    <PageWrapper>
      <Box className={classes.buttonTop}>
        <Button onClick={saveAndPublish}>
          Save {publish ? ' and Publish' : ' as draft'}
        </Button>
        <Switch
          classNames={{
            root: classes.switch,
            input: classes.switchInput,
            label: classes.switchLabel,
          }}
          size="lg"
          checked={publish}
          onLabel="ON"
          offLabel="OFF"
          label="Publish"
          onChange={(e) => setPublish(e.currentTarget.checked)}
        />
      </Box>

      <TitleSlug postMeta={postMeta} setPostMeta={setPostMeta} />

      {data.map((section) => (
        <CreateOrEditPost key={section.id} id={section.id} />
      ))}

      <Paper
        shadow="xs"
        p="md"
        style={{ paddingTop: '40px', paddingBottom: '40px' }}
      >
        <Group style={{ alignItems: 'flex-end' }}>
          <ChooseTypeButton value={type} setValue={setType} labelType="new" />
          <Button onClick={handleAddSection}>Add Section</Button>
        </Group>
      </Paper>

      {data.length !== 0 && (
        <>
          <Box style={{ marginTop: '30px', marginBottom: '10px' }}>
            <Title sx={(theme) => ({ fontFamily: theme.fontFamily })}>
              Rendered Post
            </Title>
          </Box>

          <Paper
            shadow="xs"
            p="xs"
            style={{ paddingTop: '40px', paddingBottom: '40px' }}
          >
            <ShowRender data={data} />
          </Paper>
        </>
      )}
    </PageWrapper>
  )
}

export default CreatePost
