const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors())

app.get('/api/timetable', async (_, res) => {

  const day = new Date().getDay()
  await axios.get('https://anissia.net/api/anime/schedule/0').then( resp => res.send(resp.data) )
})

app.listen(port, () => { console.log(`http://localhost:${port}/`) })