const express = require('express')
const app = express()
const axios = require('axios')
const laftel = require('laftel.js')
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors())

app.get('/api/timetable', async (_, res) => {

  let arr = []
  let response = []
  
  const day = new Date().getDay()
  await axios.get('https://anissia.net/api/anime/schedule/' + day).then( resp => response = resp.data )

  for (let i = 0; i < response.length; i++) {
    await laftel.search(response[i].subject).then(result => {
      arr.push(result.results[0].img)
    })
  }
  
  res.send({ response, arr })
})

app.listen(port, () => { console.log(`http://localhost:${port}/\n========================================\n========================================`) })