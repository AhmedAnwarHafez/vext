import WebSocket from 'ws'

// Broadcast function to send messages to all connected clients
export function broadcast(ws: WebSocket, data: string) {
  ws.send(data, { binary: false })
}
