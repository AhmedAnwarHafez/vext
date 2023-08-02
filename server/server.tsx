import * as Path from 'node:path'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import * as elements from 'typed-html'

import { Layout } from './Layout.tsx'

const app = express()
const server = http.createServer(app)
const io = new Server(server)
export default server

const publicFolder = Path.resolve('public')
app.use(express.static(publicFolder))
app.use(express.urlencoded({ extended: false }))

io.on('connection', (socket) => {
  console.log('a user connected')
})

app.get('/', (req, res) => {
  res.send(<Layout>hi</Layout>)
})
