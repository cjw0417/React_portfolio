import { CHANNELS } from '../data'
import './ServerBar.scss'

const CHANNEL_META = {
  'welcome':  { icon: '👋', label: 'Welcome'  },
  'about-me': { icon: '🙋', label: 'About Me' },
  'skills':   { icon: '⚡', label: 'Skills'   },
  'projects': { icon: '📁', label: 'Projects' },
  'contact':  { icon: '📬', label: 'Contact'  },
}

export default function ServerBar({ activeChannel }) {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <aside className="server-bar">
      {/* 포트폴리오 서버 아이콘 */}
      <div className="server-bar__mine" title="Jaewoo Portfolio">
        JC
        <span className="server-bar__badge" />
      </div>

      <div className="server-bar__divider" />

      {/* 섹션 내비게이션 */}
      {CHANNELS.map(({ id }) => {
        const { icon, label } = CHANNEL_META[id]
        const isActive = activeChannel === id

        return (
          <button
            key={id}
            className={`server-bar__nav ${isActive ? 'server-bar__nav--active' : ''}`}
            title={label}
            onClick={() => scrollTo(id)}
          >
            {isActive && <span className="server-bar__indicator" />}
            <span className="server-bar__nav-icon">{icon}</span>
            <span className="server-bar__tooltip">{label}</span>
          </button>
        )
      })}
    </aside>
  )
}
