'use client'

import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

const Home = () => {
  const autoScrollRef: any = useRef(null)
  const [prompt, setPrompt] = useState('')
  const [gptResponse, setGptResponse] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  useEffect(() => {
    autoScrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [gptResponse])

  const onSendPrompt = () => {
    if (!prompt) {
      return
    }

    const es = new EventSource(
      `${process.env.API_ENDPOINT}/gpt-stream?prompt=${prompt}`,
    )

    es.onopen = () => {
      setIsStreaming(true)
    }

    es.onmessage = (event) => {
      setGptResponse((prevValue) => prevValue + event.data)
    }

    es.onerror = (error) => {
      console.error('EventSource failed:', error)
      es.close()
      setIsStreaming(false)
    }
  }

  return (
    <Box h="100vh" w="full" bg="bg.700" p={10} >
      <Box maxWidth="container.xl" mx="auto">
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
                if (gptResponse) {
                  setGptResponse('')
                }
              }}
              borderColor="bg.800"
              noOfLines={5}
              bg="white"
            ></Textarea>
            <Button
              onClick={onSendPrompt}
              isDisabled={isStreaming}
              colorScheme="teal"
              alignSelf="flex-end"
            >
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
              {/* <Box h={4} w={2} bg="text.800" display="inline-block"/> */}
              <div ref={autoScrollRef}></div>
            </Box>
          </VStack>
        </VStack>
      </Box>
    </Box>
  )
}

export default Home
