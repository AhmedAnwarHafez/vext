import cookie from 'cookie'
import * as elements from 'typed-html'
import WebSocket, { WebSocketServer } from 'ws'
import { broadcast } from '../broadcast.tsx'
import { MemberJoined, Notification } from '../components/notification.tsx'
import { randomName } from '../fakeNames.ts'

const chatWss = new WebSocketServer({ noServer: true })
export default chatWss

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
