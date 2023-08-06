import { Attributes } from 'typed-html'
import Nav from './components/Nav.tsx'
import * as elements from 'typed-html'

export function Layout({ children }: Attributes) {
  return `<!DOCTYPE >
    <html>
      <head>
        <script src="https://unpkg.com/htmx.org@1.9.4" integrity="sha384-zUfuhFKKZCbHTY6aRR46gxiqszMk5tcHjsVFxnUo8VMus4kHGVdIYVbOYYNlKmHV" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/ws.js"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
        <link href="/output.css" rel="stylesheet">
      </head>
      <body class="bg-slate-800 text-slate-50 grid place-items-center w-full min-h-screen">
          ${children}
      </body>
    </html>
`
}
