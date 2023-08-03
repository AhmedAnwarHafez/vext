import express from 'express'
import * as elements from 'typed-html'
import WebSocket, { WebSocketServer } from 'ws'

import { MemberJoined, Notification } from './components/notification.tsx'
import { Layout } from './Layout.tsx'

const app = express()
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

  broadcast(<MemberJoined memberName={'hardcoded for now'} />, {
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
      <form ws-send _="on submit reset() me">
        <input name="chat_message" value="" />
        <button type="submit">Send</button>
      </form>
    </Layout>
  )
})

export default app
