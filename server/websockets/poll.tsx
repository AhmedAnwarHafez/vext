import cookie from 'cookie'
import * as elements from 'typed-html'
import { WebSocketServer } from 'ws'

import { broadcast } from '../broadcast.tsx'
import Thanks from '../components/Thanks.tsx'

const pollWss = new WebSocketServer({ noServer: true })
export default pollWss

pollWss.on('connection', (ws, req) => {
  // Handle poll connections
  console.log('poll connected')
  ws.on('message', (data) => {
    const message = JSON.parse(data.toString())
    console.log(message)
    const userId = cookie.parse(req.headers.cookie || '').userId
    // console.log(`${userId} - ${message.option}`)

    broadcast(ws, <Thanks />)
  })
})
