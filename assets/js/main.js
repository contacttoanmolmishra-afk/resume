
(function () {
  "use strict";

  /**
   * Page loader: hide once key widgets are ready
   */
  // TESTING: keep loader always visible (set to false after testing)
  const FORCE_SHOW_LOADER = false

  const LOADER_STEPS = [
    { pct: 10, text: 'Igniting engines…' },
    { pct: 24, text: 'Charting orbit…' },
    { pct: 40, text: 'Loading highlights…' },
    { pct: 58, text: 'Aligning planets…' },
    { pct: 76, text: 'Painting stardust…' },
    { pct: 90, text: 'Final checks…' }
  ]

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

  const setLoaderPct = (pct) => {
    const loader = document.getElementById('page-loader')
    if (!loader) return
    loader.style.setProperty('--shoot-pct', `${clamp(pct, 0, 100).toFixed(2)}%`)
  }

  const setLoaderText = (t) => {
    const el = document.getElementById('page-loader-text')
    if (el) el.textContent = t
  }

  const startLoaderSync = ({ mode = 'real', durationMs = 2500 } = {}) => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setLoaderPct(70)
      setLoaderText('Loading…')
      return () => { }
    }

    let raf = 0
    let start = performance.now()

    const tick = (now) => {
      const t = now - start
      let p = durationMs > 0 ? t / durationMs : 1

      if (mode === 'loop') {
        p = (t % durationMs) / durationMs
      } else {
        // In "real" mode, don't reach 100% until we are actually done.
        p = clamp(p, 0, 0.95)
      }

      const pct = p * 100
      setLoaderPct(pct)

      const idx = Math.min(
        LOADER_STEPS.length - 1,
        Math.floor(p * LOADER_STEPS.length)
      )
      const stepText = LOADER_STEPS[idx]?.text || 'Loading…'
      setLoaderText(stepText)

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }

  const hideLoader = () => {
    document.body.classList.remove('is-loading')
    const el = document.getElementById('page-loader')
    if (el) {
      el.classList.add('is-done')
      el.style.opacity = '0'
      el.style.transition = 'opacity 220ms ease'
      setTimeout(() => el.remove(), 260)
    }
  }

  const waitFor = (eventName) =>
    new Promise((resolve) => window.addEventListener(eventName, resolve, { once: true }))

  window.addEventListener('DOMContentLoaded', () => {
    // Local dev fallback: clean URLs require server rewrites.
    // When opened via file:// (or a server without .htaccess rules), map clean URLs to real files.
    try {
      const isLocalFile = window.location && window.location.protocol === 'file:'
      if (isLocalFile) {
        const map = new Map([
          ['/resume', 'assets/docs/Narvir%20Lakum-2026.pdf'],
        ])

        document.querySelectorAll('a[href^="/resume"]').forEach((a) => {
          const href = a.getAttribute('href') || ''
          const clean = href.replace(/\/$/, '')
          if (map.has(clean)) a.setAttribute('href', map.get(clean))
        })
      }
    } catch (_) {}

    const stopSync = startLoaderSync({ mode: FORCE_SHOW_LOADER ? 'loop' : 'real', durationMs: FORCE_SHOW_LOADER ? 3600 : 2500 })
    if (FORCE_SHOW_LOADER) return
    const timeout = new Promise((resolve) => setTimeout(resolve, 2500))
    Promise.race([
      Promise.all([waitFor('planets:ready'), waitFor('certificates:ready')]),
      timeout
    ]).then(() => {
      stopSync()
      const loader = document.getElementById('page-loader')
      if (loader) loader.classList.add('is-done')
      setLoaderPct(100)
      const txt = document.getElementById('page-loader-text')
      if (txt) txt.textContent = 'Loading completed'
      requestAnimationFrame(() => requestAnimationFrame(hideLoader))
    })
  })

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    const target = select(el)
    if (!target) return

    const header = select('#header')
    const offset = header ? Math.min(header.offsetHeight, 80) : 0
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset

    window.scrollTo({ top, behavior: 'smooth' })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  // Header is always sticky (landing/hero removed)

  /**
   * Scroll-spy: update active nav link while scrolling
   */
  const updateActiveNav = () => {
    const navlinks = select('#navbar .nav-link', true) || []
    const sections = select('section', true) || []
    if (!navlinks.length || !sections.length) return

    const header = select('#header')
    const offset = header?.classList.contains('header-top')
      ? Math.min(header.offsetHeight, 80) + 10
      : 10

    const y = (window.scrollY || window.pageYOffset || 0) + offset

    let currentId = 'about'
    sections.forEach((sec) => {
      const top = sec.offsetTop
      const bottom = top + sec.offsetHeight
      if (y >= top && y < bottom) currentId = sec.id
    })

    navlinks.forEach((a) => {
      const href = a.getAttribute('href') || ''
      const isActive = href === `#${currentId}`
      a.classList.toggle('active', isActive)
    })
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true })
  window.addEventListener('load', updateActiveNav)

  /**
   * Global reveal on scroll (minor animation across site)
   */
  window.addEventListener('load', () => {
    const revealTargets = select('.reveal', true) || []
    if (!revealTargets.length) return

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealTargets.forEach((el) => el.classList.add('in-view'))
      return
    }

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((el) => el.classList.add('in-view'))
      return
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })

    revealTargets.forEach((el) => io.observe(el))
  })

  /**
   * Typewriter for section subtitles (runs once on reveal)
   */
  window.addEventListener('load', () => {
    const targets = select('.typewrite', true) || []
    if (!targets.length) return

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const typeOne = (el) => {
      if (!el || el.dataset.typed === 'true') return
      const fullText = (el.getAttribute('data-typewrite') || el.textContent || '').trim()
      if (!fullText) return

      el.dataset.typed = 'true'
      el.textContent = ''
      el.classList.add('typing')

      let i = 0
      const step = () => {
        i += 1
        el.textContent = fullText.slice(0, i)
        if (i < fullText.length) {
          setTimeout(step, 28)
        } else {
          // Keep caret briefly, then stop.
          setTimeout(() => el.classList.remove('typing'), 500)
        }
      }
      step()
    }

    const startTypingIfVisible = (el) => {
      const parentTitle = el.closest('.section-title')
      if (parentTitle && parentTitle.classList.contains('in-view')) {
        typeOne(el)
      }
    }

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => typeOne(el))
      return
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeOne(entry.target)
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.35 })

    targets.forEach((el) => {
      startTypingIfVisible(el)
      if (el.dataset.typed !== 'true') io.observe(el)
    })
  })

  /**
   * Smooth scroll for navbar anchors (single-page scroll)
   */
  on('click', '#navbar .nav-link', function (e) {
    if (!this.hash) return
    const section = select(this.hash)
    if (!section) return

    e.preventDefault()

    const navbar = select('#navbar')
    if (navbar?.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile')
      const navbarToggle = select('.mobile-nav-toggle')
      navbarToggle?.classList.toggle('bi-list')
      navbarToggle?.classList.toggle('bi-x')
    }

    scrollto(this.hash)
  }, true)

  /**
   * If page loads with a hash, scroll to it
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      scrollto(window.location.hash)
    } else {
      // Default to About (no landing page)
      if ((window.scrollY || window.pageYOffset || 0) === 0) {
        requestAnimationFrame(() => requestAnimationFrame(() => scrollto('#about')))
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Resume timeline reveal (minor animation)
   */
  window.addEventListener('load', () => {
    const items = select('.resume .resume-item', true) || []
    if (!items.length) return

    // If user prefers reduced motion, make everything visible immediately.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('in-view'))
      return
    }

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in-view'))
      return
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    items.forEach((el) => io.observe(el))
  })

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });
  // Allow other scripts (certificates) to reload bindings after dynamic DOM updates.
  window._portfolioLightbox = portfolioLightbox;

  /**
   * Initiate Pure Counter 
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

})()