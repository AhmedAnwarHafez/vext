import * as elements from 'typed-html'
import Button from './Button.tsx'

function Option({
  label,
  name,
  value,
}: {
  label: string
  name: string
  value?: string
}) {
  return (
    <div class="flex gap-4">
      <label for={name} class="text-slate-50 flex-none ">
        {label}
      </label>
      <textarea name={name} id={name} cols="30" rows="10" wrap="off">
        {value}
      </textarea>
    </div>
  )
}

export default function Builder() {
  return (
    <div class="text-slate-900">
      <form action="/edit" method="post" class="flex flex-col gap-4">
        <label for="question" class="text-slate-50">
          Question
        </label>
        <textarea name="question" id="question" cols="30" rows="10" wrap="off">
          How to center a div?
        </textarea>
        <Option
          label="A."
          name="optionA"
          value={`
\`\`\`html
<div class="flex justify-center">
  <div class="w-1/2 bg-red-500">Centered</div>
</div>
\`\`\`
`}
        />
        <Option
          label="B."
          name="optionB"
          value={`
\`\`\`html
<div class="grid place-items-center">
  <div class="w-1/2 bg-red-500">Centered</div>
</div>
\`\`\`
`}
        />
        <Option label="C." name="optionC" />
        <Option label="D." name="optionD" />

        <Button>Submit</Button>
      </form>
    </div>
  )
}
