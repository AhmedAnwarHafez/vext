import express from 'express'
import WebSocket, { WebSocketServer } from 'ws'

const app = express()
const wss = new WebSocketServer({ port: 8080 })

// Broadcast function to send messages to all connected clients
function broadcast(data, options) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data, options)
    }
  })
}

wss.on('connection', (ws) => {
  console.log('connected')

  ws.on('message', (data, isBinary) => {
    const message = JSON.parse(data.toString())
    console.log('received: %s', message.chat_message)
    const response = `<div id="notifications" hx-swap-oob="afterend">
<p>${message.chat_message}</p>
</div>`
    broadcast(response, { binary: isBinary })
  })
})

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>

<script src="https://unpkg.com/htmx.org@1.9.4" integrity="sha384-zUfuhFKKZCbHTY6aRR46gxiqszMk5tcHjsVFxnUo8VMus4kHGVdIYVbOYYNlKmHV" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/ws.js"></script>
      </head>
      <body>
        <div hx-ext="ws" ws-connect="ws://localhost:8080">
          <form ws-send>
            <input name="chat_message" value="" />
            <button type="submit">Send</button>
          </form>
          <div id="notifications"></div>
        </div>
      </body>
    </html>
  `)
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
