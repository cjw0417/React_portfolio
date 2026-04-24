import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(innerRef.current.children, {
        y: 55,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 68%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="contact">
      <div className="contact-bg-text">CONTACT</div>
      <div ref={innerRef} className="contact-inner">
        <p className="section-label">Contact</p>
        <h2 className="contact-heading">함께 작업해요</h2>
        <p className="contact-sub">
          프로젝트 문의나 협업 제안이 있으시면 편하게 연락주세요.<br />
          빠른 시일 내에 답변드리겠습니다.
        </p>
        <form className="contact-form" onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="홍길동" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="hello@example.com" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="프로젝트에 대해 말씀해주세요..." />
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
        <div className="contact-links">
          <a href="#" className="contact-link">GitHub</a>
          <a href="#" className="contact-link">LinkedIn</a>
          <a href="#" className="contact-link">Email</a>
        </div>
        <p className="contact-footer">© 2025 Your Name. All rights reserved.</p>
      </div>
    </section>
  )
}
