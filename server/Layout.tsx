import { Attributes } from 'typed-html'

export function Layout({ children }: Attributes) {
  return `<!DOCTYPE >
<html>
  <head>
    <title>Vext</title>
    <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
    <script>
const socket = io();
    </script>
  </head>
  <body>
  ${children}
  </body>
</html>`
}
