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

  await axios.get('https://anissia.net/api/anime/schedule/' + new Date().getDay()).then( resp => response = resp.data )

  for (let i = 0; i < response.length; i++) {

    let title = response[i].subject
    let img = ''
    await laftel.search(response[i].subject).then(result => {
      img = result.results[0].img
    })

    arr.push({ title, img })
  }
  
  res.send(arr)
})

app.listen(port, () => { console.log(`http://localhost:${port}/\n========================================\n========================================`) })