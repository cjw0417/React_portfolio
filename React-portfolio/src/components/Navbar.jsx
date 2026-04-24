import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Navbar.css'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Works', href: '#works' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.4,
    })
  }, [])

  return (
    <nav ref={navRef} className="navbar">
      <span className="navbar-logo">Portfolio</span>
      <ul className="navbar-links">
        {LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
