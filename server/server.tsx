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

let question = {
  question: '',
  options: [],
}

app.get('/edit', (req, res) => {
  res.send(
    <Layout>
      <Builder />
    </Layout>
  )
})

app.post('/edit', (req, res) => {
  const form = req.body

  question = {
    question: form.question,
    options: [
      { name: form.optionA, votes: 0 },
      { name: form.optionB, votes: 0 },
      { name: form.optionC, votes: 0 },
      { name: form.optionD, votes: 0 },
    ],
  }
  res.redirect('/results')
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
      {/* <div class="flex flex-col gap-4 h-screen"> */}
      {/*   <div id="participants"></div> */}
      {/*   <div id="messages" class="overflow-auto h-3/4"> */}
      {/*     <div id="notifications"></div> */}
      {/*   </div> */}
      {/* </div> */}
      {/* <div class="p-4 fixed bottom-0 w-1/2 flex justify-center"> */}
      {/*   <Form />  */}
      {/* </div> */}
      <PublishedQuestion
        question={question.question}
        options={question.options}
      />
      {/* <div id="vote">{html}</div> */}
    </Layout>
  )
})

app.get('/results', (req, res) => {
  question = {
    question: 'How to center a div?',
    options: [
      { name: 'A.', votes: 10 },
      { name: 'B.', votes: 2 },
      { name: 'C.', votes: 0 },
    ],
  }

  res.send(
    <Layout>
      <Results question={question.question} options={question.options} />
    </Layout>
  )
})

export default server
