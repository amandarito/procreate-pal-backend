// for now, this runs on localhost:3001
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

import * as converter from './converter.js'

// [ ] make better errors so it's not always 400
app.post('/api/preview', async (request, response) => {
  try {
    const data = request.body
    const isValid = converter.validateUrl(data.url)
    console.log(isValid)
    const handler = converter.getHandler(data.url)
    console.log(handler)
    const colors = await handler(data.url)
    console.log(colors)
    response.json({ colors: colors })
  } catch (error) {
    response.status(400).json({ status: 'error', message: error.message })
  }
})

app.post('/api/convert', async (request, response) => {
  try {
    const data = request.body
    const isValid = converter.validateUrl(data.url)
    console.log(isValid)
    const handler = converter.getHandler(data.url)
    console.log(handler)
    const colors = await handler(data.url)
    console.log(colors)
    const palette = await converter.hexToProcreate(colors)
    response.json({ palette: palette })
  } catch (error) {
    response.status(400).json({ status: 'error', message: error.message })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
