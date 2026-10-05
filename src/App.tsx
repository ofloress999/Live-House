import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  ["O que fazemos", "#livehouse"],
  ["Live Commerce", "#commerce"],
  ["Como funciona", "#processo"],
  ["Contato", "#contato"],
]

const benefits = [
  {
    number: "01",
    title: "TRANSMISSÕES AO VIVO",
    copy: "Criamos experiências ao vivo pensadas para gerar atenção, interação e conversão.",
  },
  {
    number: "02",
    title: "SUA MARCA VENDE MAIS",
    copy: "Transformamos espectadores em clientes através de experiências de Live Commerce.",
  },
  {
    number: "03",
    title: "OPERAÇÃO COMPLETA",
    copy: "Estratégia, produção, apresentação, transmissão e performance em uma única operação.",
  },
]

const processSteps = [
  [
    "01",
    "ESTRATÉGIA",
    "Entendemos a marca, produto, público e objetivos da transmissão.",
  ],
  [
    "02",
    "PLANEJAMENTO",
    "Definimos formato, roteiro, produtos e dinâmica da live.",
  ],
  [
    "03",
    "PRODUÇÃO",
    "Preparamos toda a estrutura necessária para a transmissão.",
  ],
  ["04", "LIVE", "Colocamos sua marca ao vivo diante da audiência."],
  [
    "05",
    "PERFORMANCE",
    "Transformamos audiência, interação e atenção em vendas.",
  ],
]

