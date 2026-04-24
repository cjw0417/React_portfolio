import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        x: -70,
        opacity: 0,
        duration: 1,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      })

      gsap.from(imageRef.current, {
        x: 80,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="about">
      <div ref={textRef} className="about-text">
        <p className="section-label">About Me</p>
        <h2 className="about-heading">
          Design을 코드로,<br />아이디어를 현실로
        </h2>
        <p className="about-desc">
          UI/UX 퍼블리셔로 디자인과 개발 사이의 다리 역할을 합니다.
          Figma 시안을 픽셀 퍼펙트하게 구현하고, 부드러운 인터랙션으로
          사용자 경험을 한 단계 높이는 것을 목표로 합니다.
        </p>
        <div className="about-stats">
          <div>
            <p className="stat-num">3+</p>
            <p className="stat-label">Years Exp.</p>
          </div>
          <div>
            <p className="stat-num">20+</p>
            <p className="stat-label">Projects</p>
          </div>
          <div>
            <p className="stat-num">10+</p>
            <p className="stat-label">Clients</p>
          </div>
        </div>
      </div>

      <div ref={imageRef} className="about-image">
        <div className="about-image-inner">
          <div className="about-image-gradient" />
          <span className="about-image-initials">YN</span>
        </div>
        <div className="about-image-deco" />
      </div>
    </section>
  )
}
