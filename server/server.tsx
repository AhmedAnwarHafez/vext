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
function broadcast(
  data: string,
  { ws, excludeSelf = false }: { ws: WebSocket; excludeSelf: boolean }
) {
  wss.clients.forEach((client) => {
    if (
      client.readyState === WebSocket.OPEN &&
      (!excludeSelf || client !== ws)
    ) {
      client.send(data, { binary: false })
    }
  })
}

wss.on('connection', (ws) => {
  console.log('connected')

  broadcast(<MemberJoined memberName={randomName()} />, {
    ws,
    excludeSelf: true,
  })
  ws.on('message', (data) => {
    const message = JSON.parse(data.toString())
    console.log('received: %s', message.chat_message)

    broadcast(<Notification message={message.chat_message} />, {
      ws,
      excludeSelf: false,
    })
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
