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
import { Form } from './components/Form.tsx'
import Builder from './components/Builder.tsx'

const app = express()
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

app.post('/edit', (req, res) => {
  res.redirect('/')
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
      <div id="vote">
        <p>What is the capital of France?</p>

        <form hx-ext="ws" ws-send ws-connect="/poll">
          <div>
            <input type="radio" id="Paris" name="option" value="Paris" />
            <label for="Paris">Paris</label>
          </div>
          <div>
            <input type="radio" name="option" value="Berlin" />
            <label for="Berlin">Berlin</label>
          </div>
          <div>
            <input type="radio" name="option" value="London" />
            <label for="London">London</label>
          </div>
          <button
            class="border rounded p-5 hover:border-green-600 disabled:text-gray-400"
            _="on click add @disabled on me"
          >
            Vote
          </button>
        </form>
      </div>
    </Layout>
  )
})

export default server
