import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'
import * as elements from 'typed-html'
import WebSocket, { WebSocketServer } from 'ws'

import { MemberJoined, Notification } from './components/notification.tsx'
import { Layout } from './Layout.tsx'
import { randomName } from './fakeNames.ts'
import { Form } from './components/Form.tsx'

const app = express()

const __dirname = Path.dirname(URL.fileURLToPath(import.meta.url))
app.use(express.static(Path.join(__dirname, '../public')))
const wss = new WebSocketServer({ port: 8080 })

// Broadcast function to send messages to all connected clients
function broadcast(ws: WebSocket, data: string) {
  ws.send(data, { binary: false })
}

// Map to store the WebSocket connection with the user ID
const userMap = new WeakMap<WebSocket, string>()

wss.on('connection', (ws) => {
  console.log('connected')

  const userId = randomName()
  userMap.set(ws, userId) // Associate the WebSocket connection with the user ID

  broadcast(ws, <MemberJoined memberName={randomName()} />)

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString())
    console.log('received: %s', message.chat_message)

    broadcast(
      ws,
      <Notification userId={userId} message={message.chat_message} />
    )
  })
})

app.get('/', (req, res) => {
  res.send(
    <Layout>
      <Form />
    </Layout>
  )
})

export default app
