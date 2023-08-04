import express from 'express'
import cookie from 'cookie'
import * as Path from 'node:path'
import * as URL from 'node:url'
import * as elements from 'typed-html'
import WebSocket, { WebSocketServer } from 'ws'
import http from 'http'

import { MemberJoined, Notification } from './components/notification.tsx'
import { Layout } from './Layout.tsx'
import { randomName } from './fakeNames.ts'
import { Form } from './components/Form.tsx'

const app = express()
const server = http.createServer(app)
const __dirname = Path.dirname(URL.fileURLToPath(import.meta.url))
app.use(express.static(Path.join(__dirname, '../public')))
const chatWss = new WebSocketServer({ noServer: true })
const pollWss = new WebSocketServer({ noServer: true })

// Broadcast function to send messages to all connected clients
function broadcast(ws: WebSocket, data: string) {
  ws.send(data, { binary: false })
}

chatWss.on('connection', (ws, req) => {
  ws.on('close', () => {
    console.log('disconnected')
    broadcast(ws, 'user left the chat')
  })

  // access the cookie
  const cookies = cookie.parse(req.headers.cookie || '')
  const userId = cookies.userId || randomName()

  console.log(`${userId} connected`)

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
      {chatWss.clients.size} are online
    </div>
  )

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString())
    console.log('received: %s', data)

    chatWss.clients.forEach((client) => {
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

pollWss.on('connection', (ws, req) => {
  // Handle poll connections
  console.log('poll connected')
})

// Handle the upgrade event to manually handle WebSocket connections
server.on('upgrade', (request, socket, head) => {
  if (request.url === '/chat') {
    chatWss.handleUpgrade(request, socket, head, (ws) => {
      chatWss.emit('connection', ws, request)
    })
  } else if (request.url === '/poll') {
    pollWss.handleUpgrade(request, socket, head, (ws) => {
      pollWss.emit('connection', ws, request)
    })
  } else {
    socket.destroy()
  }
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
        {/* <Form /> */}
      </div>
      <div>
        <p>What is the capital of France?</p>
        <ul class="flex flex-col gap-6">
          <form ws-send ws-connect="/poll">
            <input type="hidden" name="option" value="Paris" />
            <button class="border rounded p-5 hover:border-green-600">
              Paris
            </button>
          </form>
          <li class="border rounded p-5">Paris</li>
          <li class="border rounded p-5">Paris</li>
        </ul>
      </div>
    </Layout>
  )
})

export default server
