import i18nData from '~/data/i18n.json'
import categoriesData from '~/data/categories.json'
import placesData from '~/data/places.json'
import experiencesData from '~/data/experiences.json'
import guidesData from '~/data/guides.json'
import defaultItineraryData from '~/data/itinerary.json'

export type SupportedLocale = 'en' | 'ja' | 'ko' | 'zh' | 'yue'

export interface ToastItem {
  id: number
  message: string
  type: 'success' | 'info' | 'warning'
}

export interface UserPreferences {
  dietary: string[]
  accessibility: string[]
  budget: string[]
  experience: string[]
  practical: string[]
}

export interface PreferenceOption {
  key: string
  category: keyof UserPreferences
  icon: string
  label: Record<SupportedLocale, string>
}

export const PREFERENCE_CATEGORIES: Array<{
  id: keyof UserPreferences
  i18nKey: string
  icon: string
}> = [
  { id: 'dietary', i18nKey: 'pref_dietary', icon: '🥗' },
  { id: 'accessibility', i18nKey: 'pref_accessibility', icon: '♿' },
  { id: 'budget', i18nKey: 'pref_budget', icon: '💰' },
  { id: 'experience', i18nKey: 'pref_experience', icon: '✨' },
  { id: 'practical', i18nKey: 'pref_practical', icon: 'ℹ️' }
]

