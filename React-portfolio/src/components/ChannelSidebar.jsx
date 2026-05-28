import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CHANNELS } from '../data'
import './ChannelSidebar.scss'

function HashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="channel-icon">
      <path d="M6.71 1.08a.75.75 0 0 1 .63.85L7.1 3.5h2.8l.27-1.67a.75.75 0 1 1 1.48.24L11.4 3.5H13a.75.75 0 0 1 0 1.5h-1.87l-.5 3H12a.75.75 0 0 1 0 1.5h-1.63l-.28 1.67a.75.75 0 1 1-1.48-.24l.22-1.43H6.03l-.28 1.67a.75.75 0 1 1-1.48-.24l.22-1.43H3a.75.75 0 0 1 0-1.5h1.75l.5-3H4a.75.75 0 0 1 0-1.5h1.5l.27-1.67a.75.75 0 0 1 .94-.63ZM9.03 8.5l.5-3H6.72l-.5 3h2.81Z" />
    </svg>
  )
}

export default function ChannelSidebar({ activeChannel, visibleChannels, setActiveChannel, navOpen, setNavOpen }) {
  const prevLengthRef = useRef(1)

  useEffect(() => {
    const newLen = visibleChannels.length
    if (newLen > prevLengthRef.current) {
      const newId = visibleChannels[newLen - 1]
      const el = document.getElementById(`ch-${newId}`)
      if (el) {
        gsap.fromTo(el,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
        )
      }
    }
    prevLengthRef.current = newLen
  }, [visibleChannels])

  const scrollTo = (id) => {
    setActiveChannel(id)
    setNavOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* 모바일 상단 헤더 */}
      <div className="mobile-header">
        <div className="mobile-header__left">
          <span className="mobile-header__server">Jaewoo.dev</span>
          <div className="mobile-header__row">
            <span className="mobile-header__hash">#</span>
            <span className="mobile-header__channel">{activeChannel}</span>
          </div>
        </div>
        <button className="mobile-header__btn" onClick={() => setNavOpen(v => !v)}>
          {navOpen
            ? <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M2.47 2.47a.75.75 0 0 1 1.06 0L9 7.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L10.06 9l5.47 5.47a.75.75 0 1 1-1.06 1.06L9 10.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L7.94 9 2.47 3.53a.75.75 0 0 1 0-1.06Z"/></svg>
            : <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M2 4.5A.75.75 0 0 1 2.75 3.75h12.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.5ZM2 9a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9Zm0 4.5a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 13.5Z"/></svg>
          }
        </button>
      </div>

      {/* 모바일 백드롭 */}
      {navOpen && <div className="mobile-backdrop" onClick={() => setNavOpen(false)} />}

      {/* 사이드바 */}
      <aside className={`channel-sidebar${navOpen ? ' channel-sidebar--open' : ''}`}>
        {/* 서버명 */}
        <div className="channel-sidebar__header">
          <span className="channel-sidebar__server-name">Jaewoo.dev</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" opacity="0.6">
            <path d="M3.47 7.47a.75.75 0 0 0 0 1.06l4 4a.75.75 0 0 0 1.06 0l4-4a.75.75 0 0 0-1.06-1.06L8 10.94 4.53 7.47a.75.75 0 0 0-1.06 0Z" />
          </svg>
        </div>

        {/* 채널 목록 */}
        <div className="channel-sidebar__section">
          <p className="channel-sidebar__category">PORTFOLIO</p>
          {CHANNELS.map(({ id, label }) => {
            const isVisible = visibleChannels.includes(id)
            return (
              <button
                id={`ch-${id}`}
                key={id}
                className={`channel-item ${activeChannel === id ? 'channel-item--active' : ''} ${!isVisible ? 'channel-item--pending' : ''}`}
                onClick={() => scrollTo(id)}
              >
                <HashIcon />
                <span>{label}</span>
                {activeChannel === id && <span className="channel-item__dot" />}
              </button>
            )
          })}
        </div>

        {/* 유저 영역 */}
        <div className="channel-sidebar__user">
          <div className="user-avatar">
            JC
            <span className="user-avatar__status" />
          </div>
          <div className="user-info">
            <p className="user-info__name">조재우</p>
            <p className="user-info__status">Online</p>
          </div>
          <div className="user-controls">
            <button title="음소거">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3ZM3.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 0 0 4.75 5.46V15h-1.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-1.5v-1.54A5.5 5.5 0 0 0 13.5 8a.5.5 0 0 0-1 0 4.5 4.5 0 0 1-9 0Z" />
              </svg>
            </button>
            <button title="설정">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M6.57.26a1.47 1.47 0 0 1 2.86 0l.12.67c.08.43.44.73.84.73h.03c.4 0 .76-.3.87-.7l.17-.64a1.47 1.47 0 0 1 2.48-.47l.48.48a1.47 1.47 0 0 1-.47 2.48l-.64.17c-.4.1-.7.47-.7.87v.03c0 .4.3.76.73.84l.67.12a1.47 1.47 0 0 1 0 2.86l-.67.12c-.43.08-.73.44-.73.84v.03c0 .4.3.76.7.87l.64.17a1.47 1.47 0 0 1 .47 2.48l-.48.48a1.47 1.47 0 0 1-2.48-.47l-.17-.64c-.1-.4-.47-.7-.87-.7h-.03c-.4 0-.76.3-.84.73l-.12.67a1.47 1.47 0 0 1-2.86 0l-.12-.67c-.08-.43-.44-.73-.84-.73H5.6c-.4 0-.76.3-.87.7l-.17.64a1.47 1.47 0 0 1-2.48.47l-.48-.48a1.47 1.47 0 0 1 .47-2.48l.64-.17c.4-.1.7-.47.7-.87V9.6c0-.4-.3-.76-.73-.84l-.67-.12a1.47 1.47 0 0 1 0-2.86l.67-.12c.43-.08.73-.44.73-.84V5.6c0-.4-.3-.76-.7-.87l-.64-.17a1.47 1.47 0 0 1-.47-2.48l.48-.48A1.47 1.47 0 0 1 4.56 2l.17.64c.1.4.47.7.87.7h.03c.4 0 .76-.3.84-.73l.1-.35Z" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
