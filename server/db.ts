import * as fsPromises from 'node:fs/promises'
import * as Path from 'node:path'
import * as URL from 'node:url'
import { Props } from './components/PublishedQuestion.tsx'

export async function readPoll(fs = fsPromises) {
  const __dirname = Path.dirname(URL.fileURLToPath(import.meta.url))
  const filePath = Path.join(__dirname, '../data.json')
  const data = await fs.readFile(filePath, 'utf-8')
  const poll: Props = JSON.parse(data)
  return poll
}

export async function writePoll(poll: Props, fs = fsPromises) {
  const __dirname = Path.dirname(URL.fileURLToPath(import.meta.url))
  const filePath = Path.join(__dirname, '../data.json')

  await fs.writeFile(filePath, JSON.stringify(poll, null, 2))
}
