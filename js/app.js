// Beppu Tourism + Local Guide Marketplace - Shared App Logic
// Synchronizes interactive UI states with persistent BeppuDatabase

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initHeaderScroll();
  initItineraryBadges();
  initUserProfileHeader();
  initGlobalEventListeners();
});

// Update language text on current page
function initLanguage() {
  const currentLang = window.beppuStore.getLang();
  document.documentElement.lang = currentLang;
  applyTranslations();

  // Attach dropdown trigger listener
  document.querySelectorAll('.js-lang-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const menu = btn.parentElement.querySelector('.lang-dropdown-menu');
      if (menu) {
        const isOpen = menu.classList.toggle('active');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });
  });

  // Attach language item click listeners
  document.querySelectorAll('.lang-dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = item.dataset.lang;
      if (lang) {
        window.beppuStore.setLang(lang);
        applyTranslations();
        document.querySelectorAll('.lang-dropdown-menu').forEach(m => m.classList.remove('active'));
        document.querySelectorAll('.js-lang-dropdown-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));

        const toastMessages = {
          en: 'Language set to English 🇬🇧',
          ko: '언어가 한국어로 변경되었습니다 🇰🇷',
          zh: '语言已切换为简体中文 🇨🇳',
          yue: '語言已切換為繁體中文 / 粵語 🇭🇰',
          ja: '言語を日本語に切り替えました 🇯🇵'
        };
        if (window.showToast) {
          window.showToast(toastMessages[lang] || 'Language updated', 'info');
        }
      }
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-dropdown-wrap')) {
      document.querySelectorAll('.lang-dropdown-menu').forEach(m => m.classList.remove('active'));
      document.querySelectorAll('.js-lang-dropdown-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
    }
  });

  // Fallback support for any legacy toggle button
  document.querySelectorAll('.js-lang-toggle:not(.js-lang-dropdown-btn)').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const order = ['en', 'ko', 'zh', 'yue', 'ja'];
      const curIdx = order.indexOf(window.beppuStore.getLang());
      const nextLang = order[(curIdx + 1) % order.length];
      window.beppuStore.setLang(nextLang);
      applyTranslations();
    });
  });
}

function applyTranslations() {
  const currentLang = window.beppuStore.getLang();
  const langLabels = {
    en: 'English',
    ko: '한국어',
    zh: '简体中文',
    yue: '繁體 / 粵語',
    ja: '日本語'
  };

  document.querySelectorAll('.js-active-lang-label').forEach(el => {
    el.textContent = langLabels[currentLang] || 'English';
  });

  document.querySelectorAll('.lang-dropdown-item').forEach(item => {
    item.classList.toggle('active', item.dataset.lang === currentLang);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = window.beppuStore.t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', window.beppuStore.t(key));
  });
}

// User Profile Avatar name in nav
function initUserProfileHeader() {
  const profile = window.beppuStore.userProfile;
  if (profile && profile.name) {
    document.querySelectorAll('.user-avatar-name').forEach(el => {
      el.textContent = profile.name.split(' ')[0] || 'Visitor';
    });
  }
}

