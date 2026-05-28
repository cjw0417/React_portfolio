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

const isTouch = () => window.matchMedia('(hover: none)').matches

const handleCardEnter = (e) => {
  if (isTouch()) return
  const card = e.currentTarget
  const grid = card.closest('.project-grid')
  if (!grid) return

  const cardRect = card.getBoundingClientRect()
  const gridRect = grid.getBoundingClientRect()

  const deltaX = (gridRect.left + gridRect.width / 2) - (cardRect.left + cardRect.width / 2)
  const deltaY = (gridRect.top + gridRect.height / 2) - (cardRect.top + cardRect.height / 2)

  gsap.set(card, { zIndex: 100 })
  gsap.to(card, {
    x: deltaX,
    y: deltaY,
    scale: 1.6,
    duration: 0.45,
    ease: 'power3.out',
  })
}

const handleCardLeave = (e) => {
  if (isTouch()) return
  const card = e.currentTarget
  gsap.to(card, {
    x: 0,
    y: 0,
    scale: 1,
    duration: 0.4,
    ease: 'power2.inOut',
    onComplete: () => gsap.set(card, { zIndex: 1 }),
  })
}

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
        <ChannelDivider label="welcome" desc="들어오셨군요, 편하게 구경하세요 👋" />
        <Message time="오전 10:00">
          안녕하세요, <strong>조재우</strong>예요 👋
        </Message>
        <Message time="오전 10:00" grouped>
          퍼블리셔로 일하고 있어요. 쉽게 말하면 디자인 시안 받아서 코드로 구현하는 사람이에요 ㅎ
        </Message>
        <Message time="오전 10:01" grouped>
          요즘은 인터랙션이랑 애니메이션 쪽에 재미 붙여서 이것저것 만들어보고 있고요.
        </Message>
        <Message time="오전 10:02">
          스크롤 내리면서 구경해주세요 🙏
        </Message>
        <TypingIndicator />
      </section>

      {/* ─── #about-me ─── */}
      <section id="about-me" className="channel-section">
        <ChannelDivider label="about-me" desc="저 어떤 사람인지 궁금하시면" />
        <Message time="오전 10:10">
          네, 안녕하세요.
        </Message>
        <Message time="오전 10:10" grouped>
          (주)미디어포스 얼라이언스에서 퍼블리셔로 일하고 있는 <strong>조재우</strong>예요.
        </Message>
        <Message time="오전 10:11" grouped>
          신한카드 운영으로 시작했는데 어쩌다 보니 금융권 프로젝트가 계속 이어지더라고요 ㅋㅋ<br />
          덕분에 복잡한 UI 구조 다루는 건 꽤 익숙해졌어요.
        </Message>
        <Message time="오전 10:12" grouped>
          마크업이 그냥 껍데기라는 생각은 없어요.<br />
          결국 사용자가 직접 보고 만지는 부분이라서, 꼼꼼하게 짚고 넘어가는 편이에요.
        </Message>
        <Message time="오전 10:13" grouped>
          <blockquote className="about-quote">"디자인 시안이 들어오면 '어떻게 구현하지'보다 '어떻게 하면 더 잘 만들 수 있지'를 먼저 생각해요."</blockquote>
        </Message>
        <Message time="오전 10:14">
          <AboutEmbed />
        </Message>
      </section>

      {/* ─── #skills ─── */}
      <section id="skills" className="channel-section">
        <ChannelDivider label="skills" desc="뭘 쓰는지 궁금하면" />
        <Message time="오전 10:20">
          쓰는 기술들이에요 🛠️
        </Message>
        <Message time="오전 10:20" grouped>
          <SkillEmbed skills={SKILL_DATA} />
        </Message>
        <Message time="오전 10:21">
          HTML/CSS가 베이스고요, 요즘은 React랑 GSAP 쓰는 프로젝트가 많아져서 점점 재밌어지고 있어요 ㅎ
        </Message>
      </section>

      {/* ─── #projects ─── */}
      <section id="projects" className="channel-section channel-section--full">
        <ChannelDivider label="projects" desc="작업한 것들" />
        <Message time="오전 10:30">
          작업한 프로젝트들이에요 📎
        </Message>
        <div className="project-grid">
          {PROJECTS.map((p, i) => (
            <div key={i} className="project-card" style={{ '--card-color': p.color }} onClick={() => handleProjectClick(p)} onMouseEnter={handleCardEnter} onMouseLeave={handleCardLeave}>
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
        <ChannelDivider label="contact" desc="연락 주세요" />
        <Message time="오전 10:40">
          같이 뭔가 만들어보고 싶으시거나, 궁금한 거 있으면 편하게 연락주세요 📬
        </Message>
        <Message time="오전 10:40" grouped>
          폼 쓰셔도 되고, 그냥 메일 주셔도 돼요. 빠르게 답장할게요 ㅎㅎ
        </Message>
        <Message time="오전 10:41">
          <ContactEmbed />
        </Message>
        <Message time="오전 10:42">
          <a href="https://github.com/cjw04" target="_blank" rel="noreferrer">GitHub</a>{' · '}
          <a href="mailto:ridshfwk34@gmail.com">ridshfwk34@gmail.com</a>
        </Message>
        <div className="chat-footer">
          <p>© 2025 조재우. All rights reserved.</p>
        </div>
      </section>
    </div>
    </>
  )
}
