const express = require('express')
const mongoose = require('./db/mongoose')
const router = require('./route')

const app = express()

const port = process.env.PORT || 3000


app.use(express.json())
app.use(router)



app.listen(port, function() {
  console.log('Server up and running on port ' + port)
})