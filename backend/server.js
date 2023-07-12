import dotenv from 'dotenv'

// env config
dotenv.config({ path: '.env' })

import express from 'express'
import cors from 'cors'

import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
})

const openai = new OpenAIApi(configuration)

// Initialize Express App
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, Welcome to Streaming Server!')
})

app.get('/gpt-stream', async (req, res) => {

  res.setHeader('Content-Type', 'text/event-stream');

  try {
    const prompt = req.query.prompt
    if (!prompt) return res.send(400).json({ message: 'Invalid Prompt' })

    const response = await openai.createCompletion(
      {
        model: 'text-davinci-003',
        prompt: `${prompt}. Note the response should be in html format with styles and bold the text when ever required in the response.`,
        max_tokens: 2000,
        top_p: 1,
        temperature: 0.1,
        stream: true,
      },
      { responseType: 'stream' },
    )

    response.data.on('data', (data) => {
      const line = data.toString().trim().split('data: ')[1]

      if (line.trim() !== '[DONE]') {
        const parsedResponse = JSON.parse(line)
        res.write(`data: ${parsedResponse.choices[0].text}\n\n`)
        
      }
    })
 
    response.data.on('end', () => {
      return res.end()
    })

    response.data.on('error', (err) => {
      return res.status(500).json({ message: 'Something Went Wrong', err })
    })
  } catch (err) {
    return res.send(500).json({ message: 'Something Went Wrong', err })
  }
})

const server = app.listen(port, () => {
  console.log(`✅ Server Initiated in Port: ${port} 😎`);
})

// Handle Unhandled rejections
process.on('unhandledRejection', (err) => {
  server.close(() => process.exit(1))
})

// Handle Unhandled rejections
process.on('uncaughtExpection', (err) => {
  server.close(() => process.exit(1))
})
