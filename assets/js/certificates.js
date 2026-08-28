window.addEventListener('DOMContentLoaded', () => {
  const CERTS = [
    {
      id: 'pacewisdom',
      title: 'Star Performer',
      meta: 'Pace Wisdom Solutions • Jul 2024',
      file: 'assets/certificates/pacewisdom.jpeg',
      icon: 'bi-award',
    },
    {
      id: 'appreciate',
      title: 'Star Performer',
      meta: 'Appreciate • Jul 2024',
      file: 'assets/certificates/appreciate.jpeg',
      icon: 'bi-trophy',
    },
    {
      id: 'udemy',
      title: 'Unreal Engine Course',
      meta: 'Udemy • Jan 2021',
      file: 'assets/certificates/udemy.jpg',
      icon: 'bi-controller',
    },
    {
      id: 'google',
      title: 'Applied CS with Android',
      meta: 'Google • Oct 2016',
      file: 'assets/certificates/google.jpeg',
      icon: 'bi-android2',
    },
    {
      id: 'mega-mind',
      title: 'Winner in Mega Mind',
      meta: 'C. U. Shah College • Mar 2016',
      file: 'assets/certificates/mega-mind.jpeg',
      icon: 'bi-lightbulb',
    },
  ];

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const buildCard = (c) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'cert-card';
    wrapper.innerHTML = `
      <a class="cert-thumb portfolio-lightbox" data-gallery="certificates" href="${c.file}" title="${c.title}">
        <img src="${c.file}" alt="${c.title}" loading="lazy" decoding="async" />
      </a>
      <div class="cert-body">
        <div class="cert-title">${c.title}</div>
        <div class="cert-meta">${c.meta}</div>
      </div>
    `.trim();
    return wrapper;
  };

  const applyImageFallbacks = (root) => {
    const cards = root.querySelectorAll('.cert-card');
    cards.forEach((card) => {
      const img = card.querySelector('img');
      if (!img) return;

      const showImage = () => {
        if (img) img.style.display = 'block';
      };

      if (img.complete && img.naturalWidth > 0) {
        showImage();
        return;
      }

      img.addEventListener('load', showImage, { once: true });
    });
  };

  const mountCarousel = () => {
    const root = document.getElementById('cert-view-carousel');
    if (!root || typeof Swiper === 'undefined') return;

    const wrapper = root.querySelector('.swiper-wrapper');
    if (!wrapper) return;

    wrapper.innerHTML = '';
    CERTS.forEach((c) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.appendChild(buildCard(c));
      wrapper.appendChild(slide);
    });

    applyImageFallbacks(root);

    // Certificates are injected dynamically; reload GLightbox bindings.
    if (window._portfolioLightbox && typeof window._portfolioLightbox.reload === 'function') {
      window._portfolioLightbox.reload();
    }

    // eslint-disable-next-line no-new
    new Swiper(root, {
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 14,
      speed: 6000,
      autoplay: prefersReduced ? false : { delay: 0, disableOnInteraction: false },
    });
  };

  mountCarousel();
  window.dispatchEvent(new Event('certificates:ready'));
});

