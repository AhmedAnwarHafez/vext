import * as elements from 'typed-html'

interface NotificationProps {
  userId: string
  message: string
}

export const Notification = (props: NotificationProps) => {
  return (
    <div
      id="notifications"
      hx-swap-oob="afterend"
      class="border rounded border-slate-100"
    >
      <p>{props.message}</p>
      <p>{props.userId}</p>
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
