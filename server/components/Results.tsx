import * as elements from 'typed-html'
import { Option } from './PublishedQuestion.tsx'
import Nav from './Nav.tsx'

interface Props {
  question: string
  options: Option[]
}

export default function Results(props: Props) {
  const { question, options } = props
  return (
    <div>
      <Nav />
      <div class="text-slate-900 space-y-6">
        <h1 class="text-3xl font-bold text-slate-50">{question}</h1>
        <div class="flex flex-col gap-4">
          {options
            .filter((option) => option.content)
            .map((option) => (
              <div class="flex gap-4">
                <div class="text-slate-50 flex-none">{option.content}</div>
                <div
                  class="bg-slate-500 h-4"
                  style={`width: ${option.votes.length * 10}%`}
                ></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
