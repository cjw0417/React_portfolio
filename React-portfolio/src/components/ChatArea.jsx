import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CHANNELS, PROJECTS } from '../data'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import './ChatArea.scss'

gsap.registerPlugin(ScrollTrigger)

function ChannelDivider({ label, desc }) {
  return (
    <div className="channel-divider">
      <div className="channel-divider__icon">#</div>
      <div className="channel-divider__info">
        <h2 className="channel-divider__name">{label}</h2>
        {desc && <p className="channel-divider__desc">{desc}</p>}
      </div>
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

const TECH_STACK = [
  { name: 'HTML',       abbr: 'H5', color: '#E34F26' },
  { name: 'CSS3',       abbr: 'C3', color: '#1572B6' },
  { name: 'JavaScript', abbr: 'JS', color: '#F7DF1E', dark: true },
  { name: 'jQuery',     abbr: 'jQ', color: '#0769AD' },
  { name: 'Vue.js',     abbr: 'V',  color: '#42B883' },
  { name: 'Figma',      abbr: 'F',  color: '#F24E1E' },
  { name: 'Photoshop',  abbr: 'Ps', color: '#31A8FF' },
]

const VALUES = ['사용자 중심', '꼼꼼함', '소통', '문제 해결']

function AboutEmbed() {
  return (
    <div className="about-embed">
      <div className="about-embed__section">
        <p className="about-embed__label">주요 경력</p>
        <div className="career-item">
          <span className="career-item__period">2022~현재</span>
          <span className="career-item__company">(주)미디어포스 얼라이언스 재직중</span>
        </div>
      </div>
      <div className="about-embed__section">
        <p className="about-embed__label">기술 스택</p>
        <div className="tech-grid">
          {TECH_STACK.map(({ name, abbr, color, dark }) => (
            <div key={name} className="tech-badge">
              <span className="tech-badge__icon" style={{ background: color, color: dark ? '#1a1a1a' : '#fff' }}>{abbr}</span>
              <span className="tech-badge__name">{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="about-embed__section">
        <p className="about-embed__label">가치관 &amp; 키워드</p>
        <div className="value-tags">
          {VALUES.map(v => (
            <span key={v} className="value-tag">{v}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const SKILL_DATA = [
  { category: 'Markup / Style',  items: ['HTML5', 'CSS3', 'SCSS', 'Tailwind'] },
  { category: 'Script',          items: ['JavaScript', 'TypeScript', 'React'] },
  { category: 'Animation',       items: ['GSAP', 'ScrollTrigger', 'Swiper'] },
  { category: 'Tools / Design',  items: ['Figma', 'Git', 'Vite', 'Responsive'] },
  { category: 'AI',              items: ['Claude', 'Claude Code', 'Prompt Engineering'] },
]

const handleProjectClick = (p) => {
  if (!p.link || p.link === '#') return
  if (p.linkType === 'mobile') {
    window.open(p.link, 'ocr-preview', 'width=375,height=812,noopener')
  } else {
    window.open(p.link, '_blank', 'noopener')
  }
}

export default function ChatArea({ setActiveChannel, setVisibleChannels }) {
  const reveal = (id) =>
    setVisibleChannels(prev => prev.includes(id) ? prev : [...prev, id])

  useEffect(() => {
    CHANNELS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => reveal(id),
      })

      ScrollTrigger.create({
        trigger: el,
        start: 'top 30%',
        end: 'bottom 30%',
        onEnter:     () => setActiveChannel(id),
        onEnterBack: () => setActiveChannel(id),
      })

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
    <div className="chat-area">
 
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
          안녕하세요.
        </Message>
        <Message time="오전 10:10" grouped>
          5년차 웹 퍼블리셔, <strong>조재우</strong>입니다.
        </Message>
        <Message time="오전 10:11" grouped>
          HTML, CSS, JavaScript, Figma 등 다양한 툴을 활용하며,<br />
          사용자 중심의 UI/UX와 팀원과의 원활한 협업을 중요하게 생각합니다.
        </Message>
        <Message time="오전 10:12" grouped>
          새로운 기술과 변화에 항상 열린 마음으로 도전하며,<br />
          더 나은 결과를 위해 꾸준히 성장하고 있습니다.
        </Message>
        <Message time="오전 10:13" grouped>
          <blockquote className="about-quote">"프로젝트의 시작부터 끝까지 책임지는 퍼블리셔가 되겠습니다."</blockquote>
        </Message>
        <Message time="오전 10:14">
          <AboutEmbed />
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
            <div key={i} className="project-card" style={{ '--card-color': p.color }} onClick={() => handleProjectClick(p)}>
              <div className="project-card__bg" style={p.image ? { backgroundImage: `url(${p.image})` } : {}} />
              <div className="project-card__body">
                <p className="project-card__category">{p.category}</p>
                {p.period && <p className="project-card__period">{p.period}</p>}
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
          <a href="https://github.com/cjw04" target="_blank" rel="noreferrer">GitHub</a>{' · '}
          <a href="mailto:ridshfwk34@gmail.com">Email</a>
        </Message>
        <div className="chat-footer">
          <p>© 2025 조재우. All rights reserved.</p>
        </div>
      </section>
    </div>
    </>
  )
}
