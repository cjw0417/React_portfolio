import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y } from 'swiper/modules'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'swiper/css'
import './Works.css'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: '쇼핑몰 리디자인',
    category: 'E-Commerce',
    desc: '사용자 구매 경험 개선을 위한 전면 UI 리디자인. 전환율 35% 향상.',
    tags: ['React', 'GSAP', 'Figma', 'CSS3'],
    gradient: 'g1',
  },
  {
    title: '기업 홈페이지',
    category: 'Corporate Website',
    desc: '스크롤 인터랙션과 GSAP 애니메이션으로 브랜드 아이덴티티 강화.',
    tags: ['HTML5', 'GSAP', 'Swiper', 'Sass'],
    gradient: 'g2',
  },
  {
    title: '모바일 앱 UI',
    category: 'Mobile Publishing',
    desc: 'iOS/Android 앱 디자인 시안을 React 웹뷰로 픽셀 퍼펙트 퍼블리싱.',
    tags: ['React', 'TypeScript', 'CSS Modules'],
    gradient: 'g3',
  },
  {
    title: '브랜드 랜딩페이지',
    category: 'Landing Page',
    desc: '신규 브랜드 런칭을 위한 풀스크린 인터랙티브 랜딩 페이지.',
    tags: ['GSAP', 'ScrollTrigger', 'Vite', 'Sass'],
    gradient: 'g4',
  },
]

export default function Works() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [swiper, setSwiper] = useState(null)

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="works" ref={sectionRef} className="works">
      <div ref={headerRef} className="works-header">
        <div>
          <p className="section-label">Works</p>
          <h2 className="works-heading">주요 프로젝트</h2>
        </div>
        <div className="swiper-nav">
          <button className="swiper-btn" onClick={() => swiper?.slidePrev()}>←</button>
          <button className="swiper-btn" onClick={() => swiper?.slideNext()}>→</button>
        </div>
      </div>

      <Swiper
        modules={[A11y]}
        onSwiper={setSwiper}
        slidesPerView={1.15}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1.4, spaceBetween: 24 },
          1024: { slidesPerView: 2.15, spaceBetween: 28 },
        }}
        className="works-swiper"
      >
        {PROJECTS.map((p, i) => (
          <SwiperSlide key={i} className="work-slide">
            <div className={`work-bg ${p.gradient}`}>
              <div className="work-overlay" />
              <span className="work-bg-number">{String(i + 1).padStart(2, '0')}</span>
              <div className="work-info">
                <p className="work-category">{p.category}</p>
                <h3 className="work-title">{p.title}</h3>
                <p className="work-desc">{p.desc}</p>
                <div className="work-tags">
                  {p.tags.map(t => (
                    <span key={t} className="work-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
