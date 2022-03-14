const express = require('express')
require('dotenv').config()

const host = process.env.SERVER_HOST
const port = process.env.SERVER_PORT
const app = express()


app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
)