import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { name: 'HTML5', icon: '🌐' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'GSAP', icon: '✨' },
  { name: 'Figma', icon: '🖌️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Sass', icon: '💅' },
  { name: 'Git', icon: '🔀' },
  { name: 'Responsive', icon: '📱' },
]

export default function Skills() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      })

      gsap.from(gridRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="skills">
      <div ref={headerRef} className="skills-header">
        <p className="section-label">Skills</p>
        <h2 className="skills-heading">사용하는 기술 스택</h2>
      </div>
      <div ref={gridRef} className="skills-grid">
        {SKILLS.map(({ name, icon }) => (
          <div key={name} className="skill-card">
            <span className="skill-icon">{icon}</span>
            <span className="skill-name">{name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
