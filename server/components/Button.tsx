import * as elements from 'typed-html'

export default function Button({
  children,
  ...attributes
}: elements.Attributes) {
  return (
    <button
      class="place-self-end w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      {...attributes}
    >
      {children}
    </button>
  )
}
