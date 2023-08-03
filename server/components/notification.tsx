import * as elements from 'typed-html'

interface NotificationProps {
  userId: string
  message: string
  isSelf: boolean
}

export const Notification = (props: NotificationProps) => {
  return (
    <div
      id="notifications"
      hx-swap-oob="afterend"
      class={`${
        props.isSelf ? 'self-end' : 'self-start'
      } w-10/12  flex flex-col`}
    >
      {!props.isSelf ? <p class="">{props.userId}</p> : null}
      <p
        class={`${
          props.isSelf ? 'text-right self-end' : 'text-left'
        } border rounded w-max p-4`}
      >
        {props.message}
      </p>
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