const stats = [
  ["+XX", "TRANSMISSÕES"],
  ["+XX", "MARCAS"],
  ["+XX", "HORAS AO VIVO"],
  ["+XX", "VENDAS GERADAS"],
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function Brand() {
  return (
    <a
      className="brand"
      href="#intro"
      aria-label="Livehouse — início"
      data-cursor="link"
    >
      <span>LIVE</span>HOUSE<span className="brand-dot">.</span>
    </a>
  )
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const cursor = useRef<HTMLDivElement>(null)
  const cursorLabel = useRef<HTMLSpanElement>(null)
  const [headerDark, setHeaderDark] = useState(false)

  useEffect(() => {
    if (!root.current) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const mm = gsap.matchMedia()

    const context = gsap.context(() => {
      if (!reduceMotion) {
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } })
        intro
          .from(".site-header", { y: -32, opacity: 0, duration: 0.8 })
          .from(".hero-badge", { y: 24, opacity: 0, duration: 0.7 }, "-=.35")
          .from(
            ".hero-line > span",
            { yPercent: 115, rotate: 3, duration: 1.15, stagger: 0.11 },
            "-=.45",
          )
          .from(
            ".hero-orbit",
            { scale: 0.25, opacity: 0, duration: 1.4 },
            "-=1",
          )
          .from(".hero-bottom", { y: 26, opacity: 0, duration: 0.75 }, "-=.75")

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          })
          .to(
            ".hero-title",
            { scale: 1.08, yPercent: -8, transformOrigin: "left center" },
            0,
          )
          .to(".hero-orbit-a", { yPercent: -35, rotate: 55 }, 0)
          .to(".hero-orbit-b", { yPercent: 28, rotate: -30 }, 0)
          .to(".hero-content", { opacity: 0.15 }, 0.5)

        const identity = gsap.timeline({
          scrollTrigger: {
            trigger: ".identity",
            start: "top top",
            end: "+=260%",
            pin: ".identity-stage",
            scrub: 0.8,
            anticipatePin: 1,
          },
        })
        identity
          .fromTo(".question-word", { yPercent: 110, opacity: 0, rotate: 5 }, {
            yPercent: 0,
            opacity: 1,
            rotate: 0,
            stagger: 0.17,
            ease: "power3.out",
          })
          .to(".identity-question", { opacity: 0, scale: 1.15, duration: 0.45 })
          .fromTo(
            ".identity-answer",
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 0.8,
              ease: "power3.inOut",
            },
            "-=.1",
          )
          .from(".answer-kicker", { y: 60, opacity: 0, stagger: 0.1 }, "-=.4")
          .from(
            ".commerce-giant",
            { xPercent: 45, opacity: 0, duration: 0.8 },
            "-=.25",
          )
          .to(".commerce-giant", { xPercent: -32, duration: 1.5, ease: "none" })
          .from(".answer-foot", { y: 35, opacity: 0 }, "-=.5")

        gsap.utils
          .toArray<HTMLElement>(".benefit-card")
          .forEach((card, index, cards) => {
            gsap.from(card, {
              xPercent: index % 2 ? 14 : -14,
              opacity: 0,
              rotate: index % 2 ? 2 : -2,
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                end: "top 44%",
                scrub: 0.7,
              },
            })
            if (index > 0) {
              gsap.to(cards[index - 1], {
                scale: 0.92,
                opacity: 0.3,
                scrollTrigger: {
                  trigger: card,
                  start: "top 58%",
                  end: "top 20%",
                  scrub: true,
                },
              })
            }
          })

        gsap.to(".marquee-track", {
          xPercent: -26,
          ease: "none",
          scrollTrigger: {
            trigger: ".commerce-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })

        gsap.from(".commerce-line", {
          yPercent: 110,
          rotate: 2,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".commerce-headline",
            start: "top 76%",
            end: "bottom 60%",
            scrub: 0.7,
          },
        })

        gsap.fromTo(".timeline-progress", { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 65%",
            end: "bottom 68%",
            scrub: true,
          },
        })

        gsap.utils.toArray<HTMLElement>(".timeline-step").forEach((step) => {
          gsap.from(step, {
            y: 70,
            opacity: 0.15,
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              end: "top 52%",
              scrub: 0.5,
            },
          })
        })

        const impact = gsap.timeline({
          scrollTrigger: {
            trigger: ".impact",
            start: "top top",
            end: "+=180%",
            pin: ".impact-stage",
            scrub: 0.8,
          },
        })
        impact
          .fromTo(".impact-live", { yPercent: 65 }, {
            yPercent: -105,
            ease: "power2.inOut",
          })
          .fromTo(
            ".impact-sell",
            { yPercent: 130 },
            { yPercent: 0, ease: "power2.inOut" },
            0.2,
          )
          .to(".impact-sell", { yPercent: -105, ease: "power2.inOut" }, 0.95)
          .fromTo(
            ".impact-repeat",
            { yPercent: 130 },
            { yPercent: 0, ease: "power2.inOut" },
            1,
          )

        gsap.utils
          .toArray<HTMLElement>(".float-word")
          .forEach((word, index) => {
            gsap.to(word, {
              yPercent: index % 2 ? -180 : 160,
              xPercent: index % 3 ? 30 : -25,
              rotate: index % 2 ? 14 : -12,
              ease: "none",
              scrollTrigger: {
                trigger: ".impact",
                start: "top bottom",
                end: "bottom top",
                scrub: 1 + index * 0.05,
              },
            })
          })

        gsap.from(".stat-value", {
          yPercent: 110,
          stagger: 0.12,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 70%",
            once: true,
          },
        })

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 55,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          })
        })
      }

      gsap.utils
        .toArray<HTMLElement>("[data-header-theme]")
        .forEach((section) => {
          const darkText = section.dataset.headerTheme === "dark"
          ScrollTrigger.create({
            trigger: section,
            start: "top 8%",
            end: "bottom 8%",
            onEnter: () => setHeaderDark(darkText),
            onEnterBack: () => setHeaderDark(darkText),
          })
        })

      gsap.to(".scroll-progress-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
      })

      mm.add("(pointer: fine) and (min-width: 900px)", () => {
        if (!cursor.current) return
        const moveX = gsap.quickTo(cursor.current, "x", {
          duration: 0.25,
          ease: "power3",
        })
        const moveY = gsap.quickTo(cursor.current, "y", {
          duration: 0.25,
          ease: "power3",
        })
        const onMove = (event: MouseEvent) => {
          moveX(event.clientX)
          moveY(event.clientY)
          gsap.to(".hero-orbit", {
            x: (event.clientX / window.innerWidth - 0.5) * 22,
            y: (event.clientY / window.innerHeight - 0.5) * 22,
            duration: 1.2,
            overwrite: "auto",
          })
        }
        const onOver = (event: MouseEvent) => {
          const target = (event.target as HTMLElement).closest<HTMLElement>(
            "[data-cursor]",
          )
          if (!target || !cursor.current || !cursorLabel.current) return
          const label = target.dataset.cursor === "live" ? "VIEW" : "↗"
          cursorLabel.current.textContent = label
          cursor.current.classList.add("is-active")
        }
        const onOut = (event: MouseEvent) => {
          if (
            !(event.target as HTMLElement).closest("[data-cursor]") ||
            !cursor.current
          )
            return
          cursor.current.classList.remove("is-active")
          if (cursorLabel.current) cursorLabel.current.textContent = ""
        }
        window.addEventListener("mousemove", onMove)
        document.addEventListener("mouseover", onOver)
        document.addEventListener("mouseout", onOut)
        return () => {
          window.removeEventListener("mousemove", onMove)
          document.removeEventListener("mouseover", onOver)
          document.removeEventListener("mouseout", onOut)
        }
      })
    }, root)

    return () => {
      mm.revert()
      context.revert()
    }
  }, [])

  const magneticMove = (event: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    gsap.to(element, {
      x: (event.clientX - rect.left - rect.width / 2) * 0.2,
      y: (event.clientY - rect.top - rect.height / 2) * 0.2,
      duration: 0.35,
      ease: "power2.out",
    })
  }

  const magneticLeave = (event: React.MouseEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, .35)",
    })
  }

  return (
    <div className="app" ref={root}>
      <div className="cursor" ref={cursor} aria-hidden="true">
        <span ref={cursorLabel} />
      </div>

      <header
        className={`site-header ${headerDark ? "header-dark" : ""}`}
      >
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(([label, href]) => (
            <a href={href} key={href} data-cursor="link">
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contato" data-cursor="link">
          FALE COM A LIVEHOUSE <Arrow />
        </a>
      </header>

      <aside className="page-progress" aria-hidden="true">
        <span>INTRO</span>
        <div className="progress-rail">
          <div className="scroll-progress-fill" />
        </div>
        <span>CONTATO</span>
      </aside>

      <main>
        <section className="hero" id="intro" data-header-theme="light">
          <div className="hero-noise" />
          <div className="hero-orbit hero-orbit-a">
            <span>LIVE</span>
          </div>
          <div className="hero-orbit hero-orbit-b" />
          <div className="hero-content">
            <div className="hero-badge">
              <i /> LIVE COMMERCE <span>2026</span>
            </div>
            <h1 className="hero-title">
              <span className="hero-line">
                <span>TRANSFORMAMOS</span>
              </span>
              <span className="hero-line hero-line-indent">
                <span>AUDIÊNCIA</span>
              </span>
              <span className="hero-line">
                <span>
                  EM <em>VENDAS.</em>
                </span>
              </span>
            </h1>
            <div className="hero-bottom">
              <p>
                Somos a sua operação de Live Commerce. Criamos transmissões ao
                vivo que conectam marcas, audiência e vendas em tempo real.
              </p>
              <div className="hero-actions">
                <a
                  className="pill pill-light"
                  href="#livehouse"
                  data-cursor="link"
                >
                  CONHEÇA A LIVEHOUSE <span>↓</span>
                </a>
                <a className="text-link" href="#contato" data-cursor="link">
                  FALE COM A GENTE <Arrow />
                </a>
              </div>
            </div>
          </div>
          <div className="discover">
            SCROLL TO DISCOVER <span />
          </div>
        </section>

        <section className="identity" id="livehouse" data-header-theme="light">
          <div className="identity-stage">
            <div className="editorial-meta meta-left">
              LIVEHOUSE®
              <br />
              LIVE COMMERCE
            </div>
            <div className="editorial-meta meta-right">
              TIKTOK SHOP
              <br />
              2026
            </div>
            <div
              className="identity-question"
              aria-label="O que é a Livehouse?"
            >
              {["O QUE", "É A", "LIVE", "HOUSE?"].map((word) => (
                <span className="question-mask" key={word}>
                  <span className="question-word">{word}</span>
                </span>
              ))}
            </div>
            <div className="identity-answer">
              <div className="answer-kickers">
                <span className="answer-kicker">SOMOS A SUA</span>
                <span className="answer-kicker">OPERAÇÃO DE</span>
              </div>
              <div className="commerce-giant">LIVE COMMERCE</div>
              <div className="answer-foot">
                AO VIVO NO <strong>TIKTOK SHOP</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits" data-header-theme="light">
          <div className="section-intro">
            <p className="eyebrow" data-reveal>
              O QUE FAZEMOS <span>↘</span>
            </p>
            <h2 data-reveal>
              TRANSFORMAMOS
              <br />
              AUDIÊNCIA EM
              <br />
              <em>VENDAS.</em>
            </h2>
            <p className="intro-copy" data-reveal>
              Transmissões ao vivo que vendem em tempo real.
            </p>
          </div>
          <div className="benefits-stack">
            {benefits.map((benefit) => (
              <article
                className="benefit-card"
                key={benefit.number}
                data-cursor="live"
              >
                <span className="card-number">{benefit.number}</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.copy}</p>
                </div>
                <span className="card-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section
          className="commerce-section"
          id="commerce"
          data-header-theme="dark"
        >
          <div className="section-index">02 / LIVE COMMERCE</div>
          <h2 className="commerce-headline">
            <span className="line-mask">
              <span className="commerce-line">NÃO É SÓ</span>
            </span>
            <span className="line-mask">
              <span className="commerce-line thin">UMA LIVE.</span>
            </span>
            <span className="line-mask space-top">
              <span className="commerce-line">É UM CANAL</span>
            </span>
            <span className="line-mask">
              <span className="commerce-line">
                DE <em>VENDAS.</em>
              </span>
            </span>
          </h2>
          <div
            className="marquee"
            aria-label="Live, audiência, engajamento, conversão, vendas"
          >
            <div className="marquee-track">
              <span>LIVE</span>
              <i>●</i>
              <span className="outline">AUDIÊNCIA</span>
              <i>●</i>
              <span>ENGAJAMENTO</span>
              <i>●</i>
              <span className="outline">CONVERSÃO</span>
              <i>●</i>
              <span>VENDAS</span>
              <i>●</i>
              <span>LIVE</span>
              <i>●</i>
              <span className="outline">AUDIÊNCIA</span>
            </div>
          </div>
        </section>

        <section className="process" id="processo" data-header-theme="light">
          <div className="process-heading">
            <p className="eyebrow" data-reveal>
              COMO FUNCIONA <span>05 ETAPAS</span>
            </p>
            <h2 data-reveal>
              DA ESTRATÉGIA
              <br />
              <span>AO AO VIVO.</span>
            </h2>
          </div>
          <div className="timeline">
            <div className="timeline-line">
              <span className="timeline-progress" />
            </div>
            {processSteps.map(([number, title, copy]) => (
              <article className="timeline-step" key={number}>
                <span className="step-dot" />
                <span className="step-number">{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="impact" data-header-theme="light">
          <div className="impact-stage">
            <span className="float-word float-a">COMMERCE</span>
            <span className="float-word float-b">CONTENT</span>
            <span className="float-word float-c">AUDIENCE</span>
            <span className="float-word float-d">SALES</span>
            <span className="float-word float-e">TIKTOK SHOP</span>
            <div className="impact-word impact-live">LIVE</div>
            <div className="impact-word impact-sell">SELL</div>
            <div className="impact-word impact-repeat">REPEAT.</div>
          </div>
        </section>

        <section className="stats" id="resultados" data-header-theme="light">
          <div className="stats-heading">
            <p className="eyebrow" data-reveal>
              RESULTADOS / 2026
            </p>
            <h2 data-reveal>
              LIVE EM
              <br />
              <em>NÚMEROS.</em>
            </h2>
            <p data-reveal>
              Dados em atualização. Os valores finais serão publicados em breve.
            </p>
          </div>
          <div className="stats-grid">
            {stats.map(([value, label], index) => (
              <article className="stat" key={label}>
                <span>0{index + 1}</span>
                <div className="stat-mask">
                  <strong className="stat-value">{value}</strong>
                </div>
                <p>{label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta" id="contato" data-header-theme="light">
          <div className="cta-orbit" />
          <p className="eyebrow" data-reveal>
            SUA MARCA ESTÁ PRONTA?
          </p>
          <h2 data-reveal>
            VAMOS
            <br />
            <span>ENTRAR</span>
            <br />
            AO VIVO?
          </h2>
          <a
            className="magnetic-cta"
            href="mailto:contato@livehouse.com.br"
            data-cursor="link"
            onMouseMove={magneticMove}
            onMouseLeave={magneticLeave}
          >
            <span>
              FALE COM A<br />
              LIVEHOUSE
            </span>
            <Arrow />
          </a>
          <div className="cta-tags">
            <span>LIVE COMMERCE</span>
            <span>TIKTOK SHOP</span>
            <span>ESTRATÉGIA</span>
            <span>PRODUÇÃO</span>
            <span>PERFORMANCE</span>
          </div>
        </section>
      </main>

      <footer data-header-theme="light">
        <div className="footer-top">
          <Brand />
          <p>
            Transformamos audiência
            <br />
            em vendas.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span>SOCIAL</span>
            <a
              href="https://instagram.com/livehouse.ofc"
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
            >
              Instagram <Arrow />
            </a>
            <a
              href="https://www.tiktok.com/@livehouse.ofc"
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
            >
              TikTok <Arrow />
            </a>
          </div>
          <div>
            <span>CONTATO</span>
            <a href="mailto:contato@livehouse.com.br" data-cursor="link">
              E-mail <Arrow />
            </a>
            <a
              href="https://instagram.com/livehouse.ofc"
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
            >
              @livehouse.ofc
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 LIVEHOUSE</span>
          <span>Uma empresa controlada pela SRX Holdings</span>
          <a href="#intro">VOLTAR AO TOPO ↑</a>
        </div>
      </footer>
    </div>
  )
}
