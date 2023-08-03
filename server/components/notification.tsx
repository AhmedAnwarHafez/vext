import * as elements from 'typed-html'

export const Notification = ({ message }: { message: string }) => {
  return (
    <div id="notifications" hx-swap-oob="afterend">
      <p>{message}</p>
    </div>
  )
}

export const MemberJoined = ({ memberName }: { memberName: string }) => {
  return (
    <div id="notifications" hx-swap-oob="afterend">
      <p>
        <em>{memberName}</em>has joined the chat
      </p>
    </div>
  )
}
