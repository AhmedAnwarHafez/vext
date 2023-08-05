import * as elements from 'typed-html'

function Option({ label, name }: { label: string; name: string }) {
  return (
    <div class="flex gap-4">
      <label for={name} class="text-slate-50 flex-none ">
        {label}
      </label>
      <textarea name={name} id={name} cols="30" rows="10"></textarea>
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
        <textarea name="question" id="question" cols="30" rows="10"></textarea>
        <Option label="A." name="optionA" />
        <Option label="B." name="optionB" />
        <Option label="C." name="optionC" />
        <Option label="D." name="optionD" />

        <button class="place-self-end w-32 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  )
}
