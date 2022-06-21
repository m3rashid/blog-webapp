import React from 'react'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import {
  BrandFacebook,
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
  BrandYoutube,
  World,
} from 'tabler-icons-react'
import {
  Anchor,
  Avatar,
  Box,
  Group,
  Loader,
  Paper,
  Text,
  Title,
} from '@mantine/core'

import { authAtom } from '../atoms/auth'
import PageWrapper from '../components/globals/pageWrapper'
import { useSafeApiCall } from '../api/safeApiCall'
import { IAuthor } from '../types'

interface IProps {}

const AuthorProfile: React.FC<IProps> = () => {
  const user = useRecoilValue(authAtom)
  const navigate = useNavigate()
  const { safeApiCall } = useSafeApiCall()
  const [authorDetails, setAuthorDetails] = React.useState<IAuthor>()

  const handleGetAuthor = async () => {
    const res = await safeApiCall({
      body: {
        authorId: user.user.profile,
      },
      endpoint: '/author/get-details',
      notif: { id: 'get-author-details' },
    })

    if (!res) return
    setAuthorDetails(res.data)
  }

  React.useEffect(() => {
    // handle this afterwards
    if (!user.isAuthenticated || !user.user.profile) {
      navigate('/auth')
    }
    handleGetAuthor().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isAuthenticated])

  if (!authorDetails) {
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Group style={{ gap: 50, marginBottom: '20px' }}>
          <Avatar src={authorDetails.avatar} size={200} radius={100} />
          <Box>
            <Box>
              <Title sx={(theme) => ({ fontFamily: theme.fontFamily })}>
                {authorDetails.name}
              </Title>
              <Text style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                @{authorDetails.slug}
              </Text>
            </Box>
            <Box
              my={10}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked(authorDetails.bio)),
              }}
            />
            <Text>
              Joined on : &nbsp;
              {dayjs(authorDetails.createdAt).format('dddd, DD MMMM YYYY')}
            </Text>
            <Text>
              Last Updated on: &nbsp;
              {dayjs(authorDetails.updatedAt).format('dddd, DD MMMM YYYY')}
            </Text>
            <Group style={{ marginTop: '20px' }}>
              {authorDetails.website && (
                <Anchor<'a'> href={authorDetails.website} target="_blank">
                  <World />
                </Anchor>
              )}
              {authorDetails.linkedinUrl && (
                <Anchor<'a'>
                  href={`https://linkedin.com/in/${authorDetails.linkedinUrl}`}
                  target="_blank"
                >
                  <BrandLinkedin />
                </Anchor>
              )}
              {authorDetails.githubUrl && (
                <Anchor<'a'>
                  href={`https://github.com/${authorDetails.githubUrl}`}
                  target="_blank"
                >
                  <BrandGithub />
                </Anchor>
              )}
              {authorDetails.twitterUrl && (
                <Anchor<'a'>
                  href={`https://twitter.com/${authorDetails.twitterUrl}`}
                  target="_blank"
                >
                  <BrandTwitter />
                </Anchor>
              )}
              {authorDetails.youtubeUrl && (
                <Anchor<'a'> href={authorDetails.youtubeUrl} target="_blank">
                  <BrandYoutube />
                </Anchor>
              )}
              {authorDetails.instagramUrl && (
                <Anchor<'a'>
                  href={`https://instagram.com/${authorDetails.instagramUrl}`}
                  target="_blank"
                >
                  <BrandInstagram />
                </Anchor>
              )}
              {authorDetails.facebookUrl && (
                <Anchor<'a'> href={authorDetails.facebookUrl} target="_blank">
                  <BrandFacebook />
                </Anchor>
              )}
            </Group>
          </Box>
        </Group>
      </Paper>
    </PageWrapper>
  )
}

export default AuthorProfile
