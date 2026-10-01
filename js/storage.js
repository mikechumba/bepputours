// Beppu Tourism & Local Guide Marketplace - Persistent Application Database & Validation Engine
// Fully mocks realistic application behavior with persistent localStorage collections,
// relational links (itinerary <-> places <-> guides <-> bookings <-> reviews), and strict validations.

const STORAGE_KEYS = {
  DB_VERSION: 'beppu_db_version_v2',
  PLACES: 'beppu_places_db_v2',
  GUIDES: 'beppu_guides_db_v2',
  EXPERIENCES: 'beppu_experiences_db_v2',
  ITINERARY: 'beppu_itinerary_db_v2',
  BOOKINGS: 'beppu_bookings_db_v2',
  SAVED: 'beppu_saved_db_v2',
  USER_PROFILE: 'beppu_user_profile_v2',
  LANG: 'beppu_language_v2'
};

const I18N = {
  en: {
    brand_sub: 'Beppu, Japan · Hot Springs & Local Guides',
    nav_explore: 'Explore',
    nav_experiences: 'Experiences',
    nav_guides: 'Guides',
    nav_trip: 'My Trip',
    hero_title: 'Experience Beppu your way.',
    hero_subtitle: 'Discover famous sights, hidden local spots, and people who can show you around.',
    btn_explore: 'Explore Beppu',
    btn_find_local: 'Find a Local',
    cat_heading: 'What are you interested in?',
    popular_heading: 'Popular in Beppu',
    popular_sub: 'Essential landmarks and beloved experiences for first-time visitors',
    local_heading: 'Discover Local Beppu',
    local_sub: 'Go beyond the famous sights. Discover places, food, and experiences recommended by people who live, study, and work in Beppu.',
    add_to_trip: 'Add to My Trip',
    in_trip: 'In Your Trip',
    remove_from_trip: 'Remove from Trip',
    save: 'Save',
    saved: 'Saved',
    view_guide: 'View Guide',
    request_guide: 'Request Guide',
    book_exp: 'Book Experience',
    micro_guide_title: 'The Micro-Guide Concept',
    micro_guide_sub: 'You do not need an expensive, all-day tour. Book a local for 45 minutes to 3 hours exactly when you need help or company.',
    partner_title: 'For local businesses & guides',
    partner_desc: 'Reach visitors looking for authentic Beppu experiences. Join our community-first marketplace.',
    btn_become_guide: 'Become a Guide',
    btn_list_biz: 'List Your Business',
    trip_title: 'My Beppu Itinerary',
    trip_sub: 'Tailored for couples traveling without a car. Move at your own pace.',
    cta_find_join: 'Find someone to join you',
    filter_all: 'All',
    search_placeholder: 'Search places, onsens, local ramen, guides...',
  },
  ja: {
    brand_sub: '大分県別府市 · 温泉とローカルガイド',
    nav_explore: '見どころ',
    nav_experiences: '体験・過ごし方',
    nav_guides: 'ローカルガイド',
    nav_trip: 'マイトリップ',
    hero_title: 'あなたらしい、別府の旅を。',
    hero_subtitle: '名所めぐりから路地裏の名店まで、別府をよく知るローカルと一緒に体験しよう。',
    btn_explore: '別府を探索する',
    btn_find_local: 'ローカルを探す',
    cat_heading: '興味のあるテーマから選ぶ',
    popular_heading: '別府の定番・人気スポット',
    popular_sub: '初めての別府旅行で絶対に訪れたい厳選スポット',
    local_heading: 'もっとローカルな別府へ',
    local_sub: '有名な観光地の一歩先へ。別府に住み、学び、暮らす人々が本当に通うスポットと体験。',
    add_to_trip: '旅程に追加',
    in_trip: '旅程に追加済み',
    remove_from_trip: '旅程から削除',
    save: '保存',
    saved: '保存済み',
    view_guide: 'ガイドを見る',
    request_guide: 'ガイドにリクエスト',
    book_exp: '体験を予約',
    micro_guide_title: 'マイクロガイドという新しい旅のかたち',
    micro_guide_sub: '高額な終日ツアーは不要。駅前の案内や温泉のマナーなど、必要な時に45分〜3時間だけサポート。',
    partner_title: '地元のお店・ガイドの方へ',
    partner_desc: '別府ならではの体験を探す国内外の旅行者とつながりませんか？',
    btn_become_guide: 'ガイドに応募する',
    btn_list_biz: '店舗を掲載する',
    trip_title: 'マイ別府 旅程表',
    trip_sub: '車なしでもゆったり巡れる、パーソナライズされたプラン。',
    cta_find_join: '一緒に行ってくれるローカルを探す',
    filter_all: 'すべて',
    search_placeholder: 'スポット、温泉、ラーメン、ガイドを検索...',
  },
  ko: {
    brand_sub: '오이타현 벳부시 · 온천 & 로컬 가이드',
    nav_explore: '명소 탐색',
    nav_experiences: '로컬 체험',
    nav_guides: '로컬 가이드',
    nav_trip: '나의 여행',
    hero_title: '당신만의 방식으로, 벳부를 경험하세요.',
    hero_subtitle: '유명한 지옥 온천부터 숨겨진 골목 맛집까지, 벳부를 잘 아는 로컬과 함께하세요.',
    btn_explore: '벳부 탐색하기 →',
    btn_find_local: '로컬 가이드 찾기',
    cat_heading: '관심 있는 테마를 선택하세요',
    popular_heading: '벳부의 인기 명소',
    popular_sub: '처음 방문하는 여행자를 위한 필수 관광지와 온천',
    local_heading: '진짜 로컬 벳부를 만나다',
    local_sub: '유명 관광지를 넘어, 벳부에 살고 공부하는 APU 유학생과 주민들이 추천하는 숨은 명소.',
    add_to_trip: '내 여행에 추가',
    in_trip: '여행에 추가됨',
    remove_from_trip: '여행에서 삭제',
    save: '저장',
    saved: '저장됨',
    view_guide: '가이드 보기',
    request_guide: '가이드 신청',
    book_exp: '체험 예약하기',
    micro_guide_title: '마이크로 가이드 (Micro-Guide)란?',
    micro_guide_sub: '비싼 종일 투어는 필요 없습니다. 역 앞 길 찾기나 온천 예절 등 필요할 때 45분~3시간만 동행하세요.',
    partner_title: '현지 상점 및 가이드 파트너 모집',
    partner_desc: '벳부의 진정한 매력을 찾는 여행자들과 연결하세요. 커뮤니티 중심 플랫폼에 참여하세요.',
    btn_become_guide: '가이드 지원하기',
    btn_list_biz: '상점 등록하기',
    trip_title: '나의 벳부 여행 일정',
    trip_sub: '렌터카 없이도 버스로 여유롭게 둘러보는 맞춤 일정표.',
    cta_find_join: '함께할 로컬 가이드 찾기 →',
    filter_all: '전체',
    search_placeholder: '명소, 온천, 라멘, 가이드 검색...',
  },
  zh: {
    brand_sub: '大分县别府市 · 温泉与当地向导',
    nav_explore: '探索景点',
    nav_experiences: '当地体验',
    nav_guides: '当地向导',
    nav_trip: '我的行程',
    hero_title: '按自己的节奏，探索别府。',
    hero_subtitle: '发现著名的地狱温泉、深巷隐秘美食，并由熟知当地的向导带您游览。',
    btn_explore: '探索别府 →',
    btn_find_local: '寻找当地向导',
    cat_heading: '您对什么感兴趣？',
    popular_heading: '别府热门必去',
    popular_sub: '初访别府不可错过的经典地标与疗愈温泉',
    local_heading: '探索原汁原味的别府',
    local_sub: '不仅是热门景点。探访在别府生活、求学的立命馆APU留学生及当地居民钟爱的私房好去处。',
    add_to_trip: '加入行程',
    in_trip: '已加入行程',
    remove_from_trip: '从行程中移除',
    save: '收藏',
    saved: '已收藏',
    view_guide: '查看向导',
    request_guide: '预约向导',
    book_exp: '预订体验',
    micro_guide_title: '什么是微向导 (Micro-Guide)？',
    micro_guide_sub: '无需昂贵的一日跟团游。在需要的时候（45分钟至3小时），由当地人带您办理巴士通票、讲解温泉礼仪或探寻居酒屋。',
    partner_title: '面向当地商户与向导',
    partner_desc: '触达寻找地道别府体验的海内外旅行者。欢迎加入社区合作网络。',
    btn_become_guide: '申请成为向导',
    btn_list_biz: '入驻商户',
    trip_title: '我的别府 行程规划',
    trip_sub: '专为无车旅行定制，搭乘龟之井巴士轻松游览。',
    cta_find_join: '寻找同行当地向导 →',
    filter_all: '全部',
    search_placeholder: '搜索景点、温泉、特色拉面、向导...',
  },
  yue: {
    brand_sub: '大分縣別府市 · 溫泉與在地地膽導遊',
    nav_explore: '探索景點',
    nav_experiences: '在地體驗',
    nav_guides: '尋找地膽',
    nav_trip: '我的行程',
    hero_title: '隨你心意，玩轉別府。',
    hero_subtitle: '由著名地獄溫泉到巷仔隱世美食，等熟悉別府嘅APU大學生同地膽帶你玩！',
    btn_explore: '探索別府 →',
    btn_find_local: '搵本地地膽',
    cat_heading: '你想體驗咩主題？',
    popular_heading: '別府必去人氣熱點',
    popular_sub: '第一次去別府必訪嘅溫泉同地標',
    local_heading: '發掘在地深度別府',
    local_sub: '跳出一般旅行團路線！探索別府街坊、APU國際學生私藏嘅拉麵舖同秘境溫泉。',
    add_to_trip: '加入我的行程',
    in_trip: '已在行程中',
    remove_from_trip: '由行程中移除',
    save: '收藏',
    saved: '已收藏',
    view_guide: '查看地膽資料',
    request_guide: '預約地膽同行',
    book_exp: '預約特色體驗',
    micro_guide_title: '咩係微導遊 (Micro-Guide)？',
    micro_guide_sub: '唔使報昂貴嘅全日旅行團！別府站接送買巴士飛、竹瓦沙湯溫泉禮儀，45分鐘至3個鐘靈活同行。',
    partner_title: '在地商戶與導遊招募',
    partner_desc: '連繫熱愛地道文化嘅各國旅客，一齊推廣別府優質深度遊。',
    btn_become_guide: '加入成為地膽導遊',
    btn_list_biz: '商戶刊登合作',
    trip_title: '我的別府 自由行規劃',
    trip_sub: '專為無自駕旅客打造，搭龜之井巴士輕鬆走勻各大溫泉。',
    cta_find_join: '搵位地膽一齊出發 →',
    filter_all: '全部',
    search_placeholder: '搜尋景點、溫泉、別府冷麵、地膽...',
  }
};

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧', label: 'English' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', label: '한국어' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳', label: '简体中文' },
  { code: 'yue', name: '繁體中文 / 粵語', flag: '🇭🇰', label: '繁體 / 粵語' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', label: '日本語' }
];

