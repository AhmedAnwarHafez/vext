import app from './server.tsx'

const port = 3000

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', port)
})
