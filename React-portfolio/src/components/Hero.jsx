import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.css'

const TITLES = ['UI/UX Publisher', 'Frontend Developer', 'Creative Coder']

export default function Hero() {
  const greetingRef = useRef(null)
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const scrollRef = useRef(null)
  const bgTextRef = useRef(null)
  const typingRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.from(greetingRef.current, { y: 30, opacity: 0, duration: 0.8 })
      .from(
        nameRef.current.querySelectorAll('span'),
        { y: 110, opacity: 0, duration: 1.1, stagger: 0.08 },
        '-=0.5'
      )
      .from(subtitleRef.current, { y: 24, opacity: 0, duration: 0.8 }, '-=0.5')
      .from(scrollRef.current, { opacity: 0, duration: 0.6 }, '-=0.3')
      .from(bgTextRef.current, { x: 80, opacity: 0, duration: 1.4, ease: 'power3.out' }, '<-1.2')

    let idx = 0
    let charIdx = 0
    let deleting = false
    let timer

    const type = () => {
      if (!typingRef.current) return
      const word = TITLES[idx]

      if (!deleting) {
        typingRef.current.textContent = word.slice(0, ++charIdx)
        if (charIdx === word.length) {
          deleting = true
          timer = setTimeout(type, 1800)
          return
        }
      } else {
        typingRef.current.textContent = word.slice(0, --charIdx)
        if (charIdx === 0) {
          deleting = false
          idx = (idx + 1) % TITLES.length
          timer = setTimeout(type, 400)
          return
        }
      }

      timer = setTimeout(type, deleting ? 55 : 95)
    }

    const start = setTimeout(type, 1600)
    return () => {
      clearTimeout(start)
      clearTimeout(timer)
    }
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p ref={greetingRef} className="hero-greeting">Hello, I'm</p>
        <h1 ref={nameRef} className="hero-name">
          <span>Jaewoo</span>
          <span>Cho</span>
        </h1>
        <div ref={subtitleRef} className="hero-subtitle">
          <span ref={typingRef} />
          <span className="cursor-blink">|</span>
        </div>
        <div ref={scrollRef} className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
      <div ref={bgTextRef} className="hero-bg-text">FOLIO</div>
    </section>
  )
}
