import { Box, Group, Header, Image, Text, Title } from '@mantine/core'
import React from 'react'

interface IProps {}

const Hero: React.FC<IProps> = () => {
  return (
    <Group
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}
    >
      <Box
        style={{
          flex: 1,
        }}
      >
        <Title order={2}>
          <Text component="span" style={{ textAlign: 'center' }}>
            Cubicle
          </Text>
          <br />
          <Text
            component="span"
            style={{ textAlign: 'center' }}
            color="cyan.400"
          >
            Welcomes you
          </Text>
        </Title>
        <Text>
          Cubicle is an online portal for techies which mainly focuses on the
          life of programmers in general. It also features coding tips, tricks
          and motivation
        </Text>
      </Box>
      <Image alt="Login Image" fit="cover" src="/hero.svg" />
    </Group>
  )
}

export default Hero
