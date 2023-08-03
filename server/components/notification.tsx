import * as elements from 'typed-html'

const Notification = ({ message }: { message: string }) => {
  return `<div id="notifications" hx-swap-oob="afterend">
<p>${message}</p>
</div>`
}

export default Notification
