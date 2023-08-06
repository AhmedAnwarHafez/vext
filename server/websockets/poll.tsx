import cookie from 'cookie'
import * as elements from 'typed-html'
import { WebSocketServer } from 'ws'

import { broadcast } from '../broadcast.tsx'
import Thanks from '../components/Thanks.tsx'
import { readPoll, writePoll } from '../db.ts'

const pollWss = new WebSocketServer({ noServer: true })

pollWss.on('connection', (ws, req) => {
  console.log('poll connected')

  ws.on('message', async (data) => {
    const message = JSON.parse(data.toString())
    const userId = cookie.parse(req.headers.cookie || '').userId
    const poll = await readPoll()

    const updatedVotes = poll.options.map((option) =>
      option.id === +message.option
        ? { ...option, votes: option.votes.concat(userId) }
        : option
    )

    await writePoll({ ...poll, options: updatedVotes })

    broadcast(ws, <Thanks />)
  })
})

export default pollWss
