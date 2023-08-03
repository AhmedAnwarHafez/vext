import { Attributes } from 'typed-html'

export function Layout({ children }: Attributes) {
  return `<!DOCTYPE >
    <html>
      <head>
        <script src="https://unpkg.com/htmx.org@1.9.4" integrity="sha384-zUfuhFKKZCbHTY6aRR46gxiqszMk5tcHjsVFxnUo8VMus4kHGVdIYVbOYYNlKmHV" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/ws.js"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
        <link href="/output.css" rel="stylesheet">
      </head>
      <body class="bg-slate-800 text-slate-50">
        <div hx-ext="ws" ws-connect="ws://localhost:8080" class="w-2/3 mx-auto flex flex-col items-center">
          ${children}
          <div id="notifications"></div>
        </div>
      </body>
    </html>
`
}
