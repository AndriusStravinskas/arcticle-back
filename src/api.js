const express = require('express')
const cors = require('cors')
const router = require('./router/router')
const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.mongoDB.uri)
.then(() => {
  console.log('DB CONNECTION SUCCESS')
}).catch((err) => {
  console.log(err)
})

const api = express()

api.use(cors())
api.use(express.json())
api.use('/', router)


api.listen(config.server.port, () => {
  console.log(`server is running on: ${config.server.domain}${config.server.port}`);
})