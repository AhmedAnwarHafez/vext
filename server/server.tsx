import express from 'express'
import cookie from 'cookie'
import * as Path from 'node:path'
import * as URL from 'node:url'
import * as elements from 'typed-html'
import http from 'http'

import chatWss from './websockets/chat.tsx'
import pollWss from './websockets/poll.tsx'
import { Layout } from './Layout.tsx'
import { randomName } from './fakeNames.ts'
import { ChatForm } from './components/ChatForm.tsx'
import Builder from './components/Builder.tsx'
import { Props, PublishedQuestion } from './components/PublishedQuestion.tsx'
import Results from './components/Results.tsx'
import Thanks from './components/Thanks.tsx'
import { readPoll, writePoll } from './db.ts'

const app = express()
app.use(express.urlencoded({ extended: true }))
const server = http.createServer(app)
const __dirname = Path.dirname(URL.fileURLToPath(import.meta.url))
app.use(express.static(Path.join(__dirname, '../public')))

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

app.get('/edit', (req, res) => {
  res.send(
    <Layout>
      <Builder />
    </Layout>
  )
})

app.post('/edit', async (req, res) => {
  const form = req.body

  const question = {
    question: form.question,
    options: [
      { id: 1, content: form.optionA, votes: [''] },
      { id: 2, content: form.optionB, votes: [''] },
      { id: 3, content: form.optionC, votes: [''] },
      { id: 4, content: form.optionD, votes: [''] },
    ],
  }

  await writePoll(question)

  res.redirect('/results')
})

app.get('/', async (req, res) => {
  // check if cookie exists
  if (!req.headers.cookie) {
    // genereate a new cookie for each request
    res.setHeader('Set-Cookie', `userId=${randomName()}; HttpOnly; Path=/`)
  }

  const userId = cookie.parse(req.headers.cookie || '').userId
  const poll = await readPoll()

  const alreadyVoted = poll.options.some((option) =>
    option.votes.includes(userId)
  )

  if (alreadyVoted) {
    res.send(
      <Layout>
        <div id="publishedQuestion">
          <p>You already voted</p>
        </div>
      </Layout>
    )
    return
  }

  res.send(
    <Layout>
      <PublishedQuestion question={poll.question} options={poll.options} />
    </Layout>
  )
})

app.get('/results', async (req, res) => {
  const poll = await readPoll()
  res.send(
    <Layout>
      <Results question={poll.question} options={poll.options} />
    </Layout>
  )
})

export default server
