import * as elements from 'typed-html'
import { Textbox } from './Textbox.tsx'

export function Form() {
  return (
    <form ws-send _="on submit reset() me" class="flex p-4 gap-4 m-10">
      <div class="">
        <Textbox name="chat_message" value="" />
      </div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Send
      </button>
    </form>
  )
}
