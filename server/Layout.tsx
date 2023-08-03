import { Attributes } from 'typed-html'

export function Layout({ children }: Attributes) {
  return `<!DOCTYPE >
    <html>
      <head>
        <script src="https://unpkg.com/htmx.org@1.9.4" integrity="sha384-zUfuhFKKZCbHTY6aRR46gxiqszMk5tcHjsVFxnUo8VMus4kHGVdIYVbOYYNlKmHV" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/ws.js"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
      </head>
      <body>
        <div hx-ext="ws" ws-connect="ws://localhost:8080">
          ${children}
          <div id="notifications"></div>
        </div>
      </body>
    </html>
`
}
