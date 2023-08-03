import * as elements from 'typed-html'

export function Textbox({ value, name }: { name: string; value: string }) {
  return (
    <input
      class="rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" "
      value={value}
      name={name}
    />
  )
}