export const PREFERENCE_DEFINITIONS: Record<keyof UserPreferences, PreferenceOption[]> = {
  dietary: [
    {
      key: 'halal-certified',
      category: 'dietary',
      icon: '🕌',
      label: {
        en: 'Halal certified',
        ja: 'ハラール認証',
        ko: '할랄 공식 인증',
        zh: '清真认证',
        yue: '清真認證'
      }
    },
    {
      key: 'halal-options',
      category: 'dietary',
      icon: '🕌',
      label: {
        en: 'Halal options',
        ja: 'ハラール対応メニュー',
        ko: '할랄 옵션 제공',
        zh: '清真友好选项',
        yue: '清真友好選項'
      }
    },
    {
      key: 'no-pork',
      category: 'dietary',
      icon: '🚫🐖',
      label: {
        en: 'No pork',
        ja: '豚肉不使用',
        ko: '돼지고기 미사용',
        zh: '不含猪肉',
        yue: '無豬肉成分'
      }
    },
    {
      key: 'kosher',
      category: 'dietary',
      icon: '✡️',
      label: {
        en: 'Kosher',
        ja: 'コーシャ対応',
        ko: '코셔 대응',
        zh: '犹太洁食',
        yue: '猶太潔食'
      }
    },
    {
      key: 'vegetarian',
      category: 'dietary',
      icon: '🥗',
      label: {
        en: 'Vegetarian options',
        ja: 'ベジタリアン対応',
        ko: '채식 옵션',
        zh: '素食选项',
        yue: '素食選項'
      }
    },
    {
      key: 'vegan',
      category: 'dietary',
      icon: '🌱',
      label: {
        en: 'Vegan options',
        ja: 'ヴィーガン対応',
        ko: '비건 옵션',
        zh: '纯素选项',
        yue: '純素選項'
      }
    },
    {
      key: 'gluten-free',
      category: 'dietary',
      icon: '🌾',
      label: {
        en: 'Gluten-free',
        ja: 'グルテンフリー',
        ko: '글루텐 프리',
        zh: '无麸质',
        yue: '無麩質'
      }
    },
    {
      key: 'allergy-friendly',
      category: 'dietary',
      icon: '🥜',
      label: {
        en: 'Nut-free / allergy-friendly',
        ja: 'アレルギー配慮',
        ko: '알레르기 친화 / 견과류 미사용',
        zh: '无坚果 / 过敏友好',
        yue: '無堅果 / 防敏友善'
      }
    },
    {
      key: 'no-alcohol',
      category: 'dietary',
      icon: '🚫🍶',
      label: {
        en: 'No alcohol',
        ja: 'アルコール不使用・ノンアルコール',
        ko: '논알코올',
        zh: '不含酒精',
        yue: '不含酒精'
      }
    }
  ],
  accessibility: [
    {
      key: 'wheelchair',
      category: 'accessibility',
      icon: '♿',
      label: {
        en: 'Wheelchair accessible',
        ja: '車椅子対応',
        ko: '휠체어 접근 가능',
        zh: '无障碍轮椅通道',
        yue: '無障礙輪椅通道'
      }
    },
    {
      key: 'step-free',
      category: 'accessibility',
      icon: '🪜',
      label: {
        en: 'Step-free access',
        ja: '段差なし・スロープ完備',
        ko: '단차 없는 슬로프',
        zh: '平坦无台阶通道',
        yue: '平坦無台階通道'
      }
    },
    {
      key: 'accessible-restroom',
      category: 'accessibility',
      icon: '🚻',
      label: {
        en: 'Accessible restroom',
        ja: '多目的・車椅子トイレ',
        ko: '다목적 장애인 화장실',
        zh: '多功能无障碍洗手间',
        yue: '多功能無障礙洗手間'
      }
    },
    {
      key: 'stroller-friendly',
      category: 'accessibility',
      icon: '👶',
      label: {
        en: 'Family/stroller friendly',
        ja: 'ベビーカー対応',
        ko: '유모차 동반 가능',
        zh: '婴儿车友好',
        yue: '嬰兒車友善'
      }
    }
  ],
  budget: [
    {
      key: 'free',
      category: 'budget',
      icon: '🆓',
      label: {
        en: 'Free admission',
        ja: '入場無料',
        ko: '무료 입장',
        zh: '免费入场',
        yue: '免費入場'
      }
    },
    {
      key: 'budget',
      category: 'budget',
      icon: '💴',
      label: {
        en: 'Budget (under ¥1,000)',
        ja: 'リーズナブル（〜¥1,000）',
        ko: '알뜰 (1,000엔 이하)',
        zh: '实惠（1,000日元以内）',
        yue: '平價（1,000日圓內）'
      }
    },
    {
      key: 'mid-range',
      category: 'budget',
      icon: '💴💴',
      label: {
        en: 'Mid-range (¥1,000–¥3,000)',
        ja: '標準（¥1,000〜¥3,000）',
        ko: '중간 (1,000~3,000엔)',
        zh: '中等（1,000–3,000日元）',
        yue: '中檔（1,000–3,000日圓）'
      }
    },
    {
      key: 'premium',
      category: 'budget',
      icon: '💴💴💴',
      label: {
        en: 'Premium',
        ja: 'プレミアム',
        ko: '프리미엄',
        zh: '高档尊享',
        yue: '高級奢華'
      }
    },
    {
      key: 'discounts',
      category: 'budget',
      icon: '🏷️',
      label: {
        en: 'Discounts available',
        ja: '各種割引あり',
        ko: '할인 혜택 제공',
        zh: '有优惠折扣',
        yue: '提供優惠折扣'
      }
    },
    {
      key: 'student',
      category: 'budget',
      icon: '🎓',
      label: {
        en: 'Student discount',
        ja: '学割対応',
        ko: '학생 할인',
        zh: '学生优惠',
        yue: '學生優惠'
      }
    },
    {
      key: 'family-discount',
      category: 'budget',
      icon: '👨‍👩‍👧',
      label: {
        en: 'Group/family discount',
        ja: '団体・ファミリー割引',
        ko: '단체 / 가족 할인',
        zh: '团体/家庭优惠',
        yue: '團體/家庭優惠'
      }
    },
    {
      key: 'tourist-pass',
      category: 'budget',
      icon: '🎫',
      label: {
        en: 'Tourist/pass discount',
        ja: '周遊パス・観光パス割引',
        ko: '투어리스트 / 패스 할인',
        zh: '周游券/观光通票优惠',
        yue: '周遊券/觀光通票優惠'
      }
    }
  ],
  experience: [
    {
      key: 'family',
      category: 'experience',
      icon: '👨‍👩‍👧',
      label: {
        en: 'Family-friendly',
        ja: 'ファミリー向け',
        ko: '가족 여행',
        zh: '家庭亲子',
        yue: '家庭同樂'
      }
    },
    {
      key: 'solo',
      category: 'experience',
      icon: '🚶',
      label: {
        en: 'Solo-friendly',
        ja: 'ひとり旅歓迎',
        ko: '혼행족 친화',
        zh: '单人独行友好',
        yue: '一人獨遊友善'
      }
    },
    {
      key: 'couple',
      category: 'experience',
      icon: '💑',
      label: {
        en: 'Couple/date',
        ja: 'カップル・デート',
        ko: '커플 / 데이트',
        zh: '情侣约会',
        yue: '情侶約會'
      }
    },
    {
      key: 'groups',
      category: 'experience',
      icon: '👥',
      label: {
        en: 'Groups',
        ja: 'グループ向け',
        ko: '단체 여행',
        zh: '团体结伴',
        yue: '結伴群遊'
      }
    },
    {
      key: 'kids',
      category: 'experience',
      icon: '🎈',
      label: {
        en: 'Kid-friendly',
        ja: '子ども歓迎',
        ko: '아이 동반 추천',
        zh: '适合儿童',
        yue: '適合小朋友'
      }
    },
    {
      key: 'quiet',
      category: 'experience',
      icon: '🤫',
      label: {
        en: 'Quiet & tranquil',
        ja: '静寂・リラックス',
        ko: '조용하고 아늑함',
        zh: '幽静安宁',
        yue: '清幽寧靜'
      }
    },
    {
      key: 'nightlife',
      category: 'experience',
      icon: '🏮',
      label: {
        en: 'Nightlife & late dining',
        ja: '夜間営業・深夜酒場',
        ko: '나이트라이프 / 심야 식당',
        zh: '夜生活 / 深夜食堂',
        yue: '夜生活 / 深宵食堂'
      }
    },
    {
      key: 'photo',
      category: 'experience',
      icon: '📸',
      label: {
        en: 'Photography-friendly',
        ja: 'フォトジェニック・写真映え',
        ko: '포토스팟 / 사진 촬영',
        zh: '打卡拍照圣地',
        yue: '打卡影相勝地'
      }
    }
  ],
  practical: [
    {
      key: 'reservation',
      category: 'practical',
      icon: '📋',
      label: {
        en: 'Reservation required',
        ja: '要予約',
        ko: '예약 필수',
        zh: '需提前预约',
        yue: '需要預約'
      }
    },
    {
      key: 'walk-ins',
      category: 'practical',
      icon: '🚪',
      label: {
        en: 'Walk-ins accepted',
        ja: '予約なしOK',
        ko: '현장 입장 가능',
        zh: '可直接前往',
        yue: '無需預約可隨時前往'
      }
    },
    {
      key: 'cashless',
      category: 'practical',
      icon: '💳',
      label: {
        en: 'Cashless accepted',
        ja: 'キャッシュレス対応',
        ko: '카드/간편결제 가능',
        zh: '支持非现金支付',
        yue: '支援電子支付'
      }
    },
    {
      key: 'english',
      category: 'practical',
      icon: '🇬🇧',
      label: {
        en: 'English support',
        ja: '英語対応あり',
        ko: '영어 응대 가능',
        zh: '提供英文支持',
        yue: '提供英語服務'
      }
    },
    {
      key: 'multilingual',
      category: 'practical',
      icon: '🌐',
      label: {
        en: 'Multilingual support',
        ja: '多言語案内（中・韓・英）',
        ko: '다국어 지원 (영/중/한)',
        zh: '多语种指南',
        yue: '多國語言指南'
      }
    },
    {
      key: 'wifi',
      category: 'practical',
      icon: '📶',
      label: {
        en: 'Free Wi-Fi',
        ja: '無料Wi-Fi完備',
        ko: '무료 Wi-Fi',
        zh: '免费Wi-Fi',
        yue: '免費Wi-Fi'
      }
    },
    {
      key: 'parking',
      category: 'practical',
      icon: '🅿️',
      label: {
        en: 'Parking available',
        ja: '駐車場あり',
        ko: '주차장 완비',
        zh: '附设停车场',
        yue: '附設停車場'
      }
    }
  ]
}

