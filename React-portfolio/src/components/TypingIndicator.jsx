import './TypingIndicator.scss'

export default function TypingIndicator() {
  return (
    <div className="typing">
      <div className="typing__avatar">JC</div>
      <div className="typing__bubble">
        <span />
        <span />
        <span />
      </div>
      <p className="typing__text">조재우님이 입력 중...</p>
    </div>
  )
}
