import express from 'express'
import http from 'http'
import * as elements from 'typed-html'
import { WebSocketServer } from 'ws'
import { Layout } from './Layout.tsx'

const app = express()
export default app

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('message', function message(data) {
    console.log('received: %s', data)
  })

  ws.send('something')
})

app.get('/', (req, res) => {
  res.send(
    <Layout>
      <div hx-ws="connect:ws://localhost:8080/chatroom">
        <div id="chat_room"></div>
        <form hx-ws="send">
          <input name="chat_message" value="hello" />
          <button type="submit">Send</button>
        </form>
      </div>
    </Layout>
  )
})
