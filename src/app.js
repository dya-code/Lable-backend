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
    let genre = ''
    let time = ''
    let start_date = ''
    let website = ''

    time = response[i].time
    start_date = response[i].startDate
    website = response[i].website

    await laftel.search(response[i].subject).then(result => {
      img = result.results[0].img
      genre = result.results[0].genres

    })

    arr.push({ title, img, genre, time, start_date, website })
  }
  
  res.send(arr)
})

app.listen(port, () => { console.log(`http://localhost:${port}/`) })