export function placeMatchesAttribute(place: any, key: string): boolean {
  const attrs = place.attributes || {}
  const dietary = attrs.dietary || {}
  const access = attrs.accessibility || {}
  const budget = attrs.budgetOffers || {}
  const exp = attrs.experience || {}
  const prac = attrs.practical || {}

  switch (key) {
    // Dietary
    case 'halal-certified': return dietary.halalStatus === 'certified'
    case 'halal-options': return dietary.halalStatus === 'certified' || dietary.halalStatus === 'options'
    case 'no-pork': return dietary.halalStatus === 'certified' || dietary.halalStatus === 'options' || dietary.halalStatus === 'no_pork'
    case 'kosher': return !!dietary.kosher
    case 'vegetarian': return !!dietary.vegetarianOptions
    case 'vegan': return !!dietary.veganOptions
    case 'gluten-free': return !!dietary.glutenFree
    case 'allergy-friendly': return !!dietary.allergyFriendly
    case 'no-alcohol': return !!dietary.noAlcohol

    // Accessibility
    case 'wheelchair': return !!access.wheelchairAccessible
    case 'step-free': return !!access.stepFreeAccess
    case 'accessible-restroom': return !!access.accessibleRestroom
    case 'stroller-friendly': return !!access.strollerFriendly

    // Budget & Offers
    case 'free': return budget.tier === 'free'
    case 'budget': return budget.tier === 'budget' || budget.tier === 'free'
    case 'mid-range': return budget.tier === 'mid'
    case 'premium': return budget.tier === 'premium'
    case 'discounts': return !!budget.discountsAvailable
    case 'student': return !!budget.studentDiscount
    case 'family-discount': return !!budget.groupFamilyDiscount
    case 'tourist-pass': return !!budget.touristPassDiscount

    // Experience
    case 'family': return !!exp.familyFriendly
    case 'solo': return !!exp.soloFriendly
    case 'couple': return !!exp.coupleDate
    case 'groups': return !!exp.groups
    case 'kids': return !!exp.kidFriendly
    case 'quiet': return !!exp.quiet
    case 'nightlife': return !!exp.nightlife
    case 'photo': return !!exp.photoFriendly

    // Practical
    case 'reservation': return !!prac.reservationRequired
    case 'walk-ins': return !!prac.walkInsAccepted
    case 'cashless': return !!prac.cashless
    case 'english': return !!prac.englishSupport
    case 'multilingual': return !!prac.multilingualSupport
    case 'wifi': return !!prac.wifi
    case 'parking': return !!prac.parking

    default: return false
  }
}

