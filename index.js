// for now, this runs on localhost:3001.
const express = require('express')
const app = express()

app.use(express.json())

let colors = ['#FF9CC9', '#F97373', '#FFAA00', '#EEEE33', '#99CC44', '#32C29C']

app.get('/api/colors', (request, response) => {
  response.json(colors)
})

app.post('/api/preview', (request, response) => {
  response.send('preview')
})

app.post('/api/convert', (request, response) => {
  const note = request.body
  console.log(note)
  response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
