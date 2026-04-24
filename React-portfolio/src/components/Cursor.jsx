import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Cursor.scss'

export default function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const path = cursor.querySelector('path')

    gsap.set(cursor, { x: -40, y: -40 })

    const onMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        ease: 'power2.out',
      })
    }

    const onEnter = () => gsap.to(path, {
      fill: 'rgba(232,184,75,0.95)',
      stroke: '#7a5500',
      duration: 0.18,
    })

    const onLeave = () => gsap.to(path, {
      fill: 'white',
      stroke: '#1a1a1a',
      duration: 0.18,
    })

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div ref={cursorRef} className="cursor-arrow">
      <svg
        width="18"
        height="22"
        viewBox="0 0 13 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 1L1.5 13.5L5 10L7.5 16L9.5 15L7 9.5L12.5 9.5Z"
          fill="white"
          stroke="#1a1a1a"
          strokeWidth="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
