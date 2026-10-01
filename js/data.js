// Beppu Tourism + Local Guide Marketplace - Realistic Mock Data
// Carefully curated for authentic Beppu, Japan experiences, APU student guides, and first-time travelers.

const BEPPU_DATA = {
  categories: [
    { id: 'onsen', name: 'Onsen & Spas', icon: '♨️', count: 18, desc: 'World-famous hot spring baths and healing waters' },
    { id: 'nature', name: 'Nature & Views', icon: '🌋', count: 12, desc: 'Mount Tsurumi, scenic bays, and volcanic craters' },
    { id: 'food', name: 'Food & Dining', icon: '🍜', count: 24, desc: 'Jigokumushi steam cooking, Toriten, and local sake' },
    { id: 'local', name: 'Local Beppu', icon: '🏘️', count: 15, desc: 'Hidden alleys, retro kissaten, and neighborhood footbaths' },
    { id: 'culture', name: 'Culture & History', icon: '🎎', count: 9, desc: 'Meiji bathhouses, bamboo craft, and temple shrines' },
    { id: 'nightlife', name: 'Nightlife', icon: '🌙', count: 11, desc: 'Lantern-lit izakayas, craft beer, and lively snack bars' },
    { id: 'photo', name: 'Photography', icon: '📸', count: 14, desc: 'Steam billowing across town, sea sunsets, and vintage neon' },
    { id: 'student', name: 'Student Life', icon: '🎓', count: 8, desc: 'APU international community favorites and budget gems' },
  ],

  places: [
    {
      id: 'beppu-hell-tour',
      name: 'Beppu Jigoku (Seven Hells) Tour',
      japaneseName: '別府地獄めぐり',
      shortDesc: "Spectacular geothermal wonders including sea-blue hot pools, red mud springs, and geysers.",
      fullDesc: "The 'Hells' (Jigoku) are seven dramatic geothermal hot springs strictly meant for viewing rather than bathing. From the cobalt-blue boiling waters of Umi Jigoku (Sea Hell) surrounded by Japanese gardens, to the iron-rich crimson waters of Chinoike Jigoku (Blood Pond Hell), this is Beppu's most celebrated geological spectacle. Natural steam vents cook onsen eggs and puddings on-site.",
      category: 'nature',
      categoryLabel: 'Geothermal Wonder',
      location: 'Kannawa & Shibaseki Districts, Beppu',
      distance: '20 min by bus from Beppu Station',
      duration: '2.5 – 3 hours',
      price: '¥2,200 (All-hells pass)',
      priceLevel: '¥¥',
      rating: 4.8,
      reviewsCount: 342,
      isPopular: true,
      isLocalFavorite: false,
      tags: ['Must-Visit', 'Geothermal', 'Family Friendly', 'Iconic', 'No Car Needed'],
      image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80'
      ],
      openingHours: '8:30 AM – 5:00 PM (Daily)',
      tips: 'Buy the combined 7-hell ticket if you plan to visit 3 or more. Wear comfortable walking shoes. Kamenoi Bus #5 or #7 takes you directly from Beppu Station West Exit.',
      nearbyPlaces: ['kannawa-steam-district', 'hyotan-onsen'],
      suggestedGuides: ['maria-santos', 'kenji-takahashi']
    },
    {
      id: 'takegawara-onsen',
      name: 'Takegawara Onsen',
      japaneseName: '竹瓦温泉',
      shortDesc: "Historic 1879 wooden bathhouse famous for rejuvenating volcanic warm sand baths.",
      fullDesc: "Established in 1879 and rebuilt in 1938 with an imposing Karahafu-style wooden gable roof, Takegawara is the soul of downtown Beppu onsen culture. Inside, you can choose between the classic deep communal hot bath (at a traditional ¥300 fee) or the legendary Sunayu (warm sand bath), where attendants gently bury you under naturally heated volcanic sand in a yukata robe for 15 blissful minutes.",
      category: 'onsen',
      categoryLabel: 'Historic Onsen',
      location: '1-4-1 Motomachi, Central Beppu',
      distance: '8 min walk from Beppu Station East Exit',
      duration: '1 – 1.5 hours',
      price: '¥300 (Normal bath) / ¥1,500 (Sand bath)',
      priceLevel: '¥',
      rating: 4.7,
      reviewsCount: 289,
      isPopular: true,
      isLocalFavorite: true,
      tags: ['Sand Bath', 'Historic 1879', 'Traditional', 'Tattoo Friendly (Ask)', 'Walk from Station'],
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=800&q=80'
      ],
      openingHours: '6:30 AM – 10:30 PM (Sand bath opens 8:00 AM)',
      tips: 'Sand bath capacity is limited to 8 persons per session. Arrive before 10 AM or after 5 PM to avoid tour queues. Towel rental is available for ¥200.',
      nearbyPlaces: ['beppu-tower-station', 'jukkokubashi-alley'],
      suggestedGuides: ['maria-santos', 'daiki-sato']
    },
    {
      id: 'kannawa-steam-district',
      name: 'Kannawa Steam Village & Cooking',
      japaneseName: '鉄輪温泉 & 地獄蒸し工房',
      shortDesc: "Steam billows from street gutters and rooftops in Beppu's most atmospheric traditional hot spring quarter.",
      fullDesc: "Kannawa is the atmospheric heart of Beppu's hot spring history. Steam hisses constantly from rock crevices, chimney stacks, and drain covers. At the Jigokumushi Kobo (Hell Steam Workshop), visitors rent natural geothermal steam cooking kilns (釜) and steam local vegetables, seasonal seafood, pork buns, and eggs using pure volcanic steam with zero electricity.",
      category: 'food',
      categoryLabel: 'Steam Village & Dining',
      location: 'Kannawa District, North-West Beppu',
      distance: '20 min bus from Beppu Station',
      duration: '2 – 3 hours',
      price: 'Free to stroll · Steam kiln rental ¥550 + food basket',
      priceLevel: '¥¥',
      rating: 4.9,
      reviewsCount: 412,
      isPopular: true,
      isLocalFavorite: true,
      tags: ['Local Culture', 'Interactive Food', 'Atmospheric', 'Photogenic', 'Free Footbaths'],
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
      ],
      openingHours: 'Workshop: 9:00 AM – 8:00 PM (Last steam 7:00 PM, closed 3rd Tuesday)',
      tips: 'Try the foot steam chambers (ashimushi) right outside the workshop while your pumpkin and dumplings are steaming!',
      nearbyPlaces: ['beppu-hell-tour', 'hyotan-onsen'],
      suggestedGuides: ['kenji-takahashi', 'maria-santos', 'carlos-mendez']
    },
    {
      id: 'beppu-ropeway',
      name: 'Beppu Ropeway & Mt. Tsurumi',
      japaneseName: '別府ロープウェイ・鶴見岳',
      shortDesc: "Soar 1,375 meters up Mount Tsurumi for 360-degree vistas across Beppu Bay and the steaming valley.",
      fullDesc: "West Japan's largest aerial cable car whisks 101 passengers up the flank of Mount Tsurumi in just 10 minutes. At the summit, well-maintained wooded walking trails link seven shrines dedicated to the Seven Lucky Gods. On clear days, the panorama stretches past Beppu Bay to the Kuju Mountain Range and Shikoku Island across the Seto Inland Sea.",
      category: 'nature',
      categoryLabel: 'Mountain & Panoramic View',
      location: 'Kankaiji / Minami-Tateishi, Beppu',
      distance: '25 min by Kamenoi Bus #36 from Beppu Station',
      duration: '2 – 2.5 hours',
      price: '¥1,800 roundtrip (Adult)',
      priceLevel: '¥¥',
      rating: 4.7,
      reviewsCount: 195,
      isPopular: true,
      isLocalFavorite: false,
      tags: ['Panoramic Views', 'Alpine Air', 'Fall Foliage / Rime Ice', 'Nature Trails'],
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
      ],
      openingHours: '9:00 AM – 5:00 PM (Summer until 5:30 PM)',
      tips: 'Temperatures atop Mount Tsurumi can be 8–10°C colder than the coastline. Pack a light windbreaker even during spring and summer.',
      nearbyPlaces: ['myoban-yu-no-hana'],
      suggestedGuides: ['carlos-mendez', 'kenji-takahashi']
    },
    {
      id: 'hyotan-onsen',
      name: 'Hyotan Onsen',
      japaneseName: 'ひょうたん温泉',
      shortDesc: "Michelin Green Guide 3-star rated bath park with waterfall cascades, steam caves, and sand baths.",
      fullDesc: "Hyotan is widely celebrated as the world's only hot spring bath facility awarded three stars by the Michelin Green Guide Japan. It features lush outdoor rock pools, cedar indoor baths, a subterranean stone steam bath, 19 private family onsen, and dramatic 'Taki-yu' waterfall jets that massage tired shoulder muscles with pure spring water cooled via natural bamboo lattice towers.",
      category: 'onsen',
      categoryLabel: 'Day Onsen Resort',
      location: '159-2 Kannawa, Beppu',
      distance: '20 min bus from Beppu Station',
      duration: '2 hours',
      price: '¥940 (General admission)',
      priceLevel: '¥',
      rating: 4.9,
      reviewsCount: 520,
      isPopular: true,
      isLocalFavorite: true,
      tags: ['Michelin 3-Star', 'Outdoor Baths', 'Waterfall Massage', 'English Signage', 'Tattoo Friendly'],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80'
      ],
      openingHours: '9:00 AM – 1:00 AM (Midnight, open all year)',
      tips: 'One of the rare high-end onsens in Japan welcoming discreet tattoos without special tape. English instructions are clearly posted throughout.',
      nearbyPlaces: ['kannawa-steam-district', 'beppu-hell-tour'],
      suggestedGuides: ['daiki-sato', 'maria-santos']
    },
    {
      id: 'beppu-tower-station',
      name: 'Beppu Station Plaza & Aburaya Kumahachi',
      japaneseName: '別府駅前 & 油屋熊八像',
      shortDesc: "The welcoming gateway with a free hand-bath (te-yu), bronze tourism founder statue, and retro street culture.",
      fullDesc: "Beppu Station is where your journey begins. Just outside the east exit sits the quirky bronze statue of Aburaya Kumahachi (the visionary pioneer who turned Beppu into Japan's hot spring capital) with his flowing cape. Right beside him is a warm, steaming wooden hand bath (Te-yu) open 24/7 for travelers to warm their fingers straight off the train.",
      category: 'local',
      categoryLabel: 'Station Hub & Plaza',
      location: 'Ekimae-cho, Beppu Station Plaza',
      distance: '0 min (Center of transport)',
      duration: '30 – 45 min',
      price: 'Free',
      priceLevel: 'Free',
      rating: 4.5,
      reviewsCount: 168,
      isPopular: true,
      isLocalFavorite: true,
      tags: ['Gateway', 'Free Handbath', 'Transit Hub', 'Tourist Info', 'Luggage Lockers'],
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
      ],
      openingHours: 'Open 24 hours (Tourist Desk 8:30 AM – 6:00 PM)',
      tips: 'Head to the foreigner-friendly Information Desk inside the station to purchase the 1-Day or 2-Day Kamenoi Bus Pass (My Beppu Pass) for big savings.',
      nearbyPlaces: ['takegawara-onsen', 'jukkokubashi-alley'],
      suggestedGuides: ['maria-santos', 'yuna-kim']
    },
    {
      id: 'myoban-yu-no-hana',
      name: 'Myoban Yunohanagoya Thatched Huts',
      japaneseName: '明礬 湯の里 湯の花小屋',
      shortDesc: "Centuries-old straw huts harvesting natural mineral hot spring crystals high in the mountain mist.",
      fullDesc: "Perched high in the misty mountain foothills of Myoban Onsen, triangular straw-thatched huts have been manufacturing 'Yunohana' (flower of hot spring crystals) using an intangible folk cultural property technique dating back to the Edo period. The acidic sulfur waters here create a milky-blue outdoor pool with panoramic views of the Myoban Arch Bridge.",
      category: 'culture',
      categoryLabel: 'Heritage & Mountain Spa',
      location: 'Myoban Onsen, Beppu',
      distance: '30 min bus from Beppu Station',
      duration: '1.5 – 2 hours',
      price: '¥600 (Bath) · Free to view huts',
      priceLevel: '¥',
      rating: 4.8,
      reviewsCount: 221,
      isPopular: false,
      isLocalFavorite: true,
      tags: ['Intangible Heritage', 'Milky Sulfur Water', 'Mountain Views', 'Hidden Gem', 'Edo History'],
      image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=800&q=80'
      ],
      openingHours: '10:00 AM – 8:00 PM',
      tips: 'Do not wear silver jewelry into the sulfur water as it will immediately tarnish. Try the onsen-steamed custard pudding at the tea shop!',
      nearbyPlaces: ['beppu-ropeway'],
      suggestedGuides: ['daiki-sato', 'kenji-takahashi']
    },
    {
      id: 'jukkokubashi-alley',
      name: 'Retro Alley Dining & Toriten (Jukkokubashi)',
      japaneseName: '十文字小路 & 元祖とり天街',
      shortDesc: "Lantern-lit narrow pedestrian alleys brimming with local izakayas, Oita craft sake, and crispy Toriten chicken.",
      fullDesc: "Tucked behind Beppu Station is a labyrinth of Showa-era alleyways illuminated by warm red paper lanterns. This is where locals and university students gather after work for Toriten (Oita's signature crispy tempura chicken dipped in mustard and spicy kabosu ponzu), Beppu Reimen (chewy handmade cold noodles with kimchi and beef broth), and cold beer.",
      category: 'food',
      categoryLabel: 'Local Dining & Nightlife',
      location: 'Kitahama & Ekimae-cho, Beppu',
      distance: '5 min walk from Beppu Station',
      duration: '2 hours',
      price: '¥1,500 – ¥3,000 per person',
      priceLevel: '¥¥',
      rating: 4.9,
      reviewsCount: 310,
      isPopular: false,
      isLocalFavorite: true,
      tags: ['Toriten Tempura', 'Showa Vibe', 'Craft Sake', 'Late Night', 'Friendly Masters'],
      image: 'https://images.unsplash.com/photo-1554672408-730436b60ede?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1554672408-730436b60ede?auto=format&fit=crop&w=800&q=80'
      ],
      openingHours: '5:30 PM – Midnight (Varies by izakaya)',
      tips: 'Many mom-and-pop shops have handwritten Japanese menus, so joining an APU student or bilingual local guide here makes it effortless to order hidden specials.',
      nearbyPlaces: ['takegawara-onsen', 'beppu-tower-station'],
      suggestedGuides: ['maria-santos', 'yuna-kim']
    }
  ],

  experiences: [
    {
      id: 'exp-hidden-ramen',
      title: "A Local's Favorite Ramen & Alley Crawl",
      subtitle: "Discover Beppu's best-kept noodle secret and cozy izakayas that don't show up on TripAdvisor.",
      category: 'food',
      categoryBadge: 'Hidden Spots',
      creatorId: 'maria-santos',
      duration: '2 hours',
      price: '¥2,500',
      pricePer: 'per person',
      rating: 4.95,
      reviewsCount: 38,
      languages: ['English', 'Japanese', 'Filipino'],
      badge: 'Bestseller',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Taste authentic Beppu Reimen (cold noodle) & Toriten chicken',
        'Visit 2 cozy family-run izakayas with cozy retro atmospheres',
        'Learn essential Japanese dining phrases & table customs',
        'Vegetarian options available upon advance request'
      ],
      description: "Skip tourist traps! Let Maria take you through the secret back alleys of Kitahama where APU students and longtime residents wind down. We'll taste freshly fried toriten, learn why Beppu cold noodles have a distinctive chewy buckwheat texture inspired by Manchurian recipes, and meet master chefs who love chatting with international travelers."
    },
    {
      id: 'exp-onsen-first-timer',
      title: "First-Timer's Guide to Onsen Etiquette & Sand Bath",
      subtitle: "Never used a Japanese bathhouse? Walk into Takegawara with 100% confidence and zero stress.",
      category: 'onsen',
      categoryBadge: 'Micro-Guide',
      creatorId: 'daiki-sato',
      duration: '1.5 hours',
      price: '¥2,000',
      pricePer: 'per person',
      rating: 5.0,
      reviewsCount: 46,
      languages: ['English', 'Japanese'],
      badge: 'Beginner Friendly',
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Step-by-step guidance on changing, washing rituals, and towel etiquette',
        'Experience the historic Takegawara warm volcanic sand bath',
        'Understand mineral profiles (sulfur, iron, bicarbonate) for wellness',
        'Includes complimentary tenugui bath towel and cold post-bath cider'
      ],
      description: "Public hot springs can feel intimidating for foreign visitors: Which towel do I bring? Where do I wash? What about tattoos? Certified Hot Spring Sommelier Daiki will demystify the entire ritual outside the historic 1879 Takegawara Onsen, accompany you into the sand bath facility, and ensure you feel relaxed and completely welcomed."
    },
    {
      id: 'exp-kannawa-steam',
      title: "Jigokumushi: Steam Your Own Lunch in Volcanic Vents",
      subtitle: "Select fresh Oita seafood and mountain veggies, then harness natural steam kilns in Kannawa.",
      category: 'food',
      categoryBadge: 'Hands-on Workshop',
      creatorId: 'kenji-takahashi',
      duration: '2.5 hours',
      price: '¥3,200',
      pricePer: 'per person',
      rating: 4.88,
      reviewsCount: 29,
      languages: ['English', 'Japanese'],
      badge: 'Interactive',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Shop at Kannawa local produce stall for heirloom vegetables & fresh eggs',
        'Learn the ancient technique of timing geothermal steam cooking',
        'Enjoy a feast naturally seasoned with gentle hot spring salt minerals',
        'Stroll the scenic steam alleys and discover hidden free footbaths'
      ],
      description: "Geothermal steam cooking (Jigokumushi) has been practiced in Kannawa since the Edo period. The mineral steam seals in moisture and natural sweet flavors without any added cooking oil. Longtime local Kenji shows you how to choose the best seasonal produce, operate the heavy stone kiln lids safely, and enjoy a memorable feast together."
    },
    {
      id: 'exp-station-welcome',
      title: "Meet Me at Beppu Station: Transit & Itinerary Kickoff",
      subtitle: "Get oriented in 45 minutes: Kamenoi bus passes, ticket tips, luggage drop, and neighborhood shortcuts.",
      category: 'local',
      categoryBadge: 'Micro-Guide',
      creatorId: 'maria-santos',
      duration: '45 min',
      price: '¥1,200',
      pricePer: 'group (up to 4)',
      rating: 4.96,
      reviewsCount: 52,
      languages: ['English', 'Japanese', 'Filipino'],
      badge: 'Micro-Guide · 45m',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'In-person greeting at Beppu Station train platform or lobby',
        'Help purchasing and setting up the ideal Kamenoi bus pass',
        'Custom 2-day walking route map tailored to your hotel location',
        'Answers to any transit, dietary, or onsen questions right away'
      ],
      description: "Just stepped off the Sonic express train with luggage and feeling overwhelmed by bus numbers? Let an APU student meet you right at the ticket gates! We will sort out your transit pass, stow your bags in the best lockers, point out the best nearby lunch, and give you clear confidence for your stay."
    },
    {
      id: 'exp-night-walk',
      title: "Beppu Twilight & Retro Lantern Walk",
      subtitle: "A stroll through atmospheric wooden bathhouses, glowing neon retro signs, and tranquil seaside piers.",
      category: 'nightlife',
      categoryBadge: 'Nightlife',
      creatorId: 'yuna-kim',
      duration: '2 hours',
      price: '¥2,200',
      pricePer: 'per person',
      rating: 4.92,
      reviewsCount: 33,
      languages: ['English', 'Korean', 'Japanese'],
      badge: 'Evening Walk',
      image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Magical dusk photography spots along Kitahama coastline',
        'Wander through lantern-draped Showa-era wooden arcades',
        'Stop at an artisanal retro kissaten for hot matcha and sweets',
        'Hear untold folklore of Beppu’s golden era in the 1950s'
      ],
      description: "When the sun dips behind Mount Tsurumi, Beppu shifts into a mesmerizing cinematic mood. Steam glows against twilight street lamps, and tavern signs flicker to life. Yuna guides you through quiet coastal parks and backstreets for photos, stories, and warm conversations."
    },
    {
      id: 'exp-apu-secrets',
      title: "APU Student's Secret Cafes & Mountain Views",
      subtitle: "Experience Beppu through the eyes of the multicultural university community on the mountain ridge.",
      category: 'student',
      categoryBadge: 'Student Life',
      creatorId: 'carlos-mendez',
      duration: '3 hours',
      price: '¥2,800',
      pricePer: 'per person',
      rating: 4.9,
      reviewsCount: 21,
      languages: ['English', 'Spanish', 'Japanese'],
      badge: 'APU Special',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Panoramic ridge lookout over Beppu Bay and the Pacific horizon',
        'Visit student-favorite indie coffee roasters and bakery',
        'Learn about APU’s 100+ nationality campus culture in Oita',
        'Discover hidden footbaths surrounded by mountain bamboo'
      ],
      description: "Ritsumeikan Asia Pacific University (APU) brings thousands of students from over 100 countries to Beppu. Carlos shares the hidden hilltop viewpoints, peaceful study sanctuaries, and fusion eateries that make Beppu one of the most uniquely international small towns in Japan."
    }
  ],

  guides: [
    {
      id: 'maria-santos',
      name: 'Maria Santos',
      guideType: 'APU Student',
      nationality: 'Philippines',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      languages: [
        { name: 'English', flag: '🇬🇧', level: 'Native / Fluent' },
        { name: 'Japanese', flag: '🇯🇵', level: 'Conversational (JLPT N2)' },
        { name: 'Filipino', flag: '🇵🇭', level: 'Native' }
      ],
      languagesShort: '🇬🇧 English · 🇯🇵 Japanese · 🇵🇭 Filipino',
      bio: "Hi! I'm a 3rd-year International Management student at APU. I fell in love with Beppu's backstreets, cozy ramen counters, and quiet coastal spots. I love showing visitors the small restaurants and neighborhood onsens that I discovered after moving here. Traveling without a car? Don't worry, I know every bus shortcut by heart!",
      quote: "I love showing visitors the small restaurants and onsens around Beppu that I discovered after moving here.",
      interests: ['Food & Izakaya', 'Onsen', 'Local Life', 'Nightlife', 'Student Budgeting'],
      rateHourly: '¥1,500',
      startingPrice: 'From ¥2,500 / 2 hours',
      priceValue: 2500,
      rating: 4.94,
      reviewsCount: 23,
      experiencesCount: 38,
      responseRate: '100%',
      responseTime: 'Within 1 hour',
      availability: 'Available This Weekend & Weekdays after 3 PM',
      availabilityFilter: 'weekend',
      verified: true,
      badges: ['Identity Verified', 'APU Student', 'Guide Orientation Completed', 'Top Rated'],
      experiencesOffered: ['exp-hidden-ramen', 'exp-station-welcome'],
      reviews: [
        {
          author: 'Sarah & Liam (UK)',
          date: 'September 2026',
          rating: 5,
          text: 'Maria was an absolute lifesaver! We arrived at Beppu Station completely confused by the bus system with two heavy suitcases. She met us with a big smile, helped us get the Kamenoi pass, and took us to a fantastic Toriten chicken shop we never would have found ourselves. 10/10 recommended!'
        },
        {
          author: 'Marcus C. (Australia)',
          date: 'August 2026',
          rating: 5,
          text: 'The evening alley walk with Maria felt like hanging out with a good friend who knows all the coolest spots in town. She translated menus, showed us how to order custom skewers, and taught us so much about life at APU.'
        }
      ]
    },
    {
      id: 'kenji-takahashi',
      name: 'Kenji Takahashi',
      guideType: 'Local Resident',
      nationality: 'Japan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      languages: [
        { name: 'Japanese', flag: '🇯🇵', level: 'Native' },
        { name: 'English', flag: '🇬🇧', level: 'Fluent (Lived in Vancouver)' }
      ],
      languagesShort: '🇯🇵 Japanese · 🇬🇧 English',
      bio: "Born and raised in Beppu. After studying architecture in Vancouver for 4 years, I returned home with a profound appreciation for Beppu's Meiji-era bathhouses and wooden heritage. I specialize in Kannawa geothermal cooking workshops, architectural history walks, and peaceful scenic cycling.",
      quote: "Beppu's steam has warmed generations of bathers. Let me introduce you to the craftspeople and shop owners who keep its spirit alive.",
      interests: ['Architecture', 'Kannawa Steam', 'Culture & History', 'Local Heritage', 'Nature'],
      rateHourly: '¥1,800',
      startingPrice: 'From ¥3,500 / 2 hours',
      priceValue: 3500,
      rating: 4.96,
      reviewsCount: 42,
      experiencesCount: 65,
      responseRate: '98%',
      responseTime: 'Within 2 hours',
      availability: 'Available Today & Tomorrow',
      availabilityFilter: 'today',
      verified: true,
      badges: ['Identity Verified', 'Local Resident', 'Partner Guide', 'Heritage Specialist'],
      experiencesOffered: ['exp-kannawa-steam'],
      reviews: [
        {
          author: 'Elena & David (Canada)',
          date: 'September 2026',
          rating: 5,
          text: 'Kenji made Kannawa come alive for us. The geothermal steam cooking workshop was the highlight of our 2-week trip in Japan. His English is flawless, and his knowledge of the hot spring plumbing and Meiji woodwork was fascinating.'
        }
      ]
    },
    {
      id: 'yuna-kim',
      name: 'Yuna Kim',
      guideType: 'International Resident',
      nationality: 'South Korea',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      languages: [
        { name: 'Korean', flag: '🇰🇷', level: 'Native' },
        { name: 'English', flag: '🇬🇧', level: 'Fluent' },
        { name: 'Japanese', flag: '🇯🇵', level: 'Fluent' }
      ],
      languagesShort: '🇰🇷 Korean · 🇬🇧 English · 🇯🇵 Japanese',
      bio: "APU alumna turned boutique cafe creator and lifestyle photographer in Beppu. Having lived in Beppu for over six years, I know every aesthetic corner, golden-hour photo viewpoint over Beppu Bay, and quiet artisanal kissaten in town.",
      quote: "I want visitors to experience Beppu beyond the places they see on Google — through light, coffee, and quiet moments.",
      interests: ['Photography', 'Hidden Cafes', 'Night Walks', 'Aesthetic Spots', 'Art & Ceramics'],
      rateHourly: '¥1,600',
      startingPrice: 'From ¥2,800 / 2 hours',
      priceValue: 2800,
      rating: 4.91,
      reviewsCount: 31,
      experiencesCount: 49,
      responseRate: '100%',
      responseTime: 'Within 30 mins',
      availability: 'Available Tomorrow & This Weekend',
      availabilityFilter: 'tomorrow',
      verified: true,
      badges: ['Identity Verified', 'APU Alumna', 'Guide Orientation Completed', 'Photo Specialist'],
      experiencesOffered: ['exp-night-walk'],
      reviews: [
        {
          author: 'Chloe T. (Singapore)',
          date: 'August 2026',
          rating: 5,
          text: 'Yuna took the most stunning photos of us during our dusk walk in Kitahama! She is so kind, speaks fantastic English, and showed us a tucked-away 1960s coffee shop with the best homemade cheesecake.'
        }
      ]
    },
    {
      id: 'daiki-sato',
      name: 'Daiki Sato',
      guideType: 'Local Resident',
      nationality: 'Japan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      languages: [
        { name: 'Japanese', flag: '🇯🇵', level: 'Native' },
        { name: 'English', flag: '🇬🇧', level: 'Conversational' }
      ],
      languagesShort: '🇯🇵 Japanese · 🇬🇧 English',
      bio: "Certified Hot Spring Sommelier (温泉ソムリエ) and lifelong Beppu dweller. With over 2,000 hot spring sources in our city, every bath has its own pH, minerals, and healing personality. I help visitors navigate etiquette with ease, overcome hesitation, and discover the exact bath suited to their body.",
      quote: "There is an onsen for everyone. I help first-time travelers step into the warm waters with peace of mind.",
      interests: ['Onsen Wellness', 'Hot Spring Science', 'Sand Baths', 'Local History'],
      rateHourly: '¥2,000',
      startingPrice: 'From ¥2,000 / 1.5 hours',
      priceValue: 2000,
      rating: 5.0,
      reviewsCount: 35,
      experiencesCount: 55,
      responseRate: '95%',
      responseTime: 'Within 3 hours',
      availability: 'Available Today & This Weekend',
      availabilityFilter: 'today',
      verified: true,
      badges: ['Certified Onsen Sommelier', 'Identity Verified', 'Local Resident', '5.0 Star Guide'],
      experiencesOffered: ['exp-onsen-first-timer'],
      reviews: [
        {
          author: 'Paul & Jenna (USA)',
          date: 'September 2026',
          rating: 5,
          text: 'We were nervous about onsen etiquette as Americans with small tattoos. Daiki met us outside Takegawara, explained everything patiently, and made the whole sand bath experience deeply relaxing and respectful. We could not have done it without him!'
        }
      ]
    },
    {
      id: 'carlos-mendez',
      name: 'Carlos Mendez',
      guideType: 'APU Student',
      nationality: 'Mexico',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
      languages: [
        { name: 'Spanish', flag: '🇲🇽', level: 'Native' },
        { name: 'English', flag: '🇬🇧', level: 'Fluent' },
        { name: 'Japanese', flag: '🇯🇵', level: 'Conversational (JLPT N3)' }
      ],
      languagesShort: '🇲🇽 Spanish · 🇬🇧 English · 🇯🇵 Japanese',
      bio: "Graduate student at APU studying Sustainable Tourism. Passionate trail runner, nature lover, and bus route strategist. I love guiding fellow nature fans up Mount Tsurumi, around the cedar forests, and to hilltop viewpoints overlooking the steaming town and Beppu Bay.",
      quote: "Beppu is where lush volcanic mountains touch the blue ocean. Let's explore its scenic nature together.",
      interests: ['Nature & Hiking', 'Mount Tsurumi', 'Student Life', 'Scenic Viewpoints', 'Cycling'],
      rateHourly: '¥1,500',
      startingPrice: 'From ¥2,800 / 2.5 hours',
      priceValue: 2800,
      rating: 4.89,
      reviewsCount: 19,
      experiencesCount: 31,
      responseRate: '100%',
      responseTime: 'Within 1 hour',
      availability: 'Available This Weekend',
      availabilityFilter: 'weekend',
      verified: true,
      badges: ['Identity Verified', 'APU Graduate Student', 'Eco-Guide', 'Active Lifestyle'],
      experiencesOffered: ['exp-apu-secrets'],
      reviews: [
        {
          author: 'Carlos & Sofia (Spain)',
          date: 'July 2026',
          rating: 5,
          text: 'Great energy and super knowledgeable about Mount Tsurumi trails. Having someone who speaks both fluent Spanish and English was amazing for my family.'
        }
      ]
    },
    {
      id: 'chloe-chan',
      name: 'Chloe Chan (陳嘉欣)',
      guideType: 'APU Student',
      nationality: 'Hong Kong',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      languages: [
        { name: 'Cantonese', flag: '🇭🇰', level: 'Native (廣東話)' },
        { name: 'Chinese (Mandarin)', flag: '🇨🇳', level: 'Native / Fluent (普通话)' },
        { name: 'English', flag: '🇬🇧', level: 'Fluent' },
        { name: 'Japanese', flag: '🇯🇵', level: 'Fluent (JLPT N1)' }
      ],
      languagesShort: '🇭🇰 廣東話 · 🇨🇳 普通话 · 🇬🇧 English · 🇯🇵 日本語',
      bio: "Hello! I am a final-year APU student from Hong Kong majoring in Culture & Tourism. Having lived in Beppu for four years without a car, I'm an expert on Kamenoi bus routes, Kannawa geothermal steam cooking, and coastal sunset viewpoints. I love helping Cantonese and Mandarin speaking families and couples discover Beppu with total comfort!",
      quote: "無論你講廣東話定國語，我都可以帶你食盡別府地道美食、教你搭巴士浸溫泉！",
      interests: ['Kannawa Steam Food', 'Photography', 'Bus Pass Routes', 'Family Friendly', 'Onsen Etiquette'],
      rateHourly: '¥1,500',
      startingPrice: 'From ¥2,500 / 2 hours',
      priceValue: 2500,
      rating: 4.97,
      reviewsCount: 28,
      experiencesCount: 44,
      responseRate: '100%',
      responseTime: 'Within 30 mins',
      availability: 'Available Today, Tomorrow & This Weekend',
      availabilityFilter: 'today',
      verified: true,
      badges: ['Identity Verified', 'APU Student', 'Cantonese & Mandarin Guide', 'Top Rated'],
      experiencesOffered: ['exp-hidden-ramen', 'exp-station-welcome'],
      reviews: [
        {
          author: 'Wong Family (Hong Kong / 香港)',
          date: 'September 2026',
          rating: 5,
          text: 'Chloe真係非常細心！帶住屋企長輩同小朋友黎別府自由行，無租車本來好擔心交通。Chloe喺別府站等我哋，幫手買好龜之井巴士飛，仲帶我哋去鐵輪蒸海鮮，長輩讚不絕口！'
        },
        {
          author: 'Lin & Wang (Taiwan / 台灣)',
          date: 'August 2026',
          rating: 5,
          text: 'Chloe人超級好，中文和日語都超級流利，幫我們翻譯溫泉旅館菜單，還推薦了地獄巡禮最省時的路線，五星推薦！'
        }
      ]
    }
  ],

  // Default sample itinerary for the target user (Couple, 2-3 days, no car)
  defaultItinerary: [
    {
      id: 'item-1',
      placeId: 'beppu-tower-station',
      time: '10:00 AM',
      day: 'Day 1 · Saturday',
      title: 'Arrival at Beppu Station & Transit Orientation',
      notes: 'Pick up 2-Day Kamenoi Bus Pass & try the warm hand bath (Te-yu)',
      duration: '45 min',
      cost: 'Free',
      assignedGuideId: 'maria-santos',
      guideName: 'Maria Santos (APU Student)',
      guideRole: 'Micro-Guide Orientation',
      status: 'confirmed'
    },
    {
      id: 'item-2',
      placeId: 'beppu-hell-tour',
      time: '11:15 AM',
      day: 'Day 1 · Saturday',
      title: 'Beppu Jigoku (Seven Hells) Tour',
      notes: 'Bus #5 to Kannawa. Explore Umi Jigoku and eat onsen steamed pudding',
      duration: '2.5 hours',
      cost: '¥2,200',
      assignedGuideId: null,
      status: 'planned'
    },
    {
      id: 'item-3',
      placeId: 'kannawa-steam-district',
      time: '01:45 PM',
      day: 'Day 1 · Saturday',
      title: 'Kannawa Steam Village Lunch',
      notes: 'Steam fresh vegetables and pork dumplings in volcanic stone kilns',
      duration: '1.5 hours',
      cost: '¥1,500',
      assignedGuideId: null,
      status: 'planned'
    },
    {
      id: 'item-4',
      placeId: 'hyotan-onsen',
      time: '03:45 PM',
      day: 'Day 1 · Saturday',
      title: 'Hyotan Onsen Afternoon Soak',
      notes: 'Waterfall baths and cedar outdoor pools to soothe walking legs',
      duration: '2 hours',
      cost: '¥940',
      assignedGuideId: null,
      status: 'planned'
    },
    {
      id: 'item-5',
      placeId: 'jukkokubashi-alley',
      time: '06:30 PM',
      day: 'Day 1 · Saturday',
      title: 'Retro Alley Dining & Toriten',
      notes: 'Lantern-lit dinner with crispy Oita chicken tempura & cold drinks',
      duration: '2 hours',
      cost: '¥2,500',
      assignedGuideId: 'maria-santos',
      guideName: 'Maria Santos',
      guideRole: 'Alley Dining Companion',
      status: 'requested'
    }
  ]
};

// Expose globally
window.BEPPU_DATA = BEPPU_DATA;
