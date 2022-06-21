import {
  Box,
  Button,
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import React from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import {
  BrandFacebook,
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
  BrandYoutube,
  User,
  Webhook,
  World,
} from 'tabler-icons-react'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'

import { authAtom } from '../atoms/auth'
import PageWrapper from '../components/globals/pageWrapper'
import { useSafeApiCall } from '../api/safeApiCall'
import { showNotification } from '@mantine/notifications'
import { IAuthor } from '../types'

const useStyles = createStyles((theme) => ({
  input: {
    flexGrow: 1,
    fontFamily: theme.fontFamily,
    input: {},
  },
}))

interface IProps {}

const CreateEditProfile: React.FC<IProps> = () => {
  const [auth, setAuth] = useRecoilState(authAtom)
  const navigate = useNavigate()

  const { classes } = useStyles()

  React.useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth')
    }
    if (auth.user.profile) {
      navigate('/author/me/edit')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated])

  const initialState: IAuthor = React.useMemo(
    () => ({
      name: '',
      slug: '',
      bio: '',
      avatar: '',
      website: '',
      githubUrl: '',
      twitterUrl: '',
      facebookUrl: '',
      instagramUrl: '',
      linkedinUrl: '',
      youtubeUrl: '',
    }),
    []
  )

  const [authorData, setAuthorData] = React.useState<IAuthor>(initialState)

  const { safeApiCall, loading } = useSafeApiCall()

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setAuthorData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAuthor = async () => {
    if (
      !authorData.name ||
      !authorData.slug ||
      !authorData.bio ||
      !authorData.avatar
    ) {
      showNotification({
        title: 'Error',
        message: 'Please fill the required fields',
      })
      return
    }
    const res = await safeApiCall({
      body: authorData,
      endpoint: '/author/create',
      notif: { id: 'create-author', show: true },
    })
    if (!res) return
    setAuthorData(initialState)
    setAuth((prev) => ({
      ...prev,
      user: res.data.author._id,
    }))
    console.log(res.data)
  }

  return (
    <PageWrapper>
      <Paper withBorder shadow="xs" p={30} mt={30} radius="md">
        <Title
          align="center"
          className={classes.input}
          style={{ marginBottom: '30px' }}
        >
          Complete Author Profile
        </Title>
        <SimpleGrid>
          <Group>
            <TextInput
              name="name"
              label="Enter your name"
              value={authorData.name}
              required
              icon={<User />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter your Name"
            />
            <TextInput
              name="slug"
              label="Enter your pen name (unique)"
              value={authorData.slug}
              required
              icon={<Webhook />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter a slug for your profile"
            />
          </Group>
          <Textarea
            name="bio"
            label="Describe yourself"
            minRows={5}
            value={authorData.bio}
            required
            className={classes.input}
            onChange={handleChange}
            placeholder="Enter your bio (introduction)"
          />
          <Box
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked(authorData.bio)),
            }}
          />
          <Group>
            <TextInput
              name="avatar"
              label="Enter your avatar URL"
              value={authorData.avatar}
              required
              icon={<World />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter avatar URL"
            />
            <TextInput
              name="website"
              label="Enter your website URL"
              value={authorData.website}
              icon={<World />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter your personal portfolio website URL"
            />
          </Group>
          <TextInput
            name="linkedinUrl"
            label="Enter your linkedin username"
            value={authorData.linkedinUrl}
            icon={<BrandLinkedin />}
            className={classes.input}
            onChange={handleChange}
            placeholder="Enter linkedin username"
          />
          <Group>
            <TextInput
              name="githubUrl"
              label="Enter your github username"
              value={authorData.githubUrl}
              icon={<BrandGithub />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter your github username"
            />
            <TextInput
              name="twitterUrl"
              label="Enter your twitter username"
              value={authorData.twitterUrl}
              icon={<BrandTwitter />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter Twitter username"
            />
          </Group>
          <Group>
            <TextInput
              name="facebookUrl"
              label="Enter your facebook profile URL"
              value={authorData.facebookUrl}
              icon={<BrandFacebook />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter facebook profile URL"
            />
            <TextInput
              name="instagramUrl"
              label="Enter your instagram username"
              value={authorData.instagramUrl}
              icon={<BrandInstagram />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter instagram username"
            />
          </Group>
          <TextInput
            name="youtubeUrl"
            label="Enter your youtube channel URL"
            value={authorData.youtubeUrl}
            icon={<BrandYoutube />}
            className={classes.input}
            onChange={handleChange}
            placeholder="Enter youtube channel URL"
          />
        </SimpleGrid>
        <Group style={{ marginTop: '15px', justifyContent: 'flex-end' }}>
          <Button onClick={handleAddAuthor} loading={loading}>
            Save Author Profile
          </Button>
        </Group>
      </Paper>
    </PageWrapper>
  )
}

export default CreateEditProfile
