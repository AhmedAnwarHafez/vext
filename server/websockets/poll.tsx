import cookie from 'cookie'
import { WebSocketServer } from 'ws'

const pollWss = new WebSocketServer({ noServer: true })
export default pollWss

pollWss.on('connection', (ws, req) => {
  // Handle poll connections
  console.log('poll connected')
  ws.on('message', (data) => {
    const message = JSON.parse(data.toString())
    const userId = cookie.parse(req.headers.cookie || '').userId
    console.log(`${userId} - ${message.option}`)

    ws.send('<div id="vote">Thanks</div>', { binary: false })
  })
})
