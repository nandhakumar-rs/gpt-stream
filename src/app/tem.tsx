'use client'

import {
  Box,
  Button,
  Image,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

const Home = () => {
  const [prompt, setPrompt] = useState('')
  const [gptResponse, setGptResponse] = useState('')

  return (
    <Box
      h="100vh"
      w="full"
      bg="bg.700"
      p={10}
      maxWidth="container.xl"
      mx="auto"
    >
      <Image src="/logo.png" width={241} height={42} />

      <VStack mt={20} maxWidth="container.md" mx="auto">
        <VStack w="full" alignItems="flex-start">
          <Text fontSize="xl" fontWeight="semibold">
            Prompt
          </Text>
          <Textarea
            value={prompt}
            onChange={(event) => {
              setPrompt(event.target.value)
            }}
            borderColor="bg.800"
            noOfLines={5}
            bg="white"
          ></Textarea>
          <Button colorScheme="teal" alignSelf="flex-end">
            Send
          </Button>
        </VStack>

        <VStack w="full" alignItems="flex-start" mt={10}>
          <Text fontSize="xl" fontWeight="semibold">
            Response From GPT
          </Text>
          <Box
            borderColor="bg.800"
            borderRadius={'0.375rem'}
            borderWidth={1}
            bg="white"
            h="30rem"
            w="full"
            p={4}
            overflowY="scroll"
          >
            <Text dangerouslySetInnerHTML={{ __html: gptResponse }}></Text>
          </Box>
        </VStack>
      </VStack>
    </Box>
  )
}

export default Home
