// ============================================================
//  VOYAGECRAFT LOCAL DATA STORE (Frontend Standalone Mode)
//  Persists all users, packages, and bookings in localStorage
// ============================================================

const STORAGE_KEYS = {
  USERS: 'voyagecraft_users',
  PACKAGES: 'voyagecraft_packages',
  BOOKINGS: 'voyagecraft_bookings',
};

// ── Default demo accounts ────────────────────────────────────
export const defaultUsers = [
  {
    id: 1,
    name: 'Admin Administrator',
    email: 'admin@voyagecraft.com',
    password: 'admin123',
    role: 'ADMIN',
    phone: '+1-555-0100',
    createdAt: '2026-01-10',
  },
  {
    id: 2,
    name: 'Global Horizons Travel',
    email: 'provider@voyagecraft.com',
    password: 'provider123',
    role: 'PROVIDER',
    phone: '+1-555-0200',
    createdAt: '2026-02-14',
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    email: 'traveler@voyagecraft.com',
    password: 'traveler123',
    role: 'TRAVELER',
    phone: '+1-555-0300',
    createdAt: '2026-03-01',
  },
];

// ── Default travel packages ───────────────────────────────────
export const defaultPackages = [
  {
    id: 1,
    name: 'Tropical Bali Getaway',
    category: 'Beach',
    destination: 'Bali, Indonesia',
    destinations: [
      { city: 'Ubud', country: 'Indonesia' },
      { city: 'Seminyak', country: 'Indonesia' },
      { city: 'Nusa Penida', country: 'Indonesia' },
    ],
    description:
      'Experience the serene beaches, lush green rice terraces, vibrant culture, and ancient spiritual temples of Bali. Includes guided tours and luxury beachside resort stay.',
    price: 699,
    originalPrice: 899,
    availableSeats: 12,
    imageUrl:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',
    ],
    duration: '5 Days / 4 Nights',
    providerId: 2,
    status: 'ACTIVE',
    rating: 4.9,
    reviews: 142,
    highlights: ['Guided temple tours', 'Rice terrace trek', 'Beachside resort', 'Snorkelling at Nusa Penida'],
    includes: ['Transfers & Speedboat', '4-Star Beachfront Resort', 'Daily Buffet Breakfast', 'Private Guided Sightseeing'],
    excludes: ['International Flights', 'Travel Visa Fees', 'Personal Souvenirs & Expenses', 'Optional Watersports'],
    itinerary: [
      { day: 1, title: 'Arrival & Beach Sunset', desc: 'Arrive at Denpasar Airport, meet your personal chauffeur, check into luxury beach villa in Seminyak, and enjoy an oceanfront welcome dinner.' },
      { day: 2, title: 'Ubud Culture & Rice Terraces', desc: 'Visit Tegalalang Rice Terrace, Sacred Monkey Forest, and experience an authentic Balinese artisan woodcarving village.' },
      { day: 3, title: 'Nusa Penida Island Tour', desc: 'Fast boat excursion to Nusa Penida, explore Kelingking T-Rex Beach, Angel Billabong, and snorkel with manta rays.' },
      { day: 4, title: 'Uluwatu Temple & Kecak Dance', desc: 'Visit the cliffside Uluwatu temple overlooking the Indian Ocean and witness the traditional fire Kecak dance at sunset.' },
      { day: 5, title: 'Souvenir Shopping & Departure', desc: 'Morning leisure by the pool, handicraft shopping at Seminyak square, and airport drop-off.' },
    ],
  },
  {
    id: 2,
    name: 'Swiss Alps Mountain Trek',
    category: 'Mountain',
    destination: 'Interlaken and Zermatt, Switzerland',
    destinations: [
      { city: 'Zurich', country: 'Switzerland' },
      { city: 'Interlaken', country: 'Switzerland' },
      { city: 'Zermatt', country: 'Switzerland' },
    ],
    description:
      'Discover the majestic Swiss Alps with scenic mountain rail rides, breathtaking alpine meadows, cozy chalet accommodation, and pristine glacial lakes.',
    price: 1199,
    originalPrice: 1499,
    availableSeats: 8,
    imageUrl:
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    ],
    duration: '7 Days / 6 Nights',
    providerId: 2,
    status: 'ACTIVE',
    rating: 4.9,
    reviews: 98,
    highlights: ['Jungfraujoch rail trip', 'Matterhorn view', 'Alpine cheese tasting', 'Lake Lucerne cruise'],
    includes: ['Swiss Travel Rail Pass', '5-Star Mountain Chalet Stay', 'Daily Gourmet Breakfast', 'Jungfraujoch Summit Pass'],
    excludes: ['International Flights', 'Ski Equipment Rental', 'Personal Travel Insurance', 'Lunches & Drinks'],
    itinerary: [
      { day: 1, title: 'Arrival in Zurich', desc: 'Arrive in Zurich, scenic train journey across lakes to the Alpine town of Interlaken.' },
      { day: 2, title: 'Top of Europe Jungfraujoch', desc: 'Ascend to Europe highest train station at Jungfraujoch with eternal snow, ice palace, and panoramic viewing deck.' },
      { day: 3, title: 'Lake Brienz & Giessbach Falls', desc: 'Steamboat cruise across turquoise Lake Brienz and funicular ride to the roaring waterfalls.' },
      { day: 4, title: 'Zermatt & Matterhorn', desc: 'Transfer to car-free Zermatt village and enjoy stunning views of the iconic pyramidal Matterhorn.' },
      { day: 5, title: 'Gornergrat Scenic Railway', desc: 'Cogwheel train ride up Gornergrat with 360-degree vistas of 29 towering four-thousander peaks.' },
      { day: 6, title: 'Alpine Fondue & Wellness', desc: 'Relax in thermal Alpine spas and enjoy traditional Swiss cheese fondue evening.' },
      { day: 7, title: 'Zurich Return & Flight Home', desc: 'Scenic rail return to Zurich airport with panoramic photo stops.' },
    ],
  },
  {
    id: 3,
    name: 'Goa Coastal Sun & Sand Escape',
    category: 'Beach',
    destination: 'Goa, India',
    destinations: [
      { city: 'North Goa', country: 'India' },
      { city: 'Panaji', country: 'India' },
      { city: 'South Goa', country: 'India' },
    ],
    description:
      'Immerse in golden beaches, vibrant Portuguese heritage, sunset river cruises, and watersports. Perfect for weekend getaways and beach lovers.',
    price: 349,
    originalPrice: 480,
    availableSeats: 16,
    imageUrl:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    ],
    duration: '4 Days / 3 Nights',
    providerId: 2,
    status: 'ACTIVE',
    rating: 4.8,
    reviews: 210,
    highlights: ['Mandovi river luxury cruise', 'Calangute & Baga water sports', 'Old Goa Portuguese churches', 'South Goa secluded beaches'],
    includes: ['AC Private Airport Transfers', '4-Star Beachside Resort Stay', 'Buffet Breakfast & Dinner', 'Mandovi Sunset Cruise Ticket'],
    excludes: ['Flight Tickets', 'Watersport Jet Ski fees', 'Personal Bar Bills', 'Late checkout charges'],
    itinerary: [
      { day: 1, title: 'Welcome to Sunny Goa', desc: 'Airport pickup, check in to Calangute resort, relax at beach shacks, and enjoy coastal seafood dinner.' },
      { day: 2, title: 'North Goa Beaches & Fort Aguada', desc: 'Visit historic 17th-century Fort Aguada, Candolim, and thrill in Baga watersports.' },
      { day: 3, title: 'Old Goa Heritage & Sunset Cruise', desc: 'Explore Basilica of Bom Jesus, colorful Latin quarter Fontainhas, and evening Mandovi cruise with folk dance.' },
      { day: 4, title: 'Colva Beach & Departure', desc: 'Morning swim, visit South Goa quiet palms, local cashew market, and transfer to Dabolim / Mopa airport.' },
    ],
  },
  {
    id: 4,
    name: 'Kashmir Heaven on Earth Tour',
    category: 'Honeymoon',
    destination: 'Srinagar and Gulmarg, Kashmir, India',
    destinations: [
      { city: 'Srinagar', country: 'India' },
      { city: 'Gulmarg', country: 'India' },
      { city: 'Pahalgam', country: 'India' },
    ],
    description:
      'Experience the magic of snow-capped Himalayas, iconic Shikara boat rides on Dal Lake, world-famous Gulmarg Gondola, and blooming Mughal gardens.',
    price: 499,
    originalPrice: 650,
    availableSeats: 10,
    imageUrl:
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626014303757-656c0399587a?auto=format&fit=crop&w=800&q=80',
    ],
    duration: '6 Days / 5 Nights',
    providerId: 2,
    status: 'ACTIVE',
    rating: 4.9,
    reviews: 185,
    highlights: ['Luxury Dal Lake Houseboat stay', 'Shikara ride with Kashmiri Kahwa', 'Gulmarg Asia highest Gondola', 'Betaab Valley in Pahalgam'],
    includes: ['All Transfers in Private SUV', '1 Night Royal Houseboat + 4 Nights Hotel', 'Breakfast and Dinners', '1 Hour Dal Lake Shikara Ride'],
    excludes: ['Airfare', 'Gulmarg Gondola Phase 2 tickets', 'Pony / Horse rides in Pahalgam', 'Personal warm clothing rental'],
    itinerary: [
      { day: 1, title: 'Arrival Srinagar & Dal Lake Houseboat', desc: 'Arrive at Srinagar, check into handcrafted cedar-wood luxury houseboat, followed by evening Shikara ride.' },
      { day: 2, title: 'Mughal Gardens & Shankaracharya', desc: 'Visit Shalimar Bagh, Nishat Bagh, and panoramic temple hill overlooking the valley.' },
      { day: 3, title: 'Gulmarg Meadow of Flowers & Gondola', desc: 'Drive through pine forests to Gulmarg, ride the famous Gondola cable car up to Apharwat snow peaks.' },
      { day: 4, title: 'Pahalgam Valley of Shepherds', desc: 'Scenic drive along saffron fields to Pahalgam, visit Betaab Valley and roaring Lidder river.' },
      { day: 5, title: 'Aru Valley & Local Handicrafts', desc: 'Explore meadow trails, shop genuine Kashmiri Pashmina and saffron in Srinagar old bazaar.' },
      { day: 6, title: 'Farewell Kashmir', desc: 'Breakfast with freshly brewed Kahwa, transfer to Srinagar airport with unforgettable memories.' },
    ],
  },
  {
    id: 5,
    name: 'Manali & Rohtang Pass Himalayan Escape',
    category: 'Adventure',
    destination: 'Manali and Solang, Himachal Pradesh, India',
    destinations: [
      { city: 'Kullu', country: 'India' },
      { city: 'Manali', country: 'India' },
      { city: 'Solang Valley', country: 'India' },
    ],
    description:
      'Chasing snow peaks, river rafting on the Beas river, paragliding in Solang Valley, and exploring pine-scented mountain cafes in Old Manali.',
    price: 399,
    originalPrice: 520,
    availableSeats: 14,
    imageUrl:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    ],
    duration: '5 Days / 4 Nights',
    providerId: 2,
    status: 'ACTIVE',
    rating: 4.8,
    reviews: 130,
    highlights: ['Solang Valley adventure & paragliding', 'Atal Tunnel & Sissu snow fields', 'Hadimba Devi wooden temple', 'Beas river white water rafting'],
    includes: ['Volvo bus / SUV transfers', 'Pine-view 4-Star Resort stay', 'Breakfast and Dinner daily', 'Solang sightseeing tour'],
    excludes: ['Adventure activity fees (paragliding/zipline)', 'Rohtang Pass NGT green permit', 'Heater charges in budget rooms'],
    itinerary: [
      { day: 1, title: 'Arrival in Manali', desc: 'Check in to mountain resort, stroll through Mall Road, and visit historic Hadimba Temple in cedar forest.' },
      { day: 2, title: 'Solang Valley & Atal Tunnel', desc: 'Visit Solang Valley for cable car & paragliding, drive through modern Atal Tunnel to snowy Lahaul valley.' },
      { day: 3, title: 'Kullu Rafting & Naggar Castle', desc: 'River rafting in chilly Beas river and explore the ancient Himalayan wood architecture of Naggar Castle.' },
      { day: 4, title: 'Old Manali & Jogini Waterfall', desc: 'Trek to scenic Jogini waterfall and experience live acoustic music at bohemian cafes in Old Manali.' },
      { day: 5, title: 'Departure', desc: 'Pack local apple jams and woollens, check out and journey back.' },
    ],
  },
  {
    id: 6,
    name: 'Kerala Backwaters & Munnar Hills',
    category: 'Honeymoon',
    destination: 'Munnar and Alleppey, Kerala, India',
    destinations: [
      { city: 'Kochi', country: 'India' },
      { city: 'Munnar', country: 'India' },
      { city: 'Alleppey', country: 'India' },
    ],
    description:
      'Rolling emerald tea plantations in Munnar, spice gardens, and a tranquil overnight private houseboat cruise through Alleppey palm-fringed backwaters.',
    price: 460,
    originalPrice: 599,
    availableSeats: 11,
    imageUrl:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    ],
    duration: '5 Days / 4 Nights',
    providerId: 2,
    status: 'ACTIVE',
    rating: 4.9,
    reviews: 167,
    highlights: ['Tea plantation jeep safari', 'Overnight Alleppey traditional houseboat', 'Cheeyappara waterfalls', 'Kathakali cultural dance show'],
    includes: ['AC Private Car & Driver throughout', '2 Nights Munnar Resort + 1 Night Houseboat', 'Houseboat All Meals Included', 'Tea Museum Entry'],
    excludes: ['Flights to Kochi', 'Ayurvedic Spa treatments', 'Personal laundry and tips'],
    itinerary: [
      { day: 1, title: 'Kochi to Munnar Mist Hills', desc: 'Pick up from Kochi airport, scenic drive past waterfalls and rubber estates to tea capital Munnar.' },
      { day: 2, title: 'Munnar Tea Gardens & Eravikulam', desc: 'Spot endangered Nilgiri Tahr at Eravikulam National Park and tour world-famous Tata Tea Museum.' },
      { day: 3, title: 'Thekkady Spices & Elephant Sanctuary', desc: 'Visit organic spice plantation and boat ride on Periyar lake.' },
      { day: 4, title: 'Alleppey Backwaters Houseboat', desc: 'Board traditional Kettuvallam houseboat, glide through lagoons, and feast on traditional Kerala Sadhya.' },
      { day: 5, title: 'Kochi Heritage & Departure', desc: 'Visit Chinese fishing nets in Fort Kochi and drop-off at Kochi airport.' },
    ],
  },
  {
    id: 7,
    name: 'Santorini Sunset Cruise & Cyclades',
    category: 'Romantic',
    destination: 'Santorini and Mykonos, Greece',
    destinations: [
      { city: 'Athens', country: 'Greece' },
      { city: 'Mykonos', country: 'Greece' },
      { city: 'Santorini', country: 'Greece' },
    ],
    description:
      'Enjoy whitewashed cliffside villages, panoramic Aegean sea views, world-renowned caldera sunsets, and private catamaran sailing experiences.',
    price: 950,
    originalPrice: 1200,
    availableSeats: 10,
    imageUrl:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    ],
    duration: '5 Days / 4 Nights',
    providerId: 2,
    status: 'ACTIVE',
    rating: 4.9,
    reviews: 112,
    highlights: ['Catamaran sunset cruise', 'Oia village walk', 'Volcano hot springs', 'Mykonos beach clubs'],
    includes: ['Inter-island High-speed Ferry', 'Boutique Cliffside Hotel (4-Star)', 'Breakfast & Sunset Dinner', 'Catamaran Excursion'],
    excludes: ['International Flights', 'Greek Tourist City Tax', 'Personal Shopping'],
    itinerary: [
      { day: 1, title: 'Arrival in Mykonos', desc: 'Check in to boutique resort, stroll through Little Venice and iconic windmills.' },
      { day: 2, title: 'Mykonos Beach Clubs & Ferry to Santorini', desc: 'High-speed ferry transfer to Santorini caldera cliffs and sunset in Fira.' },
      { day: 3, title: 'Caldera Catamaran Sailing', desc: 'Sail past Red Beach, swim in volcano thermal springs, and BBQ dinner on board.' },
      { day: 4, title: 'Oia Village & Wine Tasting', desc: 'Explore blue-domed churches in Oia and taste Assyrtiko wine at cliffside vineyard.' },
      { day: 5, title: 'Departure', desc: 'Morning coffee overlooking the Aegean and transfer to Santorini airport.' },
    ],
  },
  {
    id: 8,
    name: 'Paris Romance and City Lights',
    category: 'Romantic',
    destination: 'Paris and Versailles, France',
    destinations: [
      { city: 'Paris', country: 'France' },
      { city: 'Versailles', country: 'France' },
    ],
    description:
      'Explore the iconic Eiffel Tower, the Louvre museum, romantic Seine river cruises, and charming Parisian cafes with top-rated culinary dining.',
    price: 850,
    originalPrice: 1100,
    availableSeats: 14,
    imageUrl:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
    ],
    duration: '4 Days / 3 Nights',
    providerId: 2,
    status: 'ACTIVE',
    rating: 4.8,
    reviews: 154,
    highlights: ['Eiffel Tower night view', 'Louvre skip-the-line', 'Seine dinner cruise', 'Palace of Versailles'],
    includes: ['Boutique 4-Star Hotel in Central Paris', 'Daily French Breakfast', 'Louvre & Versailles Priority Entry', 'Seine Gourmet Dinner Cruise'],
    excludes: ['International Airfare', 'Paris City Tax', 'Lunches & Drinks'],
    itinerary: [
      { day: 1, title: 'Arrival & Eiffel Tower Illumination', desc: 'Check in to hotel near Champs-Elysees, evening visit to glittering Eiffel Tower.' },
      { day: 2, title: 'Louvre & Montmartre Art Walk', desc: 'Skip-the-line Mona Lisa viewing, afternoon in bohemian Montmartre and Sacre-Coeur.' },
      { day: 3, title: 'Palace of Versailles & Seine Cruise', desc: 'Grand tour of Hall of Mirrors and romantic 3-course dinner cruise on the Seine.' },
      { day: 4, title: 'Le Marais Cafes & Departure', desc: 'Croissant breakfast, shopping in Le Marais, and departure transfer.' },
    ],
  },
  {
    id: 9,
    name: 'Kyoto & Tokyo Cultural Odyssey',
    category: 'Cultural',
    destination: 'Kyoto and Nara, Japan',
    destinations: [
      { city: 'Tokyo', country: 'Japan' },
      { city: 'Kyoto', country: 'Japan' },
      { city: 'Nara', country: 'Japan' },
    ],
    description:
      'Immerse yourself in traditional Japanese tea ceremonies, historic Shinto shrines, serene Zen gardens, and blooming cherry blossoms in historic Kyoto.',
    price: 899,
    originalPrice: 1150,
    availableSeats: 15,
    imageUrl:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    ],
    duration: '6 Days / 5 Nights',
    providerId: 2,
    status: 'ACTIVE',
    rating: 4.9,
    reviews: 120,
    highlights: ['Tea ceremony workshop', 'Arashiyama bamboo forest', 'Fushimi Inari 10,000 torii gates', 'Nara deer park'],
    includes: ['JR Shinkansen Bullet Train Passes', 'Ryokan Inn + 4-Star Hotels', 'Daily Breakfast', 'Private Local Guide'],
    excludes: ['International Flights', 'Travel Visa', 'Personal purchases'],
    itinerary: [
      { day: 1, title: 'Arrive Tokyo', desc: 'Transfer to hotel in Shinjuku and explore bustling neon Shibuya crossing.' },
      { day: 2, title: 'Bullet Train to Kyoto', desc: 'Board Shinkansen to ancient Kyoto, check into traditional tatami ryokan.' },
      { day: 3, title: 'Fushimi Inari & Gion Geisha District', desc: 'Hike through vermillion torii gates and evening tea tasting in historic Gion.' },
      { day: 4, title: 'Arashiyama Bamboo Grove & Golden Pavilion', desc: 'Walk through towering bamboo stalks and admire Kinkaku-ji temple reflected in the pond.' },
      { day: 5, title: 'Nara Sacred Deer & Todaiji', desc: 'Feed bowing friendly sika deer in Nara park and see giant bronze Buddha.' },
      { day: 6, title: 'Departure', desc: 'Bullet train to Kansai / Haneda airport for homeward journey.' },
    ],
  },
  {
    id: 10,
    name: 'Dubai Luxury Desert Safari & Skyline',
    category: 'Weekend',
    destination: 'Dubai and Abu Dhabi, UAE',
    destinations: [
      { city: 'Dubai', country: 'UAE' },
      { city: 'Abu Dhabi', country: 'UAE' },
    ],
    description:
      'A luxurious Arabian adventure featuring Burj Khalifa access, gold souks, thrilling dune bashing, and authentic Bedouin desert camping.',
    price: 780,
    originalPrice: 990,
    availableSeats: 20,
    imageUrl:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
    ],
    duration: '5 Days / 4 Nights',
    providerId: 2,
    status: 'ACTIVE',
    rating: 4.8,
    reviews: 176,
    highlights: ['Burj Khalifa 124th floor view', 'Desert 4x4 dune bashing & BBQ', 'Sheikh Zayed Grand Mosque', 'Dubai Marina yacht cruise'],
    includes: ['5-Star Luxury Hotel Stay', 'Daily Buffet Breakfast', 'VIP Desert Safari with BBQ', 'Abu Dhabi Day Excursion'],
    excludes: ['International Flights', 'UAE Visa fee', 'Tourism Dirham hotel fee'],
    itinerary: [
      { day: 1, title: 'Arrival & Dubai Marina', desc: 'Airport limousine transfer, check in, evening sunset cruise around Dubai Marina.' },
      { day: 2, title: 'Burj Khalifa & Dubai Mall', desc: 'Ascend to the highest observation deck and witness the Dubai Fountain spectacle.' },
      { day: 3, title: 'Red Dunes Safari & Bedouin Camp', desc: 'Thrilling sand dune bashing in 4x4 land cruisers, camel rides, and belly dance dinner.' },
      { day: 4, title: 'Abu Dhabi Grand Mosque & Louvre', desc: 'Day trip to marble marvel Sheikh Zayed Grand Mosque and Louvre Abu Dhabi.' },
      { day: 5, title: 'Gold Souk & Departure', desc: 'Morning shopping at Deira Gold & Spice souks and airport transfer.' },
    ],
  },
];

