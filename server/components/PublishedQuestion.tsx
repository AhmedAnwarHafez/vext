import * as elements from 'typed-html'
import { marked } from 'marked'
import Button from './Button.tsx'

export interface Option {
  id: number
  content: string
  votes: string[]
}

export interface Props {
  question: string
  options: Option[]
}

export function PublishedQuestion({ question, options }: Props) {
  return (
    <form
      id="publishedQuestion"
      class="flex flex-col gap-6 items-center bg-slate-700 border rounded-lg border-slate-200 p-4"
      hx-ext="ws"
      ws-send
      ws-connect="/poll"
    >
      <h1 class="text-2xl text-left place-self-start">{question}</h1>
      {options
        .filter((option) => option.content)
        .map((option) => (
          <div class="flex gap-2">
            <input
              type="radio"
              id={option.id.toString()}
              name="option"
              value={option.id.toString()}
            />
            <label
              for={option.id.toString()}
              class="w-auto py-4 overflow-x-auto"
            >
              {marked.parse(option.content)}
            </label>
          </div>
        ))}
      <Button class="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Vote
      </Button>
    </form>
  )
}
