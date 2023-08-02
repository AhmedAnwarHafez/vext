import { Attributes } from 'typed-html'

export function Layout({ children }: Attributes) {
  return `<!DOCTYPE >
<html>
  <head>
    <title>Vext</title>
    <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
<script src="https://unpkg.com/htmx.org@1.9.4" integrity="sha384-zUfuhFKKZCbHTY6aRR46gxiqszMk5tcHjsVFxnUo8VMus4kHGVdIYVbOYYNlKmHV" crossorigin="anonymous"></script>
  </head>
  <body>
  ${children}
  </body>
</html>`
}
