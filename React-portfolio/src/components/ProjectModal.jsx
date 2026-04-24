import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import './ProjectModal.scss'

export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null)
  const modalRef  = useRef(null)

  const animateClose = useCallback(() => {
    gsap.timeline({ onComplete: onClose })
      .to(modalRef.current,  { y: 24, opacity: 0, scale: 0.96, duration: 0.22, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.18 }, '<')
  }, [onClose])

  useEffect(() => {
    // 등장 애니메이션
    gsap.timeline()
      .fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.22, ease: 'power2.out' }
      )
      .fromTo(modalRef.current,
        { y: 32, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' },
        '<0.06'
      )

    // 스크롤 잠금
    document.body.style.overflow = 'hidden'

    const onKey = (e) => { if (e.key === 'Escape') animateClose() }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [animateClose])

  const { title, category, longDesc, tags, color, github, demo } = project

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={animateClose}
    >
      <div
        ref={modalRef}
        className="project-modal"
        style={{ '--modal-color': color }}
        onClick={e => e.stopPropagation()}
      >
        {/* 상단 프리뷰 영역 */}
        <div className="project-modal__preview">
          <div className="project-modal__preview-bg" />
          <p className="project-modal__category">{category}</p>
          <h2 className="project-modal__title">{title}</h2>
        </div>

        {/* 하단 콘텐츠 영역 */}
        <div className="project-modal__content">
          <p className="project-modal__desc">{longDesc}</p>

          <div className="project-modal__section">
            <p className="project-modal__label">Tech Stack</p>
            <div className="project-modal__tags">
              {tags.map(t => <span key={t}>{t}</span>)}
            </div>
          </div>

          <div className="project-modal__actions">
            <a href={github} target="_blank" rel="noreferrer" className="modal-btn modal-btn--ghost">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              GitHub
            </a>
            <a href={demo} target="_blank" rel="noreferrer" className="modal-btn modal-btn--fill">
              Live Demo
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M3.5 1a.5.5 0 0 0 0 1H9v5.5a.5.5 0 0 0 1 0v-6a.5.5 0 0 0-.5-.5h-6Zm-2 3a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-1 0v3H2V5a.5.5 0 0 0-.5-.5Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button className="project-modal__close" onClick={animateClose}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path d="M2.47 2.47a.75.75 0 0 1 1.06 0L9 7.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L10.06 9l5.47 5.47a.75.75 0 1 1-1.06 1.06L9 10.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L7.94 9 2.47 3.53a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
