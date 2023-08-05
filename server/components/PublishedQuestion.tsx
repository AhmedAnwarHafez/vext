import * as elements from 'typed-html'
import { marked } from 'marked'

interface Option {
  name: string
  label: string
}

export interface Props {
  question: string
  options: Option[]
}

export function PublishedQuestion({ question, options }: Props) {
  return (
    <div class="grid place-items-center">
      <h1 class="text-2xl">{question}</h1>
      <form class="flex flex-col gap-2" hx-ext="ws" ws-send ws-connect="/poll">
        {options
          .filter((option) => option.name)
          .map((option, i) => (
            <div class="flex gap-2">
              <input
                type="radio"
                id={i.toString()}
                name="option"
                value={i.toString()}
              />
              <label for={i.toString()}>{option.name}</label>
            </div>
          ))}
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Vote
        </button>
      </form>
    </div>
  )
}