// ── Default bookings ──────────────────────────────────────────
export const defaultBookings = [
  {
    id: 101,
    packageId: 1,
    packageName: 'Tropical Bali Getaway',
    destination: 'Bali, Indonesia',
    travelerId: 3,
    travelerName: 'Sarah Jenkins',
    userEmail: 'traveler@voyagecraft.com',
    numTravelers: 2,
    totalPrice: 1398,
    status: 'CONFIRMED',
    bookingDate: '2026-03-20',
    travelDate: '2026-04-15',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 102,
    packageId: 2,
    packageName: 'Swiss Alps Mountain Trek',
    destination: 'Interlaken and Zermatt, Switzerland',
    travelerId: 3,
    travelerName: 'Sarah Jenkins',
    userEmail: 'traveler@voyagecraft.com',
    numTravelers: 1,
    totalPrice: 1199,
    status: 'PENDING',
    bookingDate: '2026-03-22',
    travelDate: '2026-05-10',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 103,
    packageId: 3,
    packageName: 'Kyoto Cultural Heritage Tour',
    destination: 'Kyoto and Nara, Japan',
    travelerId: 4,
    travelerName: 'Michael Chang',
    userEmail: 'mchang@example.com',
    numTravelers: 3,
    totalPrice: 2697,
    status: 'CONFIRMED',
    bookingDate: '2026-03-24',
    travelDate: '2026-06-01',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  },
];

// ── LocalStorage Helpers ─────────────────────────────────────
export const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
      return [...defaultUsers];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [...defaultUsers];
  }
};

export const saveStoredUsers = (users) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (e) {
    console.warn('Could not save users to localStorage:', e);
  }
};

export const getStoredPackages = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(defaultPackages));
      return [...defaultPackages];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length < defaultPackages.length) {
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(defaultPackages));
      return [...defaultPackages];
    }
    return parsed;
  } catch (e) {
    return [...defaultPackages];
  }
};

export const saveStoredPackages = (packages) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  } catch (e) {
    console.warn('Could not save packages to localStorage:', e);
  }
};

export const getStoredBookings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(defaultBookings));
      return [...defaultBookings];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [...defaultBookings];
  }
};

export const saveStoredBookings = (bookings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch (e) {
    console.warn('Could not save bookings to localStorage:', e);
  }
};

// ── Simulated delay for smooth UI feedback ───────────────────
export const delay = (ms = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Backwards compatibility aliases
export const mockUsers = defaultUsers;
export const mockPackages = defaultPackages;
export const mockBookings = defaultBookings;
export const MOCK_MODE = true;
