import * as elements from 'typed-html'

export default function Nav() {
  return (
    <nav class="text-slate-50 flex justify-evenly items-stretch px-8 py-4">
      <a href="/edit">New</a>
      <a href="/about">About</a>
    </nav>
  )
}
