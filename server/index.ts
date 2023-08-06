import app from './server.tsx'

const port = 3000

app.listen(port, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', port)
})
