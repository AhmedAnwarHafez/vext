import * as Path from 'node:path'

import express from 'express'

const server = express()
export default server

const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

server.get('/', (req, res) => {
  res.send('Hello world')
})