class BeppuDatabase {
  constructor() {
    this.initDatabase();
  }

  initDatabase(forceReset = false) {
    const seed = window.BEPPU_DATA || {};

    if (forceReset || localStorage.getItem(STORAGE_KEYS.DB_VERSION) !== '2.1') {
      localStorage.setItem(STORAGE_KEYS.DB_VERSION, '2.1');
      localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(seed.places || []));
      localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(seed.guides || []));
      localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(seed.experiences || []));
      localStorage.setItem(STORAGE_KEYS.ITINERARY, JSON.stringify(seed.defaultItinerary || []));
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(['takegawara-onsen', 'beppu-hell-tour']));
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([
        {
          id: 'REQ-1042',
          guideId: 'maria-santos',
          guideName: 'Maria Santos',
          travelerName: 'Sarah & Liam Jenkins',
          email: 'sarah.liam@example.com',
          phone: '+44 7700 900077',
          date: 'Tomorrow (Saturday, Oct 2)',
          time: '10:00 AM',
          guests: 2,
          language: 'English',
          activity: 'Beppu Station Transit & Onsen Kickoff',
          notes: 'First time in Beppu! We have 2 suitcases and want to purchase the Kamenoi 2-day bus passes.',
          price: '¥2,500',
          selectedPlaceIds: ['beppu-tower-station'],
          status: 'Confirmed',
          created: '2026-10-01T09:30:00Z',
          confirmedAt: '2026-10-01T09:42:00Z'
        }
      ]));
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify({
        name: 'Sarah & Liam Jenkins',
        email: 'sarah.liam@example.com',
        nationality: 'United Kingdom',
        interests: ['Onsen', 'Local Food', 'Scenic Views'],
        partySize: 2,
        hasCar: false
      }));
    }

    this.places = this._get(STORAGE_KEYS.PLACES, seed.places || []);
    this.guides = this._get(STORAGE_KEYS.GUIDES, seed.guides || []);
    this.experiences = this._get(STORAGE_KEYS.EXPERIENCES, seed.experiences || []);
    this.itinerary = this._get(STORAGE_KEYS.ITINERARY, seed.defaultItinerary || []);
    this.savedIds = this._get(STORAGE_KEYS.SAVED, ['takegawara-onsen']);
    this.bookings = this._get(STORAGE_KEYS.BOOKINGS, []);
    this.userProfile = this._get(STORAGE_KEYS.USER_PROFILE, { name: 'Visitor', email: '' });
    this.lang = localStorage.getItem(STORAGE_KEYS.LANG) || 'en';
  }

  _get(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error(`Error reading ${key}`, e);
      return fallback;
    }
  }

  _set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error(`Error writing ${key}`, e);
    }
  }

  // -------------------------------------------------------------
  // Validation Utilities
  // -------------------------------------------------------------
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  validatePhone(phone) {
    if (!phone) return true; // optional
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    return cleaned.length >= 7 && cleaned.length <= 15;
  }

  validateTimeFormat(timeStr) {
    // Accepts "10:00 AM", "14:30", "2:00 PM"
    const re = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s*(AM|PM|am|pm)$|^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return re.test(timeStr.trim());
  }

  // -------------------------------------------------------------
  // Language & i18n
  // -------------------------------------------------------------
  getLang() {
    return this.lang;
  }

  setLang(lang) {
    this.lang = lang;
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    document.documentElement.lang = lang;
    window.dispatchEvent(new CustomEvent('beppu:langchange', { detail: { lang } }));
  }

  t(key) {
    const dict = I18N[this.lang] || I18N.en;
    return dict[key] || I18N.en[key] || key;
  }

  // -------------------------------------------------------------
  // Itinerary Management
  // -------------------------------------------------------------
  getItinerary(dayFilter = null) {
    if (!dayFilter || dayFilter === 'all') {
      return [...this.itinerary];
    }
    return this.itinerary.filter(item => {
      const itemDay = (item.day || '').toLowerCase();
      if (dayFilter === 'sat') return itemDay.includes('sat') || itemDay.includes('day 1');
      if (dayFilter === 'sun') return itemDay.includes('sun') || itemDay.includes('day 2');
      return true;
    });
  }

  addToItinerary(item) {
    // Validation: Title required
    const title = (item.title || item.name || '').trim();
    if (!title) {
      return { success: false, error: 'Stop title is required.' };
    }

    // Validation: Check duplicate by placeId
    if (item.placeId) {
      const exists = this.itinerary.some(i => i.placeId === item.placeId);
      if (exists) {
        return { success: false, error: `"${title}" is already in your itinerary.`, isDuplicate: true };
      }
    }

    // Time validation
    let time = (item.time || '').trim();
    if (!time || !this.validateTimeFormat(time)) {
      time = this.suggestNextTime();
    }

    const newItem = {
      id: 'stop-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      placeId: item.placeId || null,
      title: title,
      day: item.day || 'Day 1 · Saturday',
      time: time,
      duration: item.duration || '1.5 – 2 hours',
      cost: item.cost || item.price || 'Free',
      notes: (item.notes || (item.shortDesc ? item.shortDesc.slice(0, 85) + '...' : 'Custom plan')).trim(),
      assignedGuideId: item.assignedGuideId || null,
      guideName: item.guideName || null,
      guideRole: item.guideRole || null,
      status: 'planned'
    };

    this.itinerary.push(newItem);
    this._saveItinerary();
    return { success: true, item: newItem };
  }

  removeFromItinerary(id) {
    const initialLen = this.itinerary.length;
    this.itinerary = this.itinerary.filter(i => i.id !== id && i.placeId !== id);
    if (this.itinerary.length !== initialLen) {
      this._saveItinerary();
      return true;
    }
    return false;
  }

  updateItineraryItem(id, updates) {
    const item = this.itinerary.find(i => i.id === id);
    if (!item) return { success: false, error: 'Item not found' };

    if (updates.time && !this.validateTimeFormat(updates.time)) {
      return { success: false, error: 'Please enter a valid time (e.g. 10:00 AM or 14:30).' };
    }

    if (updates.title && !updates.title.trim()) {
      return { success: false, error: 'Title cannot be blank.' };
    }

    Object.assign(item, updates);
    this._saveItinerary();
    return { success: true, item };
  }

  reorderItinerary(fromIdx, toIdx) {
    if (fromIdx < 0 || toIdx < 0 || fromIdx >= this.itinerary.length || toIdx >= this.itinerary.length) {
      return false;
    }
    const moved = this.itinerary.splice(fromIdx, 1)[0];
    this.itinerary.splice(toIdx, 0, moved);
    this._saveItinerary();
    return true;
  }

  isInItinerary(placeId) {
    if (!placeId) return false;
    return this.itinerary.some(item => item.placeId === placeId);
  }

  suggestNextTime() {
    const defaultTimes = ['09:30 AM', '11:15 AM', '01:30 PM', '03:45 PM', '06:00 PM', '08:00 PM'];
    return defaultTimes[this.itinerary.length % defaultTimes.length];
  }

  clearItinerary() {
    this.itinerary = [];
    this._saveItinerary();
  }

  resetItineraryToDefaults() {
    const seed = window.BEPPU_DATA ? window.BEPPU_DATA.defaultItinerary : [];
    this.itinerary = JSON.parse(JSON.stringify(seed));
    this._saveItinerary();
  }

  _saveItinerary() {
    this._set(STORAGE_KEYS.ITINERARY, this.itinerary);
    window.dispatchEvent(new CustomEvent('beppu:itinerarychange', { detail: { itinerary: this.itinerary } }));
  }

  // -------------------------------------------------------------
  // Saved Places (Wishlist)
  // -------------------------------------------------------------
  toggleSave(id) {
    const index = this.savedIds.indexOf(id);
    let isSaved = false;
    if (index > -1) {
      this.savedIds.splice(index, 1);
    } else {
      this.savedIds.push(id);
      isSaved = true;
    }
    this._set(STORAGE_KEYS.SAVED, this.savedIds);
    window.dispatchEvent(new CustomEvent('beppu:savedchange', { detail: { savedIds: this.savedIds, id, isSaved } }));
    return isSaved;
  }

  isSaved(id) {
    return this.savedIds.includes(id);
  }

  // -------------------------------------------------------------
  // Booking Requests & Verification Engine
  // -------------------------------------------------------------
  validateBookingRequest(formData) {
    const errors = {};

    // Traveler Name
    if (!formData.travelerName || formData.travelerName.trim().length < 2) {
      errors.travelerName = 'Please enter your full name (at least 2 characters).';
    }

    // Email
    if (!formData.email || !this.validateEmail(formData.email)) {
      errors.email = 'Please provide a valid email address for confirmation.';
    }

    // Phone
    if (formData.phone && !this.validatePhone(formData.phone)) {
      errors.phone = 'Please provide a valid phone number (or leave blank).';
    }

    // Date
    if (!formData.date || !formData.date.trim()) {
      errors.date = 'Please select a date for your experience.';
    }

    // Time
    if (!formData.time || !formData.time.trim()) {
      errors.time = 'Please select a preferred meeting time.';
    }

    // Guests
    const guests = parseInt(formData.guests, 10);
    if (isNaN(guests) || guests < 1 || guests > 12) {
      errors.guests = 'Party size must be between 1 and 12 persons.';
    }

    // Notes
    if (!formData.notes || formData.notes.trim().length < 8) {
      errors.notes = 'Please include a brief note (at least 8 characters) explaining what you would like to do.';
    }

    // Guide availability check
    if (!formData.guideId) {
      errors.guideId = 'Please select a valid guide.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  createBooking(bookingInput) {
    const validation = this.validateBookingRequest(bookingInput);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const id = 'REQ-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id,
      guideId: bookingInput.guideId,
      guideName: bookingInput.guideName,
      travelerName: bookingInput.travelerName.trim(),
      email: bookingInput.email.trim(),
      phone: (bookingInput.phone || '').trim(),
      date: bookingInput.date,
      time: bookingInput.time,
      guests: parseInt(bookingInput.guests, 10),
      language: bookingInput.language || 'English',
      activity: bookingInput.activity || 'Personalized Tour',
      notes: bookingInput.notes.trim(),
      price: bookingInput.price,
      selectedPlaceIds: bookingInput.selectedPlaceIds || [],
      status: 'Requested',
      created: new Date().toISOString()
    };

    this.bookings.unshift(newBooking);
    this._set(STORAGE_KEYS.BOOKINGS, this.bookings);

    // Update matching itinerary items
    if (newBooking.selectedPlaceIds && newBooking.selectedPlaceIds.length > 0) {
      newBooking.selectedPlaceIds.forEach(pid => {
        const item = this.itinerary.find(i => i.placeId === pid || i.id === pid);
        if (item) {
          item.assignedGuideId = newBooking.guideId;
          item.guideName = newBooking.guideName;
          item.guideRole = 'Requested Companion';
          item.status = 'requested';
        }
      });
      this._saveItinerary();
    }

    // Simulate realistic asynchronous confirmation after 4 seconds
    setTimeout(() => {
      const target = this.bookings.find(b => b.id === id);
      if (target && target.status === 'Requested') {
        target.status = 'Confirmed';
        target.confirmedAt = new Date().toISOString();
        this._set(STORAGE_KEYS.BOOKINGS, this.bookings);

        // Update itinerary item status to confirmed
        if (target.selectedPlaceIds) {
          target.selectedPlaceIds.forEach(pid => {
            const item = this.itinerary.find(i => i.placeId === pid || i.id === pid);
            if (item) item.status = 'confirmed';
          });
          this._saveItinerary();
        }

        window.dispatchEvent(new CustomEvent('beppu:bookingconfirmed', { detail: { booking: target } }));
        if (window.showToast) {
          window.showToast(`🎉 ${target.guideName} accepted request ${id}!`, 'success');
        }
      }
    }, 4500);

    return { success: true, booking: newBooking };
  }

  cancelBooking(id) {
    const booking = this.bookings.find(b => b.id === id);
    if (!booking) return false;

    booking.status = 'Cancelled';
    this._set(STORAGE_KEYS.BOOKINGS, this.bookings);

    // Clean up itinerary companion status
    this.itinerary.forEach(item => {
      if (item.assignedGuideId === booking.guideId && item.status !== 'completed') {
        item.assignedGuideId = null;
        item.guideName = null;
        item.guideRole = null;
        item.status = 'planned';
      }
    });
    this._saveItinerary();
    return true;
  }

  // -------------------------------------------------------------
  // Guide Reviews (Persistence & Rating Recalculation)
  // -------------------------------------------------------------
  validateReview(reviewInput) {
    const errors = {};
    if (!reviewInput.author || reviewInput.author.trim().length < 2) {
      errors.author = 'Please enter your name.';
    }
    const rating = parseInt(reviewInput.rating, 10);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      errors.rating = 'Please choose a star rating from 1 to 5.';
    }
    if (!reviewInput.text || reviewInput.text.trim().length < 15) {
      errors.text = 'Review must be at least 15 characters long.';
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  addGuideReview(guideId, reviewData) {
    const validation = this.validateReview(reviewData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const guide = this.guides.find(g => g.id === guideId);
    if (!guide) {
      return { success: false, error: 'Guide not found' };
    }

    const newReview = {
      id: 'rev-' + Date.now(),
      author: reviewData.author.trim(),
      date: 'Just now · Oct 2026',
      rating: parseInt(reviewData.rating, 10),
      text: reviewData.text.trim()
    };

    if (!guide.reviews) guide.reviews = [];
    guide.reviews.unshift(newReview);
    guide.reviewsCount = (guide.reviewsCount || 0) + 1;

    // Recalculate average rating
    const totalStars = guide.reviews.reduce((acc, r) => acc + (r.rating || 5), 0);
    guide.rating = parseFloat((totalStars / guide.reviews.length).toFixed(2));

    this._set(STORAGE_KEYS.GUIDES, this.guides);
    window.dispatchEvent(new CustomEvent('beppu:reviewadded', { detail: { guideId, review: newReview, guide } }));

    return { success: true, review: newReview, guide };
  }

  // -------------------------------------------------------------
  // Data Reset Functionality
  // -------------------------------------------------------------
  resetAllData() {
    this.initDatabase(true);
    window.location.reload();
  }
}

// Global DB instance
window.beppuStore = new BeppuDatabase();

// Global Toast Notification Utility
window.showToast = function (message, type = 'info') {
  let container = document.getElementById('beppu-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'beppu-toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${type === 'success' ? '✓' : type === 'warning' ? '⚠️' : type === 'error' ? '⛔' : 'ℹ️'}</span>
      <span class="toast-text">${message}</span>
    </div>
    <button class="toast-close" aria-label="Close">&times;</button>
  `;

  toast.querySelector('.toast-close').onclick = () => {
    toast.classList.add('toast-fadeout');
    setTimeout(() => toast.remove(), 250);
  };

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('toast-visible'), 10);
  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.remove('toast-visible');
      toast.classList.add('toast-fadeout');
      setTimeout(() => toast.remove(), 300);
    }
  }, 4500);
};
