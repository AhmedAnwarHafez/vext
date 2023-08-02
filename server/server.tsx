import express from 'express'
import * as elements from 'typed-html'
import { WebSocketServer } from 'ws'
import { Layout } from './Layout.tsx'

const app = express()
export default app

const wss = new WebSocketServer({ port: 8080, noServer: false })

wss.on('connection', (ws) => {
  ws.on('error', console.error)

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString())
    console.log('received: %s', message.chat_message)
  })

  setTimeout(() => {
    ws.send(
      `<div id="notifications" hx-swap-oob="true">A message from the server</div>`
    )
  }, 10000)
})

app.get('/', (req, res) => {
  res.send(
    <Layout>
      <div hx-ext="ws" ws-connect="ws://localhost:8080/chatroom">
        <div id="notifications" hx-swap-oob="beforeend">
          New message received
        </div>
        <form ws-send>
          <input name="chat_message" value="hello" />
          <button type="submit">Send</button>
        </form>
      </div>
    </Layout>
  )
})
