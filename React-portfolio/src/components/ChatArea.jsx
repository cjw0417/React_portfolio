import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CHANNELS, PROJECTS } from '../data'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import ProjectModal from './ProjectModal'
import './ChatArea.scss'

gsap.registerPlugin(ScrollTrigger)

function ChannelDivider({ label, desc }) {
  return (
    <div className="channel-divider">
      <div className="channel-divider__icon">#</div>
      <h2 className="channel-divider__name">{label}</h2>
      {desc && <p className="channel-divider__desc">{desc}</p>}
      <div className="channel-divider__line" />
    </div>
  )
}

function SkillEmbed({ skills }) {
  return (
    <div className="skill-embed">
      {skills.map(({ category, items }) => (
        <div key={category} className="skill-embed__group">
          <p className="skill-embed__category">{category}</p>
          <div className="skill-embed__tags">
            {items.map(item => (
              <span key={item} className="skill-embed__tag">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ContactEmbed() {
  return (
    <form className="contact-embed" onSubmit={e => e.preventDefault()}>
      <div className="contact-embed__field">
        <label>이름</label>
        <input type="text" placeholder="홍길동" />
      </div>
      <div className="contact-embed__field">
        <label>이메일</label>
        <input type="email" placeholder="hello@example.com" />
      </div>
      <div className="contact-embed__field">
        <label>메시지</label>
        <textarea placeholder="프로젝트에 대해 말씀해주세요..." />
      </div>
      <button type="submit">메시지 보내기</button>
    </form>
  )
}

const SKILL_DATA = [
  { category: 'Markup / Style',  items: ['HTML5', 'CSS3', 'SCSS', 'Tailwind'] },
  { category: 'Script',          items: ['JavaScript', 'TypeScript', 'React'] },
  { category: 'Animation',       items: ['GSAP', 'ScrollTrigger', 'Swiper'] },
  { category: 'Tools / Design',  items: ['Figma', 'Git', 'Vite', 'Responsive'] },
  { category: 'AI',              items: ['Claude', 'Claude Code', 'Prompt Engineering'] },
]

export default function ChatArea({ activeChannel, setActiveChannel, setVisibleChannels }) {
  const [selectedProject, setSelectedProject] = useState(null)

  const reveal = (id) =>
    setVisibleChannels(prev => prev.includes(id) ? prev : [...prev, id])

  useEffect(() => {
    CHANNELS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      // 채널 사이드바에 채널 등장
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => reveal(id),
      })

      // 활성 채널 추적
      ScrollTrigger.create({
        trigger: el,
        start: 'top 45%',
        end: 'bottom 45%',
        onEnter:     () => setActiveChannel(id),
        onEnterBack: () => setActiveChannel(id),
      })

      // 메시지 등장 애니메이션
      gsap.fromTo(
        el.querySelectorAll('.message, .skill-embed, .project-embed, .contact-embed, .project-card'),
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 75%' },
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
    {selectedProject && (
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    )}
    <div className="chat-area">
      {/* 상단 헤더 */}
      <header className="chat-header">
        <div className="chat-header__left">
          {CHANNELS.map(({ id, label }) => (
            <button
              key={id}
              className={`chat-header__tab ${activeChannel === id ? 'chat-header__tab--active' : ''}`}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="chat-header__tab-hash">#</span>
              {label}
            </button>
          ))}
        </div>
        <div className="chat-header__actions">
          <button>🔍</button>
          <button>📌</button>
          <button>👥</button>
        </div>
      </header>

      {/* ─── #welcome ─── */}
      <section id="welcome" className="channel-section">
        <ChannelDivider label="welcome" desc="Jaewoo Cho의 포트폴리오 서버에 오신 걸 환영해요!" />
        <Message time="오전 10:00">
          안녕하세요! 저는 <strong>조재우</strong>입니다. 👋
        </Message>
        <Message time="오전 10:00" grouped>
          UI/UX 퍼블리셔로 디자인과 개발의 경계를 잇는 작업을 하고 있어요.
        </Message>
        <Message time="오전 10:01" grouped>
          픽셀 퍼펙트한 구현과 부드러운 인터랙션이 저의 강점입니다 ✨
        </Message>
        <Message time="오전 10:02">
          아래 채널들을 둘러보시면서 저의 작업을 확인해보세요. 😊
        </Message>
        <TypingIndicator />
      </section>

      {/* ─── #about-me ─── */}
      <section id="about-me" className="channel-section">
        <ChannelDivider label="about-me" desc="저에 대해 더 알아보세요" />
        <Message time="오전 10:10">
          저는 Figma 시안을 보는 순간 퍼블리싱 구조가 그려지는 사람이에요.
        </Message>
        <Message time="오전 10:10" grouped>
          세심한 디테일과 성능 최적화를 놓치지 않으면서도 빠른 작업 속도로 팀에 기여합니다.
        </Message>
        <Message time="오전 10:11" grouped>
          디자인과 개발 모두를 이해하기 때문에 커뮤니케이션 비용을 최소화할 수 있어요.
        </Message>
        <Message time="오전 10:12">
          <div className="stat-row">
            <div className="stat-badge"><strong>3+</strong><span>Years Exp.</span></div>
            <div className="stat-badge"><strong>20+</strong><span>Projects</span></div>
            <div className="stat-badge"><strong>10+</strong><span>Clients</span></div>
          </div>
        </Message>
      </section>

      {/* ─── #skills ─── */}
      <section id="skills" className="channel-section">
        <ChannelDivider label="skills" desc="주로 사용하는 기술 스택" />
        <Message time="오전 10:20">
          제가 주로 사용하는 기술들이에요 🛠️
        </Message>
        <Message time="오전 10:20" grouped>
          <SkillEmbed skills={SKILL_DATA} />
        </Message>
        <Message time="오전 10:21">
          퍼블리셔로서 HTML/CSS의 기초를 탄탄히 하면서 React와 GSAP으로 인터랙션까지 구현합니다.
        </Message>
      </section>

      {/* ─── #projects ─── */}
      <section id="projects" className="channel-section channel-section--full">
        <ChannelDivider label="projects" desc="최근 진행한 프로젝트들" />
        <Message time="오전 10:30">
          최근 작업한 프로젝트들을 공유할게요 📎
        </Message>
        <div className="project-grid">
          {PROJECTS.map((p, i) => (
            <div key={i} className="project-card" style={{ '--card-color': p.color }} onClick={() => setSelectedProject(p)}>
              <div className="project-card__bg" />
              <div className="project-card__body">
                <p className="project-card__category">{p.category}</p>
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__desc">{p.desc}</p>
                <div className="project-card__tags">
                  {p.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
              <span className="project-card__num">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── #contact ─── */}
      <section id="contact" className="channel-section">
        <ChannelDivider label="contact" desc="함께 멋진 것을 만들어봐요" />
        <Message time="오전 10:40">
          협업이나 프로젝트 문의를 기다리고 있어요! 📬
        </Message>
        <Message time="오전 10:40" grouped>
          아래 폼으로 메시지를 남겨주시면 빠르게 답변드릴게요.
        </Message>
        <Message time="오전 10:41">
          <ContactEmbed />
        </Message>
        <Message time="오전 10:42">
          또는 직접 연락하셔도 좋아요 →{' '}
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>{' · '}
          <a href="mailto:hello@example.com">Email</a>
        </Message>
        <div className="chat-footer">
          <p>© 2025 조재우. All rights reserved.</p>
        </div>
      </section>
    </div>
    </>
  )
}
