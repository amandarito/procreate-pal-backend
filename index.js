// for now, this runs on localhost:3001
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

import * as converter from './converter.js'

// [ ] make this return an array of hex codes (strings)
app.post('/api/preview', (request, response) => {
  response.send('preview')
})

// [ ] do validation here so I can throw errors
app.post('/api/convert', async (request, response) => {
  try {
    const data = request.body
    const isValid = converter.validateUrl(data.url)
    console.log(isValid)
    const handler = converter.getHandler(data.url)
    console.log(handler)
    const palette = await converter.convert(data.source, data.url)
    response.json(palette)
  } catch (error) {
    response.status(400).json({ status: 'error', message: error.message })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
