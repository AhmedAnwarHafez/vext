import { Attributes } from 'typed-html'

export function Layout({ children }: Attributes) {
  return `<!DOCTYPE >
    <html>
      <head>

<script src="https://unpkg.com/htmx.org@1.9.4" integrity="sha384-zUfuhFKKZCbHTY6aRR46gxiqszMk5tcHjsVFxnUo8VMus4kHGVdIYVbOYYNlKmHV" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/ws.js"></script>
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
