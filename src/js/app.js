'use strict';

const languages = require('./languages');

(function () {
  const lang = window.location.pathname.includes('/zh_tw/') ? 'zh_tw' : 'en';
  const data = languages[lang];

  let currentIndex = 0;

  /* ── YouTube ID extraction ── */
  function getYouTubeId(v) {
    if (v.youtubeId) return v.youtubeId;
    const m = (v.url || '').match(/(?:youtu\.be\/|[?&]v=)([A-Za-z0-9_-]+)/);
    return m ? m[1] : null;
  }

  /* ── Responsive visible thumbnail count ── */
  function visibleCount() {
    if (window.innerWidth >= 900) return 5;
    if (window.innerWidth >= 560) return 4;
    return 3;
  }

  /* ── Resize thumbnails to fill strip ── */
  function setThumbWidths() {
    const strip = document.querySelector('.vc-strip');
    const items = document.querySelectorAll('.vc-thumb-item');
    if (!strip || !items.length) return;
    const vc = visibleCount();
    const itemWidth = (strip.offsetWidth - 8 * (vc - 1)) / vc;
    items.forEach(item => { item.style.width = itemWidth + 'px'; });
  }

  /* ── Scroll strip to keep active thumbnail visible ── */
  function updateStripOffset() {
    const inner = document.getElementById('vc-strip-inner');
    const strip = document.querySelector('.vc-strip');
    if (!inner || !strip) return;
    const vc = visibleCount();
    const itemWidth = (strip.offsetWidth - 8 * (vc - 1)) / vc;
    const offset = Math.max(0, currentIndex - Math.floor(vc / 2)) * (itemWidth + 8);
    inner.style.transform = `translateX(-${offset}px)`;
  }

  /* ── Select a video by index ── */
  function selectVideo(index) {
    currentIndex = index;
    const v = data.videos[index];
    const id = getYouTubeId(v);

    // Reset player state
    const player = document.getElementById('vc-player');
    if (player) {
      player.classList.remove('playing');
      const iframeWrap = document.getElementById('vc-iframe-wrap');
      if (iframeWrap) iframeWrap.innerHTML = '';
    }

    // Update main thumbnail and text
    const thumb = document.getElementById('vc-main-thumb');
    if (thumb) {
      thumb.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      thumb.alt = v.title;
    }
    const titleEl = document.getElementById('vc-title');
    if (titleEl) titleEl.textContent = v.title;
    const descEl = document.getElementById('vc-desc');
    if (descEl) descEl.textContent = v.description;

    // Update active thumbnail in strip
    document.querySelectorAll('.vc-thumb-item').forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });

    // Update navigation arrows
    const prev = document.getElementById('vc-prev');
    const next = document.getElementById('vc-next');
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === data.videos.length - 1;

    updateStripOffset();
  }

  /* ── Load YouTube iframe and play ── */
  function playVideo() {
    const v = data.videos[currentIndex];
    const id = getYouTubeId(v);
    const player = document.getElementById('vc-player');
    const iframeWrap = document.getElementById('vc-iframe-wrap');
    if (!player || !iframeWrap || !id) return;

    player.classList.add('playing');
    iframeWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen title="${v.title.replace(/"/g, '&quot;')}"></iframe>`;
  }

  /* ── Build the video carousel HTML ── */
  function initCarousel() {
    const carousel = document.getElementById('video-carousel');
    if (!carousel || !data.videos.length) return;

    carousel.innerHTML = `
      <div class="vc-main">
        <div class="vc-player" id="vc-player">
          <img class="vc-thumb" id="vc-main-thumb" src="" alt="" />
          <button class="vc-play-btn" id="vc-play-btn" aria-label="Play">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <div class="vc-iframe-wrap" id="vc-iframe-wrap"></div>
        </div>
        <div class="vc-info">
          <p class="vc-title" id="vc-title"></p>
          <p class="vc-desc" id="vc-desc"></p>
        </div>
      </div>
      <div class="vc-strip-wrap">
        <button class="vc-arrow" id="vc-prev" aria-label="Previous">&#8249;</button>
        <div class="vc-strip">
          <div class="vc-strip-inner" id="vc-strip-inner"></div>
        </div>
        <button class="vc-arrow" id="vc-next" aria-label="Next">&#8250;</button>
      </div>
    `;

    // Build thumbnail strip items
    const stripInner = document.getElementById('vc-strip-inner');
    data.videos.forEach((v, i) => {
      const id = getYouTubeId(v);
      const item = document.createElement('div');
      item.className = 'vc-thumb-item';
      item.dataset.index = i;
      const img = document.createElement('img');
      img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      img.alt = v.title;
      img.loading = 'lazy';
      item.appendChild(img);
      item.addEventListener('click', () => selectVideo(i));
      stripInner.appendChild(item);
    });

    // Play button
    document.getElementById('vc-play-btn').addEventListener('click', playVideo);

    // Navigation arrows
    document.getElementById('vc-prev').addEventListener('click', () => {
      if (currentIndex > 0) selectVideo(currentIndex - 1);
    });
    document.getElementById('vc-next').addEventListener('click', () => {
      if (currentIndex < data.videos.length - 1) selectVideo(currentIndex + 1);
    });

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) selectVideo(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < data.videos.length - 1) selectVideo(currentIndex + 1);
    });

    setThumbWidths();
    selectVideo(0);
  }

  /* ── Mobile hamburger navigation ── */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  /* ── Header elevation on scroll ── */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 2px 24px rgba(0,0,0,0.07)' : 'none';
    }, { passive: true });
  }

  /* ── Fade-in on scroll using IntersectionObserver ── */
  function initFadeIn() {
    const els = document.querySelectorAll('[data-fade]');
    if (!els.length) return;
    if (!window.IntersectionObserver) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => observer.observe(el));
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initMobileNav();
    initHeaderScroll();
    initFadeIn();
  });

  window.addEventListener('resize', () => {
    setThumbWidths();
    updateStripOffset();
  }, { passive: true });
})();