// Header elevation on scroll
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// Update trip count badges in nav
function initItineraryBadges() {
  const updateCounts = () => {
    const count = window.beppuStore.itinerary.length;
    document.querySelectorAll('.js-trip-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  };

  updateCounts();
  window.addEventListener('beppu:itinerarychange', updateCounts);
}

// Global delegated handlers for cards (Add to trip toggle, save bookmark)
function initGlobalEventListeners() {
  document.addEventListener('click', (e) => {
    // Listen for Add / Remove from Trip toggle
    const addBtn = e.target.closest('.js-add-to-trip');
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();
      const placeId = addBtn.dataset.placeId;
      const place = window.beppuStore.places.find(p => p.id === placeId);
      if (!place) return;

      if (window.beppuStore.isInItinerary(placeId)) {
        // Toggle removal
        window.beppuStore.removeFromItinerary(placeId);
        addBtn.classList.remove('added');
        addBtn.innerHTML = `+ ${window.beppuStore.t('add_to_trip')}`;
        window.showToast(`Removed "${place.name}" from your trip`, 'info');
      } else {
        // Add to itinerary
        const res = window.beppuStore.addToItinerary({
          placeId: place.id,
          title: place.name,
          duration: place.duration,
          cost: place.price,
          notes: place.shortDesc
        });
        if (res.success) {
          addBtn.classList.add('added');
          addBtn.innerHTML = `✓ ${window.beppuStore.t('in_trip')}`;
          window.showToast(`Added "${place.name}" to your trip!`, 'success');
        } else {
          window.showToast(res.error, 'warning');
        }
      }
    }

    // Listen for Save / Bookmark
    const saveBtn = e.target.closest('.js-save-item');
    if (saveBtn) {
      e.preventDefault();
      e.stopPropagation();
      const itemId = saveBtn.dataset.id;
      const isSaved = window.beppuStore.toggleSave(itemId);
      saveBtn.classList.toggle('saved', isSaved);
      saveBtn.innerHTML = isSaved ? '❤️' : '🤍';
      window.showToast(isSaved ? 'Saved to your favorites' : 'Removed from favorites', 'info');
    }
  });

  // Re-sync card buttons when itinerary changes externally
  window.addEventListener('beppu:itinerarychange', () => {
    document.querySelectorAll('.js-add-to-trip').forEach(btn => {
      const pid = btn.dataset.placeId;
      const isIn = window.beppuStore.isInItinerary(pid);
      btn.classList.toggle('added', isIn);
      btn.innerHTML = isIn ? `✓ ${window.beppuStore.t('in_trip')}` : `+ ${window.beppuStore.t('add_to_trip')}`;
    });
  });
}

// Helper: Render Place Card HTML
function renderPlaceCard(place) {
  const inTrip = window.beppuStore.isInItinerary(place.id);
  const isSaved = window.beppuStore.isSaved(place.id);

  return `
    <article class="place-card" data-place-id="${place.id}">
      <div class="place-card-media">
        <img src="${place.image}" alt="${place.name}" class="place-card-img" loading="lazy" />
        <div class="place-badge-top">
          <span class="badge ${place.isPopular ? 'badge-micro' : 'badge-local'}">
            ${place.isPopular ? '🔥 Popular' : '🌿 Local Gem'}
          </span>
        </div>
        <button class="place-save-btn js-save-item ${isSaved ? 'saved' : ''}" data-id="${place.id}" title="Save" aria-label="Save">
          ${isSaved ? '❤️' : '🤍'}
        </button>
      </div>

      <div class="place-card-body">
        <div class="place-meta-row">
          <span>${place.categoryLabel}</span>
          <span class="badge badge-rating">⭐ ${place.rating} (${place.reviewsCount})</span>
        </div>

        <h3 class="place-card-title">
          <a href="place.html?id=${place.id}">${place.name}</a>
        </h3>
        <p class="place-japanese-name">${place.japaneseName}</p>

        <p class="place-card-desc">${place.shortDesc}</p>

        <div class="place-details-pills">
          <span>⏱️ ${place.duration}</span>
          <span>·</span>
          <span>🎟️ ${place.priceLevel} (${place.price.split('·')[0]})</span>
        </div>

        <div class="place-action-row">
          <button class="btn-add-trip js-add-to-trip ${inTrip ? 'added' : ''}" data-place-id="${place.id}">
            ${inTrip ? '✓ In Your Trip' : '+ Add to My Trip'}
          </button>
          <a href="place.html?id=${place.id}" class="btn btn-secondary btn-sm">Details</a>
        </div>
      </div>
    </article>
  `;
}

// Helper: Render Experience Card HTML
function renderExperienceCard(exp) {
  const guide = window.beppuStore.guides.find(g => g.id === exp.creatorId);
  return `
    <article class="place-card" data-exp-id="${exp.id}">
      <div class="place-card-media">
        <img src="${exp.image}" alt="${exp.title}" class="place-card-img" loading="lazy" />
        <div class="place-badge-top">
          <span class="badge badge-micro">${exp.badge || 'Experience'}</span>
        </div>
      </div>

      <div class="place-card-body">
        <div class="place-meta-row">
          <span>${exp.duration} · ${exp.languages.slice(0, 2).join(', ')}</span>
          <span class="badge badge-rating">⭐ ${exp.rating} (${exp.reviewsCount})</span>
        </div>

        <h3 class="place-card-title">
          <a href="experiences.html#${exp.id}">${exp.title}</a>
        </h3>

        <p class="place-card-desc">${exp.subtitle}</p>

        ${guide ? `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
            <img src="${guide.avatar}" alt="${guide.name}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;" />
            <div style="font-size:0.8rem;">
              <strong style="color:var(--color-slate-900);">${guide.name}</strong>
              <div style="color:var(--color-slate-500);">${guide.guideType}</div>
            </div>
          </div>
        ` : ''}

        <div class="place-action-row" style="margin-top:auto;border-top:1px solid var(--color-cream-200);padding-top:14px;">
          <div>
            <div style="font-size:1.1rem;font-weight:800;color:var(--color-slate-950);">${exp.price}</div>
            <div style="font-size:0.75rem;color:var(--color-slate-500);">${exp.pricePer}</div>
          </div>
          <a href="request.html?guide=${exp.creatorId}&activity=${encodeURIComponent(exp.title)}" class="btn btn-primary btn-sm">
            Book Experience
          </a>
        </div>
      </div>
    </article>
  `;
}

// Helper: Render Guide Card HTML
function renderGuideCard(guide) {
  const isApu = (guide.guideType || '').includes('APU');
  const reviewsCount = guide.reviewsCount || (guide.reviews ? guide.reviews.length : 0);

  return `
    <article class="guide-card" data-guide-id="${guide.id}">
      <div class="guide-header">
        <img src="${guide.avatar}" alt="${guide.name}" class="guide-avatar" loading="lazy" />
        <div>
          <h3 class="guide-name"><a href="guide.html?id=${guide.id}">${guide.name}</a></h3>
          <div class="guide-type-pill">
            <span class="badge ${isApu ? 'badge-apu' : 'badge-local'}">${guide.guideType} · ${guide.nationality}</span>
          </div>
          <div class="guide-languages">${guide.languagesShort}</div>
        </div>
      </div>

      <blockquote class="guide-quote">
        "${guide.quote}"
      </blockquote>

      <div style="margin-bottom:12px;font-size:0.8rem;font-weight:700;color:var(--color-slate-700);">
        Interests & Specialty:
      </div>
      <div class="guide-interests-wrap">
        ${(guide.interests || []).map(i => `<span class="interest-tag">${i}</span>`).join('')}
      </div>

      <div class="guide-footer">
        <div>
          <div class="guide-price">${guide.startingPrice}</div>
          <div style="font-size:0.76rem;color:var(--color-slate-500);">⭐ ${guide.rating} · ${reviewsCount} reviews</div>
        </div>
        <div style="display:flex;gap:8px;">
          <a href="guide.html?id=${guide.id}" class="btn btn-secondary btn-sm">View Profile</a>
          <a href="request.html?guide=${guide.id}" class="btn btn-primary btn-sm">Request</a>
        </div>
      </div>
    </article>
  `;
}

// Expose render functions globally
window.renderPlaceCard = renderPlaceCard;
window.renderExperienceCard = renderExperienceCard;
window.renderGuideCard = renderGuideCard;
