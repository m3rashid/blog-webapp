import React from 'react'
import {
  Box,
  Button,
  Group,
  Paper,
  Switch,
  TextInput,
  Title,
} from '@mantine/core'

import PageWrapper from '../components/globals/pageWrapper'
import { PostType } from '../atoms/post'
import { useRecoilState, useRecoilValue } from 'recoil'
import { authAtom } from '../atoms/auth'
import { useNavigate, useParams } from 'react-router-dom'
import { useSafeApiCall } from '../api/safeApiCall'
import { postAtom } from '../atoms/post'
import { useStyles } from './createPost'
import { nanoid } from 'nanoid'
import ChooseTypeButton from '../components/post/select'
import ShowRender from '../components/post/showRender'
import { Article, Photo } from 'tabler-icons-react'
const CreateOrEditPost = React.lazy(
  () => import('../components/post/createOrEditPost')
)

interface IProps {}

const EditPost: React.FC<IProps> = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { safeApiCall, loading } = useSafeApiCall()
  const user = useRecoilValue(authAtom)
  const [data, setData] = useRecoilState(postAtom)
  const [postData, setPostData] = React.useState({
    title: '',
    publish: true,
    slug: '',
    postId: '',
    bannerImageUrl: '',
  })

  const getPost = async () => {
    const res = await safeApiCall({
      endpoint: '/post/details',
      body: { slug },
      notif: { id: 'get-post' },
    })
    if (!res) return
    setData(res.data.data)
    setPostData({
      postId: res.data._id,
      slug: res.data.slug,
      publish: res.data.published,
      title: res.data.title,
      bannerImageUrl: res.data.bannerImageUrl,
    })
  }

  React.useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/auth', { replace: true })
      return
    }
    getPost().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isAuthenticated])

  const [type, setType] = React.useState<PostType>('text')
  const { classes } = useStyles()

  const saveAndPublish = async () => {
    const res = await safeApiCall({
      body: {
        data: data,
        postId: postData.postId,
        published: postData.publish,
        title: postData.title,
        bannerImageUrl: postData.bannerImageUrl,
      },
      endpoint: '/post/edit',
      notif: { id: 'edit-post', show: true },
    })
    if (!res) return
    setData([])
  }

  const handleAddSection = () => {
    setData((prev) => [...prev, { id: nanoid(), type: type, content: '' }])
  }

  return (
    <PageWrapper>
      <Box className={classes.buttonTop}>
        <Button onClick={saveAndPublish} loading={loading}>
          Save {postData.publish ? ' and Publish' : ' as draft'}
        </Button>
        <Switch
          classNames={{
            root: classes.switch,
            input: classes.switchInput,
            label: classes.switchLabel,
          }}
          size="lg"
          checked={postData.publish}
          onLabel="ON"
          offLabel="OFF"
          label="Publish"
          onChange={(e) =>
            setPostData((prev) => ({ ...prev, publish: e.target.checked }))
          }
        />
      </Box>

      <Paper
        shadow="xs"
        p="md"
        style={{
          marginBottom: '30px',
          paddingTop: '40px',
          paddingBottom: '40px',
        }}
      >
        <TextInput
          name="title"
          value={postData.title}
          required
          icon={<Article />}
          className={classes.input}
          onChange={(e) =>
            setPostData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter Post title"
        />
        <TextInput
          name="bannerImageUrl"
          value={postData.bannerImageUrl}
          required
          icon={<Photo />}
          className={classes.input}
          style={{ marginTop: '15px' }}
          onChange={(e) =>
            setPostData((prev) => ({ ...prev, bannerImageUrl: e.target.value }))
          }
          placeholder="Enter banner image Url"
        />
      </Paper>

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

export default EditPost
