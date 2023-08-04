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

wss.on('connection', (ws, req) => {
  console.log('connected')

  ws.on('close', () => {
    console.log('disconnected')
    broadcast(ws, 'user left the chat')
  })

  // access the cookie
  const cookie = req.headers.cookie
  // parse cookie
  const userId = cookie?.split('=')[1] || randomName()

  broadcast(
    ws,
    <Notification
      userId={userId}
      message={`Your user id is ${userId}`}
      isSelf={ws === ws}
    />
  )
  broadcast(ws, <MemberJoined memberName={userId} />)
  broadcast(
    ws,
    <div id="participants" class="text-center top-1">
      {wss.clients.size} are online
    </div>
  )

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString())
    console.log('received: %s', message.chat_message)

    wss.clients.forEach((client) => {
      // Send the message to all clients except the sender
      if (client.readyState === WebSocket.OPEN) {
        broadcast(
          client,
          <Notification
            userId={userId}
            message={message.chat_message}
            isSelf={ws === client}
          />
        )
      }
    })
  })
})

app.get('/', (req, res) => {
  // check if cookie exists
  const cookie = req.headers.cookie
  if (!cookie) {
    // genereate a new cookie for each request
    res.setHeader('Set-Cookie', `userId=${randomName()}; HttpOnly; Path=/`)
  }

  res.send(
    <Layout>
      <div class="flex flex-col gap-4 h-screen">
        <div id="participants"></div>
        <div id="messages" class="overflow-auto h-3/4">
          <div id="notifications"></div>
        </div>
      </div>
      <div class="p-4 fixed bottom-0 w-1/2 flex justify-center">
        <Form />
      </div>
    </Layout>
  )
})

export default app
