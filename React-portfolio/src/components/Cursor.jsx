import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Cursor.css'

export default function Cursor() {
  const dotRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const follower = followerRef.current

    gsap.set([dot, follower], { xPercent: -50, yPercent: -50 })

    const onMove = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' })
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power2.out' })
    }

    const onEnter = () => gsap.to(follower, {
      width: 56,
      height: 56,
      borderColor: 'rgba(245,200,66,0.6)',
      duration: 0.3,
    })
    const onLeave = () => gsap.to(follower, {
      width: 36,
      height: 36,
      borderColor: 'rgba(239,239,239,0.25)',
      duration: 0.3,
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
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