export function useBeppu() {
  const currentLocale = useState<SupportedLocale>('beppu_locale', () => 'en')
  const itinerary = useState<any[]>('beppu_itinerary', () => [...defaultItineraryData])
  const savedPlaces = useState<string[]>('beppu_saved_places', () => ['beppu-hell-tour', 'takegawara-onsen'])
  const toasts = useState<ToastItem[]>('beppu_toasts', () => [])
  const customGuideReviews = useState<Record<string, any[]>>('beppu_custom_reviews', () => ({}))
  const bookings = useState<any[]>('beppu_bookings', () => [])
  const isHydrated = useState<boolean>('beppu_hydrated', () => false)

  // Global user preferences for dietary, accessibility, budget, experience, practical
  const userPreferences = useState<UserPreferences>('beppu_user_preferences', () => ({
    dietary: [],
    accessibility: [],
    budget: [],
    experience: [],
    practical: []
  }))

  // Initialize from localStorage on client side
  const initClientState = () => {
    if (import.meta.client && !isHydrated.value) {
      isHydrated.value = true
      try {
        const storedLang = localStorage.getItem('beppu_locale') as SupportedLocale
        if (storedLang && ['en', 'ja', 'ko', 'zh', 'yue'].includes(storedLang)) {
          currentLocale.value = storedLang
        }
        const storedTrip = localStorage.getItem('beppu_itinerary')
        if (storedTrip) {
          itinerary.value = JSON.parse(storedTrip)
        }
        const storedSaved = localStorage.getItem('beppu_saved_places')
        if (storedSaved) {
          savedPlaces.value = JSON.parse(storedSaved)
        }
        const storedReviews = localStorage.getItem('beppu_custom_reviews')
        if (storedReviews) {
          customGuideReviews.value = JSON.parse(storedReviews)
        }
        const storedBookings = localStorage.getItem('beppu_bookings')
        if (storedBookings) {
          bookings.value = JSON.parse(storedBookings)
        }
        const storedPrefs = localStorage.getItem('beppu_user_preferences')
        if (storedPrefs) {
          userPreferences.value = JSON.parse(storedPrefs)
        }
      } catch (e) {
        console.error('Failed to load local storage state:', e)
      }
    }
  }

  // Toast Notification
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now() + Math.random()
    toasts.value.push({ id, message, type })
    if (import.meta.client) {
      setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id)
      }, 4200)
    }
  }

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  // Internationalization translation function
  const t = (key: string, replacements?: Record<string, string | number>): string => {
    const lang = currentLocale.value || 'en'
    const dict = (i18nData as Record<string, Record<string, string>>)[lang] || (i18nData as Record<string, Record<string, string>>)['en']
    let str = dict?.[key] || (i18nData as Record<string, Record<string, string>>)['en']?.[key] || key
    if (replacements) {
      for (const [rKey, rVal] of Object.entries(replacements)) {
        str = str.replace(new RegExp(`\\{${rKey}\\}`, 'g'), String(rVal))
      }
    }
    return str
  }

  // Localize an entity's fields based on currentLocale
  const localize = (item: any) => {
    if (!item) return {}
    const lang = currentLocale.value || 'en'
    const localized = item.locales?.[lang] || item.locales?.['en'] || {}
    return {
      ...item,
      ...localized
    }
  }

  const setLocale = (lang: SupportedLocale) => {
    currentLocale.value = lang
    if (import.meta.client) {
      localStorage.setItem('beppu_locale', lang)
      document.documentElement.lang = lang
    }
    const toastMessages: Record<SupportedLocale, string> = {
      en: 'Language set to English 🇬🇧',
      ko: '언어가 한국어로 변경되었습니다 🇰🇷',
      zh: '语言已切换为简体中文 🇨🇳',
      yue: '語言已切換為繁體中文 / 粵語 🇭🇰',
      ja: '言語を日本語に切り替えました 🇯🇵'
    }
    showToast(toastMessages[lang] || 'Language updated', 'info')
  }

  // Preferences Actions
  const persistPreferences = () => {
    if (import.meta.client) {
      localStorage.setItem('beppu_user_preferences', JSON.stringify(userPreferences.value))
    }
  }

  const togglePreference = (category: keyof UserPreferences, key: string) => {
    const currentList = userPreferences.value[category] || []
    if (currentList.includes(key)) {
      userPreferences.value[category] = currentList.filter(k => k !== key)
    } else {
      userPreferences.value[category] = [...currentList, key]
    }
    persistPreferences()
  }

  const hasPreference = (category: keyof UserPreferences, key: string): boolean => {
    return (userPreferences.value[category] || []).includes(key)
  }

  const clearPreferences = () => {
    userPreferences.value = {
      dietary: [],
      accessibility: [],
      budget: [],
      experience: [],
      practical: []
    }
    persistPreferences()
    showToast(t('pref_clear_all') || 'Preferences reset', 'info')
  }

  const activePreferencesCount = computed(() => {
    const p = userPreferences.value
    return p.dietary.length + p.accessibility.length + p.budget.length + p.experience.length + p.practical.length
  })

  const hasAnyActivePreferences = computed(() => activePreferencesCount.value > 0)

  // Check if a place matches all active user preference filters
  const placeMatchesPreferences = (place: any): boolean => {
    const prefs = userPreferences.value
    const activeCategories = (Object.keys(prefs) as Array<keyof UserPreferences>).filter(cat => prefs[cat].length > 0)
    
    if (activeCategories.length === 0) return true

    // Check each active category: place must satisfy ALL selected requirements in that category
    for (const cat of activeCategories) {
      const selectedKeys = prefs[cat]
      for (const key of selectedKeys) {
        if (!placeMatchesAttribute(place, key)) {
          return false
        }
      }
    }
    return true
  }

  // Card Badges Prominence Logic
  // Selected user preferences rise to the top; if none selected, shows top 2-3 notable badges
  const getPlaceBadges = (place: any) => {
    const lang = currentLocale.value || 'en'
    const activePrefs = userPreferences.value
    const allActiveKeys = [
      ...activePrefs.dietary,
      ...activePrefs.accessibility,
      ...activePrefs.budget,
      ...activePrefs.experience,
      ...activePrefs.practical
    ]

    const matchedBadges: Array<{
      key: string
      category: keyof UserPreferences
      icon: string
      label: string
      isProminent: boolean
    }> = []

    // Collect all badges this place satisfies
    for (const [catName, options] of Object.entries(PREFERENCE_DEFINITIONS)) {
      const cat = catName as keyof UserPreferences
      for (const opt of options) {
        if (placeMatchesAttribute(place, opt.key)) {
          const isSelected = allActiveKeys.includes(opt.key)
          matchedBadges.push({
            key: opt.key,
            category: cat,
            icon: opt.icon,
            label: opt.label[lang] || opt.label.en,
            isProminent: isSelected
          })
        }
      }
    }

    if (allActiveKeys.length > 0) {
      // Prioritize prominent matching badges
      const prominent = matchedBadges.filter(b => b.isProminent)
      const others = matchedBadges.filter(b => !b.isProminent)
      
      // If user selected multiple, show all matching prominent badges (up to 4)
      if (prominent.length > 0) {
        const result = [...prominent]
        if (result.length < 3 && others.length > 0 && others[0]) {
          result.push(others[0])
        }
        return result.slice(0, 4)
      }
    }

    // Default view when no filters active: Pick top 2-3 distinctive badges
    // Preference order: Accessibility > Notable Dietary > Key Experience
    const priorityKeys = [
      'wheelchair',
      'step-free',
      'halal-certified',
      'halal-options',
      'vegetarian',
      'family',
      'english',
      'cashless'
    ]

    const sortedDefault = matchedBadges.sort((a, b) => {
      const idxA = priorityKeys.indexOf(a.key)
      const idxB = priorityKeys.indexOf(b.key)
      const weightA = idxA !== -1 ? idxA : 99
      const weightB = idxB !== -1 ? idxB : 99
      return weightA - weightB
    })

    return sortedDefault.slice(0, 3)
  }

  // Preference-specific review signal
  const getPlaceReviewSignal = (place: any) => {
    const loc = localize(place)
    const reviewSignals = loc.preferenceReviewSignals || {}
    const activePrefs = userPreferences.value

    // If user filtered for dietary/halal:
    if (activePrefs.dietary.some(k => k.includes('halal') || k.includes('pork') || k.includes('veg'))) {
      if (reviewSignals.dietary) {
        return { icon: '🕌', text: reviewSignals.dietary, type: 'dietary' }
      }
    }

    // If user filtered for accessibility:
    if (activePrefs.accessibility.length > 0) {
      if (reviewSignals.accessibility) {
        return { icon: '♿', text: reviewSignals.accessibility, type: 'accessibility' }
      }
    }

    // If user filtered for family/kids:
    if (activePrefs.experience.some(k => k === 'family' || k === 'kids')) {
      if (reviewSignals.families) {
        return { icon: '👨‍👩‍👧', text: reviewSignals.families, type: 'families' }
      }
    }

    // Default to first available signal if present
    if (reviewSignals.accessibility) {
      return { icon: '♿', text: reviewSignals.accessibility, type: 'accessibility' }
    }
    if (reviewSignals.families) {
      return { icon: '👨‍👩‍👧', text: reviewSignals.families, type: 'families' }
    }
    if (reviewSignals.dietary) {
      return { icon: '🥗', text: reviewSignals.dietary, type: 'dietary' }
    }

    return null
  }

  // Trip / Itinerary actions
  const persistTrip = () => {
    if (import.meta.client) {
      localStorage.setItem('beppu_itinerary', JSON.stringify(itinerary.value))
    }
  }

  const isInTrip = (placeId: string): boolean => {
    return itinerary.value.some(item => item.placeId === placeId)
  }

  const addToTrip = (place: any, time = '02:00 PM', day = 'Day 2 · Sunday') => {
    const loc = localize(place)
    const placeId = place.id || place
    if (isInTrip(placeId)) {
      showToast(`${loc.name || 'Place'} is already in your trip!`, 'info')
      return false
    }

    const newItem = {
      id: 'custom-' + Date.now(),
      placeId: placeId,
      time: time,
      cost: loc.price || 'Free',
      assignedGuideId: place.suggestedGuides?.[0] || null,
      status: 'planned',
      locales: {
        en: {
          day: day,
          title: place.locales?.en?.name || loc.name,
          notes: `Added from Explore (${loc.categoryLabel || 'Attraction'})`,
          duration: place.locales?.en?.duration || '1.5 hours',
          guideRole: null
        },
        ja: {
          day: day === 'Day 2 · Sunday' ? '2日目 · 日曜日' : '1日目 · 土曜日',
          title: place.locales?.ja?.name || loc.name,
          notes: `探索ページから追加（${place.locales?.ja?.categoryLabel || '観光スポット'}）`,
          duration: place.locales?.ja?.duration || '1.5時間',
          guideRole: null
        },
        ko: {
          day: day === 'Day 2 · Sunday' ? '2일차 · 일요일' : '1일차 · 토요일',
          title: place.locales?.ko?.name || loc.name,
          notes: `탐색에서 추가됨 (${place.locales?.ko?.categoryLabel || '명소'})`,
          duration: place.locales?.ko?.duration || '1.5시간',
          guideRole: null
        },
        zh: {
          day: day === 'Day 2 · Sunday' ? '第二天 · 周日' : '第一天 · 周六',
          title: place.locales?.zh?.name || loc.name,
          notes: `自探索页面加入（${place.locales?.zh?.categoryLabel || '推荐景点'}）`,
          duration: place.locales?.zh?.duration || '1.5小时',
          guideRole: null
        },
        yue: {
          day: day === 'Day 2 · Sunday' ? '第二天 · 星期日' : '第一天 · 星期六',
          title: place.locales?.yue?.name || loc.name,
          notes: `由探索清單加入（${place.locales?.yue?.categoryLabel || '推薦景點'}）`,
          duration: place.locales?.yue?.duration || '1.5小時',
          guideRole: null
        }
      }
    }

    itinerary.value.push(newItem)
    persistTrip()
    showToast(`✓ "${loc.name}" ${t('added_to_trip') || 'added to your trip!'}`, 'success')
    return true
  }

  const removeFromTrip = (stopId: string, placeName?: string) => {
    itinerary.value = itinerary.value.filter(item => item.id !== stopId && item.placeId !== stopId)
    persistTrip()
    showToast(`Removed ${placeName ? '"' + placeName + '"' : 'stop'} from trip.`, 'info')
  }

  const toggleTripPlace = (place: any) => {
    const loc = localize(place)
    const placeId = place.id
    if (isInTrip(placeId)) {
      removeFromTrip(placeId, loc.name)
    } else {
      addToTrip(place)
    }
  }

  const updateStopTime = (stopId: string, newTime: string) => {
    const item = itinerary.value.find(i => i.id === stopId)
    if (item) {
      item.time = newTime
      persistTrip()
      showToast(`Time updated to ${newTime}`, 'success')
    }
  }

  const resetItinerary = () => {
    itinerary.value = [...defaultItineraryData]
    persistTrip()
    showToast('Sample itinerary has been reset!', 'info')
  }

  const clearItinerary = () => {
    itinerary.value = []
    persistTrip()
    showToast('Your trip itinerary has been cleared.', 'info')
  }

  // Wishlist / Saved places
  const persistSaved = () => {
    if (import.meta.client) {
      localStorage.setItem('beppu_saved_places', JSON.stringify(savedPlaces.value))
    }
  }

  const isSaved = (placeId: string): boolean => {
    return savedPlaces.value.includes(placeId)
  }

  const toggleSave = (placeId: string, name?: string) => {
    if (isSaved(placeId)) {
      savedPlaces.value = savedPlaces.value.filter(id => id !== placeId)
      persistSaved()
      showToast(`Removed ${name ? '"' + name + '"' : ''} from saved places`, 'info')
    } else {
      savedPlaces.value.push(placeId)
      persistSaved()
      showToast(`Saved ${name ? '"' + name + '"' : ''} to wishlist!`, 'success')
    }
  }

  // Reviews
  const addGuideReview = (guideId: string, review: { author: string; rating: number; text: string; date?: string }) => {
    const current = customGuideReviews.value[guideId] || []
    current.unshift({
      ...review,
      date: review.date || 'Just now'
    })
    customGuideReviews.value[guideId] = current
    if (import.meta.client) {
      localStorage.setItem('beppu_custom_reviews', JSON.stringify(customGuideReviews.value))
    }
    showToast('Thank you! Your review has been published.', 'success')
  }

  const getGuideReviews = (guide: any) => {
    const loc = localize(guide)
    const defaultList = loc.reviews || []
    const customList = customGuideReviews.value[guide.id] || []
    return [...customList, ...defaultList]
  }

  // Bookings
  const createBooking = (bookingData: any) => {
    const id = 'req-' + Date.now()
    const newBooking = {
      id,
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...bookingData
    }
    bookings.value.push(newBooking)
    if (import.meta.client) {
      localStorage.setItem('beppu_bookings', JSON.stringify(bookings.value))
    }
    showToast(`Request sent to ${bookingData.guideName || 'guide'}! You will receive confirmation soon.`, 'success')
    return newBooking
  }

  // Getters
  const categories = computed(() => categoriesData.map(c => localize(c)))
  const places = computed(() => placesData.map(p => localize(p)))
  const experiences = computed(() => experiencesData.map(e => localize(e)))
  const guides = computed(() => guidesData.map(g => ({
    ...localize(g),
    raw: g
  })))

  const getPlaceById = (id: string) => {
    const raw = placesData.find(p => p.id === id)
    return raw ? { ...localize(raw), raw } : null
  }

  const getGuideById = (id: string) => {
    const raw = guidesData.find(g => g.id === id)
    return raw ? { ...localize(raw), raw } : null
  }

  const getExperienceById = (id: string) => {
    const raw = experiencesData.find(e => e.id === id)
    return raw ? { ...localize(raw), raw } : null
  }

  return {
    currentLocale,
    initClientState,
    t,
    localize,
    setLocale,
    categories,
    places,
    experiences,
    guides,
    placesData,
    experiencesData,
    guidesData,
    getPlaceById,
    getGuideById,
    getExperienceById,
    // Itinerary
    itinerary,
    isInTrip,
    addToTrip,
    removeFromTrip,
    toggleTripPlace,
    updateStopTime,
    resetItinerary,
    clearItinerary,
    // Wishlist
    savedPlaces,
    isSaved,
    toggleSave,
    // Preferences & Filter Personalization
    userPreferences,
    togglePreference,
    hasPreference,
    clearPreferences,
    activePreferencesCount,
    hasAnyActivePreferences,
    placeMatchesAttribute,
    placeMatchesPreferences,
    getPlaceBadges,
    getPlaceReviewSignal,
    // Reviews
    addGuideReview,
    getGuideReviews,
    // Bookings
    bookings,
    createBooking,
    // Toasts
    toasts,
    showToast,
    removeToast
  }
}
