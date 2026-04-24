import './Message.scss'

export default function Message({ time, children, grouped = false }) {
  return (
    <div className={`message ${grouped ? 'message--grouped' : ''}`}>
      {!grouped && <div className="message__avatar">JC</div>}
      {grouped && <div className="message__avatar-gap" />}
      <div className="message__body">
        {!grouped && (
          <div className="message__meta">
            <span className="message__username">조재우</span>
            <span className="message__time">{time}</span>
          </div>
        )}
        <div className="message__content">{children}</div>
      </div>
    </div>
  )
}
