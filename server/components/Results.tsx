import * as elements from 'typed-html'
import { marked } from 'marked'

import { Option } from './PublishedQuestion.tsx'
import Nav from './Nav.tsx'

interface Props {
  question: string
  options: Option[]
}

export default function Results(props: Props) {
  const { question, options } = props

  const labels = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
  }

  return (
    <div>
      <Nav />
      <div class="text-slate-900 space-y-6">
        <h1 class="text-3xl font-bold text-slate-50">{question}</h1>
        <div class="flex flex-col gap-4">
          {options
            .filter((option) => option.content)
            .map((option, i) => (
              <div class="flex flex-col gap-4 border rounded-lg p-4">
                <div class="text-slate-50 flex-none flex gap-4">
                  {marked.parse(option.content)}
                </div>

                <div class="flex gap-4 items-start align-middle">
                  <span class="text-slate-50">{labels[i]}.</span>
                  <div
                    class="bg-slate-500 h-6 text-slate-50 flex items-center justify-center"
                    style={`width: ${
                      option.votes.length === 0 ? 10 : option.votes.length * 10
                    }%`}
                  >
                    {option.votes.length}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
