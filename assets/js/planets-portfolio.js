window.addEventListener('DOMContentLoaded', () => {
  const stage = document.getElementById('planets-stage');
  const panel = document.getElementById('project-panel');
  if (!stage || !panel) return;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // TESTING: concentric "solar system" orbits (set false to return to floating/collisions mode)
  const SOLAR_SYSTEM_MODE = false;

  // Projects render in the right panel (same-page). No internal redirects.
 const PROJECTS = [
  {
    id: 'maui63',
    name: 'MAUI63 – Marine Conservation Monitoring App',
    img: 'assets/img/portfolio/maui63.png',
    priority: 1,
    featured: true,
    tag: 'Marine Conservation',
    subtitle: 'Marine Monitoring / Real-Time Tracking Mobile Application',
    description: 'MAUI63 is a marine conservation mobile application designed to support researchers in monitoring and tracking Māui dolphins. The application provides real-time tracking, data visualization, sighting management, drone data streaming, and marine zone monitoring.',
    highlights: [
      'Developed a mobile application to support real-time tracking and data visualization of Māui dolphins.',
      'Enabled researchers to record and manage dolphin sightings.',
      'Implemented drone data streaming capabilities for marine monitoring.',
      'Built functionality to monitor designated marine zones and support research operations.'
    ],
    tech: ['Flutter', 'Dart', 'MVVM', 'REST API', 'Google Maps', 'Firebase'],
    links: [
      { label: 'Website', url: 'https://www.maui63.org' }
    ],
  },
{
  id: 'visitor-host',
  name: 'Visitor Host – Visitor Management System',
  img: 'assets/img/portfolio/visitor-host.png',
  priority: 1,
  featured: false,
  tag: 'Visitor Management',
  subtitle: 'Host / Employee Visitor Management Mobile Application',
  description: 'Visitor Host is a mobile application designed for employees and hosts to manage workplace visitors, including visitor requests, approvals, check-in, check-out, and visitor information.',
  highlights: [
    'Developed a mobile application for employees and hosts to manage workplace visitors.',
    'Implemented visitor request, approval, and visit management workflows.',
    'Built visitor check-in and check-out functionality for secure workplace operations.',
    'Integrated REST APIs for visitor, host, and visit data management.',
    'Designed responsive and user-friendly interfaces for efficient visitor handling.'
  ],
  tech: ['Flutter', 'Dart', 'REST API', 'Firebase', 'State Management'],
  links: [],
},

{
  id: 'visitor',
  name: 'Visitor – Visitor Management System',
  img: 'assets/img/portfolio/visitor.png',
  priority: 1,
  featured: false,
  tag: 'Visitor Management',
  subtitle: 'Visitor Registration / Check-In / Check-Out Mobile Application',
  description: 'Visitor is a mobile application focused on managing the complete visitor journey within an organization, from registration and verification to check-in and check-out.',
  highlights: [
    'Developed visitor registration and management workflows for workplace environments.',
    'Implemented visitor check-in and check-out functionality.',
    'Built visitor details, visit status, and host information management.',
    'Integrated backend APIs for real-time visitor data synchronization.',
    'Implemented search and filtering functionality for efficient visitor management.',
    'Focused on a simple and responsive UI to improve the visitor experience.'
  ],
  tech: ['Flutter', 'Dart', 'REST API', 'Firebase', 'State Management', 'QR Code'],
  links: [],
},

{
  id: 'hrms',
  name: 'HRMS – Human Resource Management System',
  img: 'assets/img/portfolio/hrms.png',
  priority: 1,
  featured: false,
  tag: 'HR Management Platform',
  subtitle: 'Employee Management / Attendance / Leave Management',
  description: 'HRMS is a mobile-based human resource management application designed to simplify employee and HR operations. The platform supports employee management, attendance, leave management, and other day-to-day HR workflows.',
  highlights: [
    'Developed a mobile HRMS application for managing employee and organizational workflows.',
    'Implemented employee profile and employee information management.',
    'Built attendance tracking and daily attendance management features.',
    'Implemented leave application, approval, and leave history workflows.',
    'Integrated REST APIs for secure and reliable HR data synchronization.',
    'Developed reusable UI components and optimized application performance.',
    'Implemented authentication and role-based access for different users.'
  ],
  tech: ['Flutter', 'Dart', 'REST API', 'Firebase', 'State Management', 'Authentication'],
  links: [],
},
  {
    id: 'faleyat',
    name: 'Faleyat – Event Ticket Booking App',
    img: 'assets/img/portfolio/faleyat.png',
    priority: 1,
    featured: false,
    tag: 'Event Booking Platform',
    subtitle: 'Event Discovery / Ticket Booking / Digital Payments',
    description: 'Faleyat is a cross-platform event ticket booking application that enables users to discover events, select seats, purchase tickets, and manage digital bookings through an integrated mobile experience.',
    highlights: [
      'Built a cross-platform event booking application using Flutter.',
      'Implemented event discovery and live event listing functionality.',
      'Developed interactive seat selection and digital ticketing workflows.',
      'Integrated secure Razorpay and Stripe payment gateways.',
      'Implemented Firebase and REST API integrations for application data and services.'
    ],
    tech: ['Flutter', 'Dart', 'MVVM', 'Firebase', 'REST API', 'Razorpay', 'Stripe'],
    links: [],
  },

  {
    id: 'rispondo-io',
    name: 'Rispondo Io – Spam Call Blocking & Caller ID App',
    img: 'assets/img/portfolio/rispondo-io.png',
    priority: 1,
    featured: true,
    tag: 'Caller ID & Security',
    subtitle: 'Spam Call Blocking / Caller Identification Mobile Application',
    description: 'Rispondo Io is a mobile application focused on caller identification and spam call protection. The application provides real-time caller information along with customizable call-blocking and contact management features.',
    highlights: [
      'Created a call screening and spam-blocking application with real-time caller data.',
      'Integrated Android Telephony APIs for call screening and call management.',
      'Implemented customizable user blocklists for unwanted callers.',
      'Built contact synchronization functionality.',
      'Used SQLite for efficient local data management and REST APIs for remote data integration.'
    ],
    tech: ['Flutter', 'Dart', 'MVVM', 'SQLite', 'REST API', 'Android Telephony API'],
    links: [],
  },

  {
    id: 'oklend',
    name: 'Oklend – Second-Hand Product Rental Platform',
    img: 'assets/img/portfolio/oklend.png',
    priority: 2,
    featured: false,
    tag: 'Rental Marketplace',
    subtitle: 'Second-Hand Products / Rental Marketplace Mobile Application',
    description: 'Oklend is a second-hand product rental marketplace designed for renting products across categories such as electronics, fashion, tools, and other reusable goods. The platform supports product listings, rental agreements, and location-based discovery.',
    highlights: [
      'Built a rental marketplace for second-hand electronics, fashion, tools, and other products.',
      'Implemented product listing and rental management workflows.',
      'Developed rental agreement functionality for marketplace transactions.',
      'Implemented location-based search to help users discover nearby products.',
      'Built the application using Flutter, FlutterFlow, and GetX architecture.'
    ],
    tech: ['Flutter', 'FlutterFlow', 'Dart', 'MVC', 'GetX'],
    links: [],
  },
{
  id: 'conflict-solver',
  name: 'ConflictSolver – AI-Powered Conflict Resolution Platform',
  img: 'assets/img/portfolio/conflict-solver.png',
  priority: 1,
  featured: true,
  tag: 'AI-Powered Platform',
  subtitle: 'Conflict Resolution / Workplace Culture / AI Assistant',
  description: 'ConflictSolver is an AI-powered platform designed to help individuals and organizations handle workplace conflicts in healthier and more constructive ways. The application provides guidance and practical approaches for dealing with conflicts, helping organizations build a healthier conflict culture and improve workplace communication.',
  highlights: [
    'Developed an AI-powered application focused on workplace conflict resolution and healthy communication.',
    'Implemented AI-driven interactions to help users understand and address conflict situations.',
    'Built user workflows for discovering healthier and more constructive ways to handle workplace conflicts.',
    'Designed an intuitive mobile experience focused on privacy, usability, and effective communication.',
    'Integrated backend APIs to manage user interactions and application data.',
    'Contributed to a platform designed to improve workplace culture through better conflict management.'
  ],
  tech: [
    'Flutter',
    'Dart',
    'AI Integration',
    'REST API',
    'State Management',
    'AI Chat',
    'Workplace Collaboration'
  ],
  links: [
    {
      label: 'Website',
      url: 'https://www.conflict-solver.com/'
    }
  ],
},

{
  id: 'grocery-eaze',
  name: 'GroceryEaze – Smart Grocery Shopping & Collaboration App',
  img: 'assets/img/portfolio/grocerEaze.png',
  priority: 2,
  featured: false,
  tag: 'Grocery & Collaboration',
  subtitle: 'Grocery Shopping / Product Discussion / Team Chat',
  description: 'GroceryEaze is a grocery shopping application that helps users discover and purchase products while collaborating with team members. The application provides communication features that allow users to discuss products, share opinions, and make better purchasing decisions together.',
  highlights: [
    'Developed a grocery shopping application for browsing and purchasing products.',
    'Implemented product discovery and shopping workflows for a smooth purchasing experience.',
    'Built team-based chat functionality for users to discuss and share opinions about products.',
    'Enabled users to collaborate with team members before making purchasing decisions.',
    'Designed intuitive product and communication interfaces for an easy shopping experience.',
    'Integrated APIs for product, user, and chat data management.'
  ],
  tech: [
    'Flutter',
    'Dart',
    'REST API',
    'Real-Time Chat',
    'State Management',
    'E-commerce',
    'Firebase'
  ],
  links: [],
},
  {
    id: 'deonde',
    name: 'DEONDE – Food & Grocery Delivery Platform',
    img: 'assets/img/portfolio/deonde.png',
    priority: 2,
    featured: true,
    tag: 'Food & Grocery SaaS',
    subtitle: 'Multi-Store / Restaurant Management / Delivery Platform',
    description: 'DEONDE is a SaaS-based food and grocery delivery platform designed to support multiple business categories, stores, and restaurant chains. The platform also includes restaurant waiting management capabilities.',
    highlights: [
      'Developed a SaaS-based food and grocery delivery application.',
      'Supported multiple business categories within a unified platform.',
      'Implemented support for multi-store and multi-restaurant chains.',
      'Developed restaurant waiting management functionality.',
      'Built cross-platform application features using Flutter and Dart.'
    ],
    tech: ['Flutter', 'Dart', 'MVC'],
    links: [],
  },

  {
    id: 'diga',
    name: 'DiGA – Medical Appointment Booking App',
    img: 'assets/img/portfolio/diga.png',
    priority: 1,
    featured: true,
    tag: 'Healthcare Platform',
    subtitle: 'Medical Appointment / Patient Management Mobile Application',
    description: 'DiGA is a healthcare mobile application that enables users to book, reschedule, and track medical appointments. The application integrates Firebase and REST APIs to provide reliable appointment and patient data management.',
    highlights: [
      'Developed a healthcare application for booking medical appointments.',
      'Implemented appointment rescheduling and tracking workflows.',
      'Integrated Firebase push notifications for appointment-related updates.',
      'Built patient data management functionality.',
      'Integrated REST APIs for communication between the mobile application and backend services.'
    ],
    tech: ['Flutter', 'Dart', 'MVVM', 'Firebase', 'REST API'],
    links: [],
  },
];
  const PLANET_PROJECTS = PROJECTS.filter((p) => p.featured === true);
  const ACTIVE_PROJECTS = PLANET_PROJECTS.length ? PLANET_PROJECTS : PROJECTS;
  const OTHER_PROJECTS = PLANET_PROJECTS.length
    ? PROJECTS.filter((p) => p.featured !== true)
    : [];

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const rand = (min, max) => Math.random() * (max - min) + min;

  const stageRect = () => stage.getBoundingClientRect();

  // For orbit mode: ensure a body never leaves the stage bounds for a given angle.
  const maxOrbitForAngle = (angle, bodyR, box, pad) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const xMin = bodyR + pad;
    const xMax = box.w - bodyR - pad;
    const yMin = bodyR + pad;
    const yMax = box.h - bodyR - pad;

    let maxR = Infinity;

    if (Math.abs(cos) > 1e-6) {
      const rx = cos > 0 ? (xMax - box.cx) / cos : (xMin - box.cx) / cos;
      maxR = Math.min(maxR, rx);
    }

    if (Math.abs(sin) > 1e-6) {
      const ry = sin > 0 ? (yMax - box.cy) / sin : (yMin - box.cy) / sin;
      maxR = Math.min(maxR, ry);
    }

    return Math.max(0, maxR);
  };

  const isSmallScreen = () => window.matchMedia('(max-width: 768px)').matches;
  const isTinyScreen = () => window.matchMedia('(max-width: 480px)').matches;

  // Size bounds (auto-scaled in mount for 20–30 projects)
  // Keep planets smaller on mobile so the stage remains compact.
  const getBaseSizes = () => {
    if (isTinyScreen()) return { min: 38, max: 72 };
    if (isSmallScreen()) return { min: 42, max: 84 };
    return { min: 60, max: 120 };
  };
  const normalizePriority = (value) => {
    const n = Number(value);
    if (n === 1 || n === 2 || n === 3) return n;
    return 2;
  };
  const sizeByPriority = (sizes, priority) => {
    const mid = Math.round((sizes.min + sizes.max) / 2);
    if (priority === 1) return sizes.max;
    if (priority === 2) return mid;
    return sizes.min;
  };

  const placed = [];
  const tryPlace = (r, w, h, gap = 14) => {
    // Rejection sampling with more attempts to ensure near-zero overlap.
    for (let attempt = 0; attempt < 2200; attempt++) {
      const x = rand(r, w - r);
      const y = rand(r, h - r);

      const ok = placed.every((p) => {
        const dx = p.x - x;
        const dy = p.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist > (p.r + r + gap);
      });

      if (ok) return { x, y };
    }

    // Couldn't place without overlap.
    return null;
  };

  const escapeHtml = (value) => {
    const s = String(value ?? '');
    return s
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  };

  const safeUrl = (raw) => {
    try {
      const u = new URL(String(raw || ''), window.location.origin);
      const protocol = u.protocol.toLowerCase();
      if (protocol === 'http:' || protocol === 'index.html') return u.href;
      return null;
    } catch (_) {
      return null;
    }
  };

  const renderLinks = (links) => {
    if (!Array.isArray(links) || links.length === 0) return '';
    const items = links
      .map((l) => {
        const href = safeUrl(l?.url);
        const label = escapeHtml(l?.label || 'Link');
        if (!href) return '';
        return `<a class="btn btn-outline-light btn-sm" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
      })
      .filter(Boolean)
      .join('');
    if (!items) return '';
    return `<div class="project-links">${items}</div>`;
  };

  const renderTech = (tech) => {
    if (!Array.isArray(tech) || tech.length === 0) return '';
    const chips = tech
      .map((t) => `<span class="project-chip">${escapeHtml(t)}</span>`)
      .join('');
    return `<div class="project-tech">${chips}</div>`;
  };

  const renderHighlights = (highlights) => {
    if (!Array.isArray(highlights) || highlights.length === 0) return '';
    const lis = highlights
      .map((h) => `<li>${escapeHtml(h)}</li>`)
      .join('');
    return `<ul class="project-highlights">${lis}</ul>`;
  };

  const renderOtherProjects = () => {
    const section = document.getElementById('other-projects-section');
    const grid = document.getElementById('other-projects-grid');
    const detail = document.getElementById('other-project-detail');
    const toggle = document.getElementById('other-projects-toggle');
    if (!section || !grid || !detail || !toggle) return;

    if (!OTHER_PROJECTS.length) {
      section.classList.add('d-none');
      return;
    }

    let visibleRows = window.matchMedia('(max-width: 768px)').matches ? 2 : 1;
    let resizeTimer = null;
    let selectedProjectId = null;

    const getCols = () => {
      const minCardWidth = 220;
      const gap = 8;
      const width = grid.clientWidth || section.clientWidth || 1;
      return Math.max(1, Math.floor((width + gap) / (minCardWidth + gap)));
    };

    const summarize = (text, max = 180) => {
      const raw = String(text || '').replace(/\s+/g, ' ').trim();
      if (!raw) return '';
      if (raw.length <= max) return raw;
      return `${raw.slice(0, max).trimEnd()}...`;
    };

    const shortCardTitle = (project) => {
      const full = String(project?.name || 'Project').trim();
      if (!full) return 'Project';
      if (typeof project?.shortName === 'string' && project.shortName.trim()) {
        return project.shortName.trim();
      }
      return full.split(' - ')[0].trim() || full;
    };

    const renderOtherProjectDetail = (project) => {
      if (!project) {
        detail.classList.remove('is-open');
        detail.innerHTML = '';
        return;
      }

      const title = escapeHtml(project.name || 'Project');
      const subtitle = escapeHtml(project.subtitle || '');
      const description = escapeHtml(project.description || '');
      const image = escapeHtml(project.img || '');
      const chips = (Array.isArray(project.tech) ? project.tech : [])
        .map((t) => `<span class="other-project-chip">${escapeHtml(t)}</span>`)
        .join('');

      detail.innerHTML = `
        <div class="other-project-detail-inner">
          <div class="other-project-detail-head">
            ${image ? `<img class="other-project-detail-logo" src="${image}" alt="${title} logo" loading="lazy" decoding="async" />` : ''}
            <div class="other-project-detail-meta">
              <h4 class="other-project-detail-title">${title}</h4>
              ${subtitle ? `<div class="other-project-subtitle">${subtitle}</div>` : ''}
            </div>
          </div>
          ${description ? `<p class="other-project-desc">${description}</p>` : ''}
          ${chips ? `<div class="other-project-tech">${chips}</div>` : ''}
        </div>
      `.trim();
      detail.classList.add('is-open');
    };

    const draw = ({ animateFrom = null } = {}) => {
      const cols = getCols();
      const visibleCount = Math.min(OTHER_PROJECTS.length, visibleRows * cols);
      const source = OTHER_PROJECTS.slice(0, visibleCount);

      const cards = source.map((p, idx) => {
        const title = escapeHtml(shortCardTitle(p));
        const tag = escapeHtml(p.tag || 'Project');
        const isActive = p.id === selectedProjectId;

        return `
          <article class="other-project-card ${isActive ? 'is-active' : ''}" data-index="${idx}">
            <button type="button" class="other-project-head" data-project-id="${escapeHtml(p.id)}" aria-expanded="${isActive ? 'true' : 'false'}">
              <h4 class="other-project-title">${title}</h4>
              <div class="other-project-tag">${tag}</div>
            </button>
          </article>
        `.trim();
      }).join('');

      grid.innerHTML = cards;

      if (animateFrom !== null) {
        grid.querySelectorAll('.other-project-card').forEach((card, idx) => {
          if (idx >= animateFrom) {
            card.classList.add('is-row-reveal');
            card.style.setProperty('--row-reveal-delay', `${(idx - animateFrom) * 55}ms`);
          }
        });
      }

      if (visibleCount >= OTHER_PROJECTS.length) {
        toggle.textContent = 'All Projects Shown';
        toggle.disabled = true;
      } else {
        toggle.textContent = 'Show More Projects';
        toggle.disabled = false;
      }

      const selectedVisibleProject = source.find((p) => p.id === selectedProjectId) || null;
      renderOtherProjectDetail(selectedVisibleProject);

      // Open detail panel for one selected card.
      grid.querySelectorAll('.other-project-head').forEach((head) => {
        head.addEventListener('click', () => {
          const id = head.getAttribute('data-project-id');
          if (!id) return;

          if (selectedProjectId === id) {
            selectedProjectId = null;
            draw();
            return;
          }

          selectedProjectId = id;
          draw();
        });
      });
    };

    draw();
    toggle.addEventListener('click', () => {
      const cols = getCols();
      const prevVisibleCount = Math.min(OTHER_PROJECTS.length, visibleRows * cols);
      if (prevVisibleCount >= OTHER_PROJECTS.length) return;
      visibleRows += 1;
      draw({ animateFrom: prevVisibleCount });
    });

    window.addEventListener('resize', () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => draw(), 120);
    });
  };

  const renderPanel = (p) => {
    const badge = escapeHtml(p.tag || 'Project');
    const title = escapeHtml(p.name || 'Untitled');
    const subtitle = escapeHtml(p.subtitle || '');
    const description = escapeHtml(p.description || '');

    panel.innerHTML = `
      <div class="project-panel-inner">
        <div class="project-badge">${badge}</div>
        <h4 class="project-title">${title}</h4>
        ${subtitle ? `<div class="project-subtitle">${subtitle}</div>` : ``}
        ${description ? `<div class="project-desc">${description}</div>` : ``}

        ${renderHighlights(p.highlights)}

        ${renderTech(p.tech)}
        ${renderLinks(p.links)}

        <div class="project-note">Tip: Click other planets to switch projects. Auto-cycles every 10 seconds.</div>
      </div>
    `.trim();
  };

  const getPlanetElByIndex = (idx) => stage.querySelector(`.planet[data-index="${idx}"]`);

  let activePlanetEl = null;

  const clearSpinAll = () => {
    const all = stage.querySelectorAll('.planet .planet-sphere');
    all.forEach((s) => s.classList.remove('is-spin'));
  };

  const selectPlanet = (idx, { spin = false } = {}) => {
    if (!ACTIVE_PROJECTS.length) return;
    const safeIdx = clamp(idx, 0, ACTIVE_PROJECTS.length - 1);
    const el = getPlanetElByIndex(safeIdx);
    if (!el) return;

    if (activePlanetEl && activePlanetEl !== el) {
      activePlanetEl.classList.remove('is-active');
    }
    activePlanetEl = el;
    el.classList.add('is-active');

    const sphere = el.querySelector('.planet-sphere');
    if (sphere && spin) {
      clearSpinAll();
      // Force restart animation even if clicked repeatedly.
      sphere.classList.remove('is-spin');
      // eslint-disable-next-line no-unused-expressions
      sphere.offsetHeight;
      sphere.classList.add('is-spin');
      setTimeout(() => sphere.classList.remove('is-spin'), 820);
    }

    renderPanel(ACTIVE_PROJECTS[safeIdx]);
    activeIndex = safeIdx;

    // Keep focus aligned with the active selection (click + auto-cycle),
    // so focus rings / keyboard state match the highlighted planet.
    if (typeof el.focus === 'function') {
      el.focus({ preventScroll: true });
    }
  };

  const mount = () => {
    stage.innerHTML = '';
    placed.length = 0;
    bodies.length = 0;
    activePlanetEl = null;

    const rect = stageRect();
    const w = Math.max(240, rect.width);
    // Auto-expand stage height as project count grows.
    const baseH = isTinyScreen() ? 280 : isSmallScreen() ? 360 : 660;
    const perProjectExtra = isSmallScreen() ? 14 : 26;
    const extraH = Math.max(0, ACTIVE_PROJECTS.length - 14) * perProjectExtra;
    const h = Math.max(baseH + extraH, rect.height);
    stage.style.height = `${Math.round(h)}px`;

    const mountSolar = () => {
      stage.innerHTML = '';
      placed.length = 0;
      bodies.length = 0;

      const baseSizes = getBaseSizes();
      const sizes = {
        min: Math.max(34, Math.round(baseSizes.min * 1.0)),
        max: Math.max(56, Math.round(baseSizes.max * 1.0)),
      };

      const edgePad = isSmallScreen() ? 10 : 18;
      const n = ACTIVE_PROJECTS.length;

      let specs = ACTIVE_PROJECTS.map((p, i) => {
        const size = sizeByPriority(sizes, normalizePriority(p.priority));
        const r = size / 2;
        return { p, i, size, r };
      });

      // Random non-overlapping placement (rejection sampling), while keeping the same
      // shared rotation motion you liked from solar mode.
      const gap = isSmallScreen() ? 5 : 8; // tighter packing (still no overlap)
      const baseOmega = prefersReduced ? 0 : isSmallScreen() ? 0.1 : 0.12; // rad/s (slower)

      const packRandom = (arr, box) => {
        placed.length = 0;
        const out = [];

        for (const s of arr) {
          const pos = tryPlace(s.r, box.w, box.h, gap);
          if (!pos) return null;

          placed.push({ x: pos.x, y: pos.y, r: s.r });

          const dx = pos.x - box.cx;
          const dy = pos.y - box.cy;
          const orbitR = Math.sqrt(dx * dx + dy * dy);
          const orbitA = Math.atan2(dy, dx);

          out.push({ ...s, x: pos.x, y: pos.y, orbitR, orbitA });
        }

        return out;
      };

      let packedOk = false;
      let box = {
        w,
        h,
        cx: w * 0.5,
        cy: h * 0.46,
      };

      for (let attempt = 0; attempt < 7; attempt++) {
        const packed = packRandom(specs.map((s) => ({ ...s })), box);
        if (packed) {
          specs = packed;
          packedOk = true;
          break;
        }
        specs = specs.map((s) => {
          const size = Math.max(40, Math.round(s.size * 0.9));
          return { ...s, size, r: size / 2 };
        });
      }

      if (!packedOk) {
        // Last resort: give the stage more vertical room and try one more time (smaller).
        stage.style.height = `${Math.round(h + 220)}px`;
        const r2 = stageRect();
        const w2 = Math.max(220, r2.width);
        const h2 = Math.max(isSmallScreen() ? 320 : 520, r2.height);
        box = { w: w2, h: h2, cx: w2 * 0.5, cy: h2 * 0.46 };

        specs = specs.map((s) => {
          const size = Math.max(isSmallScreen() ? 30 : 40, Math.round(s.size * 0.86));
          return { ...s, size, r: size / 2 };
        });

        const packed = packRandom(specs.map((s) => ({ ...s })), box);
        if (packed) {
          specs = packed;
          packedOk = true;
        }
      }

      for (let k = 0; k < n; k++) {
        const { p, i, size, r } = specs[k];
        const orbitR = specs[k].orbitR;
        const startAngle = specs[k].orbitA;
        const omega = baseOmega;

        const x = specs[k].x;
        const y = specs[k].y;

        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'planet';
        el.setAttribute('aria-label', `Open ${p.name}`);
        el.dataset.index = String(i);

        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.setProperty('--tx', `${x - r}px`);
        el.style.setProperty('--ty', `${y - r}px`);

        el.style.setProperty('--tilt-dur', `${rand(3.8, 6.4).toFixed(2)}s`);
        el.style.setProperty('--idle-rot', `${rand(-8, -3).toFixed(2)}deg`);
        el.style.setProperty('--idle-rot-2', `${rand(3, 8).toFixed(2)}deg`);

        el.innerHTML = `
          <span class="planet-sphere" aria-hidden="true">
            <img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async" />
            <span class="planet-shade" aria-hidden="true"></span>
            <span class="planet-specular" aria-hidden="true"></span>
          </span>
          <span class="planet-ring" aria-hidden="true"></span>
        `.trim();

        stage.appendChild(el);

        bodies.push({
          i,
          el,
          r,
          x,
          y,
          vx: 0,
          vy: 0,
          dragging: false,
          dragOffsetX: 0,
          dragOffsetY: 0,
          lastPX: 0,
          lastPY: 0,
          lastT: 0,
          orbitUse: true,
          orbitCx: box.cx,
          orbitCy: box.cy,
          orbitR,
          orbitA: startAngle,
          orbitW: omega,
        });
      }

      return true;
    };

    if (SOLAR_SYSTEM_MODE) {
      mountSolar();
      selectPlanet(0, { spin: false });
      return;
    }

    const attemptPack = (scale) => {
      stage.innerHTML = '';
      placed.length = 0;
      bodies.length = 0;

      const baseSizes = getBaseSizes();
      const sizes = {
        min: Math.max(34, Math.round(baseSizes.min * scale)),
        max: Math.max(56, Math.round(baseSizes.max * scale)),
      };

      // Place larger planets first for better packing.
      const projectsWithSize = ACTIVE_PROJECTS.map((p, i) => ({
        p,
        i,
        size: sizeByPriority(sizes, normalizePriority(p.priority)),
      })).sort((a, b) => b.size - a.size);

      for (const { p, i, size } of projectsWithSize) {
        const r = size / 2;
        const pos = tryPlace(r, w, h);
        if (!pos) return false;

        placed.push({ x: pos.x, y: pos.y, r });

        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'planet';
        el.setAttribute('aria-label', `Open ${p.name}`);
        el.dataset.index = String(i);

        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.setProperty('--tx', `${pos.x - r}px`);
        el.style.setProperty('--ty', `${pos.y - r}px`);

        el.style.setProperty('--tilt-dur', `${rand(3.8, 6.4).toFixed(2)}s`);
        el.style.setProperty('--idle-rot', `${rand(-8, -3).toFixed(2)}deg`);
        el.style.setProperty('--idle-rot-2', `${rand(3, 8).toFixed(2)}deg`);

        el.innerHTML = `
          <span class="planet-sphere" aria-hidden="true">
            <img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async" />
            <span class="planet-shade" aria-hidden="true"></span>
            <span class="planet-specular" aria-hidden="true"></span>
          </span>
          <span class="planet-ring" aria-hidden="true"></span>
        `.trim();

        stage.appendChild(el);

        // Initialize physics body (slow drift)
        bodies.push({
          i,
          el,
          r,
          x: pos.x,
          y: pos.y,
          vx: rand(-10, 10),
          vy: rand(-10, 10),
          dragging: false,
          dragOffsetX: 0,
          dragOffsetY: 0,
          lastPX: 0,
          lastPY: 0,
          lastT: 0,
          orbitUse: false,
          orbitCx: 0,
          orbitCy: 0,
          orbitR: 0,
          orbitA: 0,
          orbitW: 0,
        });
      }

      return true;
    };

    // Try multiple scales to guarantee no overlap for 20–30 projects.
    const scales = [1.0, 0.92, 0.86, 0.80, 0.74, 0.70, 0.66];
    let packed = false;
    for (const s of scales) {
      if (attemptPack(s)) { packed = true; break; }
    }
    if (!packed) {
      // As a last resort, widen stage height and try again smaller.
      stage.style.height = `${Math.round(h + 220)}px`;
      attemptPack(0.62);
    }

    // Default selection (no spin on initial mount)
    selectPlanet(0, { spin: false });
  };

  const bodies = [];
  const bodyByEl = (el) => bodies.find((b) => b.el === el);

  // Drag + throw (pointer)
  stage.addEventListener('pointerdown', (e) => {
    const btn = e.target.closest('.planet');
    if (!btn) return;
    const b = bodyByEl(btn);
    if (!b) return;

    btn.setPointerCapture(e.pointerId);
    b.dragging = true;

    const rect = stageRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    b.dragOffsetX = b.x - px;
    b.dragOffsetY = b.y - py;

    b.lastPX = px;
    b.lastPY = py;
    b.lastT = performance.now();

    // Select on pointer down (feels instant)
    const idx = Number(btn.dataset.index || '0');
    selectPlanet(clamp(idx, 0, ACTIVE_PROJECTS.length - 1), { spin: true });
    resetAuto();
  });

  stage.addEventListener('pointermove', (e) => {
    const btn = e.target.closest('.planet');
    if (!btn) return;
    const b = bodyByEl(btn);
    if (!b || !b.dragging) return;

    const rect = stageRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    b.x = px + b.dragOffsetX;
    b.y = py + b.dragOffsetY;

    // Prevent overlaps while dragging (especially in SOLAR_SYSTEM_MODE).
    // We push other bodies away from the dragged body and update their orbit params
    // so the layout stays stable after the next orbit tick.
    if (SOLAR_SYSTEM_MODE) {
      const w = Math.max(240, rect.width);
      const h = Math.max(520, rect.height);
      const cx = w * 0.5;
      const cy = h * 0.46;
      const gap = 8; // match solar pack gap
      const edgePad = 18;
      const box = { w, h, cx, cy };

      // Keep dragged body within bounds first.
      b.x = clamp(b.x, b.r + edgePad, w - b.r - edgePad);
      b.y = clamp(b.y, b.r + edgePad, h - b.r - edgePad);

      // A few iterations keeps it tight + stable during drag.
      for (let iter = 0; iter < 4; iter++) {
        bodies.forEach((o) => {
          if (o === b) return;

          const dx = o.x - b.x;
          const dy = o.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const minDist = b.r + o.r + gap;
          if (dist >= minDist) return;

          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = (minDist - dist);

          // Push the other body away (keep the dragged one under cursor).
          o.x += nx * overlap;
          o.y += ny * overlap;

          // Clamp within stage bounds.
          o.x = clamp(o.x, o.r + edgePad, w - o.r - edgePad);
          o.y = clamp(o.y, o.r + edgePad, h - o.r - edgePad);

          // Persist the new position into its orbit parameters.
          if (o.orbitUse) {
            const odx = o.x - cx;
            const ody = o.y - cy;
            o.orbitA = Math.atan2(ody, odx);
            const desired = Math.sqrt(odx * odx + ody * ody);
            const maxR = maxOrbitForAngle(o.orbitA, o.r, box, edgePad);
            o.orbitR = clamp(desired, 0, maxR);
          }
        });
      }
    }

    const now = performance.now();
    const dt = Math.max(1, now - b.lastT);
    b.vx = ((px - b.lastPX) / dt) * 200; // scale to px/s
    b.vy = ((py - b.lastPY) / dt) * 200;
    b.lastPX = px;
    b.lastPY = py;
    b.lastT = now;
  });

  const endDrag = (e) => {
    const btn = e.target.closest('.planet');
    if (!btn) return;
    const b = bodyByEl(btn);
    if (!b || !b.dragging) return;
    b.dragging = false;

    if (SOLAR_SYSTEM_MODE && b.orbitUse) {
      const rect = stageRect();
      const w = Math.max(240, rect.width);
      const h = Math.max(520, rect.height);
      const cx = w * 0.5;
      const cy = h * 0.46;
      const box = { w, h, cx, cy };

      b.orbitCx = cx;
      b.orbitCy = cy;

      const dx = b.x - cx;
      const dy = b.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;

      const edgePad = 18;
      const angle = Math.atan2(dy, dx);
      const maxOrbit = maxOrbitForAngle(angle, b.r, box, edgePad);

      b.orbitR = clamp(dist, 0, maxOrbit);
      b.orbitA = angle;
      b.vx = 0;
      b.vy = 0;
      return;
    }

    // Clamp throw speed (slow)
    const max = 140;
    b.vx = clamp(b.vx, -max, max);
    b.vy = clamp(b.vy, -max, max);
  };
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  let activeIndex = 0;
  let timer = null;

  const startAuto = () => {
    if (prefersReduced) return;
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      const next = (activeIndex + 1) % ACTIVE_PROJECTS.length;
      // Auto focus change should also spin.
      selectPlanet(next, { spin: true });
    }, 10000);
  };

  const resetAuto = () => {
    if (prefersReduced) return;
    if (timer) clearInterval(timer);
    startAuto();
  };

  renderOtherProjects();
  mount();
  startAuto();

  // Physics loop (no gravity, soft damping, elastic collisions)
  let raf = null;
  let last = performance.now();

  const stepPhysics = (t) => {
    const dt = Math.min(32, t - last) / 1000;
    last = t;

    const rect = stageRect();
    const w = Math.max(240, rect.width);
    const h = Math.max(520, rect.height);

    const damping = 0.996; // slow drift
    const maxSpeed = 52;   // keep it calm/natural
    const edgePad = 18;
    const edgeK = 14;      // soft edge repulsion
    const wanderK = 10;    // gentle random drift

    if (SOLAR_SYSTEM_MODE) {
      const cx = w * 0.5;
      const cy = h * 0.46;
      const box = { w, h, cx, cy };
      const pad = edgePad;

      bodies.forEach((b) => {
        b.orbitCx = cx;
        b.orbitCy = cy;

        if (b.dragging) {
          b.x = clamp(b.x, b.r + pad, w - b.r - pad);
          b.y = clamp(b.y, b.r + pad, h - b.r - pad);
          return;
        }

        if (b.orbitUse) {
          b.orbitA += b.orbitW * dt;
          const maxR = maxOrbitForAngle(b.orbitA, b.r, box, pad);
          const useR = Math.min(b.orbitR, maxR);
          b.x = cx + Math.cos(b.orbitA) * useR;
          b.y = cy + Math.sin(b.orbitA) * useR;
        }
      });
    } else {
      // Integrate
      bodies.forEach((b) => {
        if (b.dragging) return;

        // Gentle "wander" force (feels like floating)
        // Use deterministic sin/cos based on time + index so it's smooth, not jittery.
        const s = (b.i + 1) * 13.37;
        const ax = Math.sin((t / 1000) * 0.55 + s) * wanderK;
        const ay = Math.cos((t / 1000) * 0.48 + s) * wanderK;
        b.vx += ax * dt;
        b.vy += ay * dt;

        // Soft edge repulsion (no harsh bouncing)
        const left = b.r + edgePad;
        const right = w - b.r - edgePad;
        const top = b.r + edgePad;
        const bottom = h - b.r - edgePad;

        if (b.x < left) b.vx += (left - b.x) * edgeK * dt;
        if (b.x > right) b.vx -= (b.x - right) * edgeK * dt;
        if (b.y < top) b.vy += (top - b.y) * edgeK * dt;
        if (b.y > bottom) b.vy -= (b.y - bottom) * edgeK * dt;

        // Damping + speed limit
        b.vx *= damping;
        b.vy *= damping;
        const sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (sp > maxSpeed) {
          const k = maxSpeed / sp;
          b.vx *= k;
          b.vy *= k;
        }

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // Clamp inside bounds (rare)
        b.x = clamp(b.x, b.r, w - b.r);
        b.y = clamp(b.y, b.r, h - b.r);
      });
    }

    // Collisions (pairwise)
    if (!SOLAR_SYSTEM_MODE) for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i];
        const b = bodies[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
        const minDist = a.r + b.r + 2;
        if (dist >= minDist) continue;

        const nx = dx / dist;
        const ny = dy / dist;
        const overlap = (minDist - dist);

        // Separate (soft) - if dragging, move the other more
        const aMove = a.dragging ? 0 : overlap * 0.45;
        const bMove = b.dragging ? overlap : overlap * 0.55;
        a.x -= nx * aMove;
        a.y -= ny * aMove;
        b.x += nx * bMove;
        b.y += ny * bMove;

        // Exchange velocity along the normal (elastic-ish)
        const rvx = b.vx - a.vx;
        const rvy = b.vy - a.vy;
        const rel = rvx * nx + rvy * ny;
        if (rel > 0) continue;

        const impulse = -(1.0 + 0.55) * rel / 2; // softer collisions
        const ix = impulse * nx;
        const iy = impulse * ny;

        if (!a.dragging) { a.vx -= ix; a.vy -= iy; }
        if (!b.dragging) { b.vx += ix; b.vy += iy; }
      }
    }

    // Render positions
    bodies.forEach((b) => {
      b.el.style.setProperty('--tx', `${(b.x - b.r).toFixed(2)}px`);
      b.el.style.setProperty('--ty', `${(b.y - b.r).toFixed(2)}px`);
    });

    raf = requestAnimationFrame(stepPhysics);
  };

  if (!prefersReduced) {
    raf = requestAnimationFrame(stepPhysics);
  } else {
    // Still render once
    bodies.forEach((b) => {
      b.el.style.setProperty('--tx', `${(b.x - b.r).toFixed(2)}px`);
      b.el.style.setProperty('--ty', `${(b.y - b.r).toFixed(2)}px`);
    });
  }

  window.dispatchEvent(new Event('planets:ready'));

  // Re-layout on resize (debounced)
  let rTimer = null;
  window.addEventListener('resize', () => {
    if (rTimer) clearTimeout(rTimer);
    rTimer = setTimeout(() => {
      const current = activeIndex;
      mount();
      selectPlanet(current);
    }, 120);
  });
});

