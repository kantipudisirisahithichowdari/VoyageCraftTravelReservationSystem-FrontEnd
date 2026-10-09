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
    destination: 'Bali, Indonesia',
    destinations: [
      { city: 'Ubud', country: 'Indonesia' },
      { city: 'Seminyak', country: 'Indonesia' },
      { city: 'Nusa Penida', country: 'Indonesia' },
    ],
    description:
      'Experience the serene beaches, lush green rice terraces, vibrant culture, and ancient spiritual temples of Bali. Includes guided tours and luxury beachside resort stay.',
    price: 699,
    availableSeats: 12,
    imageUrl:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    duration: '5 Days / 4 Nights',
    providerId: 2,
    status: 'ACTIVE',
    highlights: ['Guided temple tours', 'Rice terrace trek', 'Beachside resort', 'Snorkelling at Nusa Penida'],
    includes: ['Flights', 'Hotel (4 star)', 'Daily breakfast', 'Airport transfers'],
  },
  {
    id: 2,
    name: 'Swiss Alps Mountain Trek',
    destination: 'Interlaken and Zermatt, Switzerland',
    destinations: [
      { city: 'Zurich', country: 'Switzerland' },
      { city: 'Interlaken', country: 'Switzerland' },
      { city: 'Zermatt', country: 'Switzerland' },
    ],
    description:
      'Discover the majestic Swiss Alps with scenic mountain rail rides, breathtaking alpine meadows, cozy chalet accommodation, and pristine glacial lakes.',
    price: 1199,
    availableSeats: 8,
    imageUrl:
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    duration: '7 Days / 6 Nights',
    providerId: 2,
    status: 'ACTIVE',
    highlights: ['Jungfraujoch rail trip', 'Matterhorn view', 'Alpine cheese tasting', 'Lake Lucerne cruise'],
    includes: ['Flights', 'Chalet stay (5 star)', 'All meals', 'Rail passes'],
  },
  {
    id: 3,
    name: 'Kyoto Cultural Heritage Tour',
    destination: 'Kyoto and Nara, Japan',
    destinations: [
      { city: 'Tokyo', country: 'Japan' },
      { city: 'Kyoto', country: 'Japan' },
      { city: 'Nara', country: 'Japan' },
    ],
    description:
      'Immerse yourself in traditional Japanese tea ceremonies, historic Shinto shrines, serene Zen gardens, and blooming cherry blossoms in the heart of historic Kyoto.',
    price: 899,
    availableSeats: 15,
    imageUrl:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    duration: '6 Days / 5 Nights',
    providerId: 2,
    status: 'ACTIVE',
    highlights: ['Tea ceremony workshop', 'Arashiyama bamboo forest', 'Fushimi Inari gates', 'Nara deer park'],
    includes: ['Flights', 'Ryokan (traditional inn)', 'Daily breakfast', 'JR Rail pass'],
  },
  {
    id: 4,
    name: 'Santorini Sunset Cruise and Stay',
    destination: 'Santorini and Mykonos, Greece',
    destinations: [
      { city: 'Athens', country: 'Greece' },
      { city: 'Mykonos', country: 'Greece' },
      { city: 'Santorini', country: 'Greece' },
    ],
    description:
      'Enjoy whitewashed cliffside villages, panoramic Aegean sea views, world-renowned caldera sunsets, and private catamaran sailing experiences.',
    price: 950,
    availableSeats: 10,
    imageUrl:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    duration: '5 Days / 4 Nights',
    providerId: 2,
    status: 'ACTIVE',
    highlights: ['Catamaran sunset cruise', 'Oia village walk', 'Volcano hot springs', 'Mykonos beach clubs'],
    includes: ['Flights', 'Boutique hotel (4 star)', 'Breakfast and dinner', 'Ferry transfers'],
  },
  {
    id: 5,
    name: 'Paris Romance and City Lights',
    destination: 'Paris and Versailles, France',
    destinations: [
      { city: 'Paris', country: 'France' },
      { city: 'Versailles', country: 'France' },
    ],
    description:
      'Explore the iconic Eiffel Tower, the Louvre museum, romantic Seine river cruises, and charming Parisian cafes with top-rated culinary dining.',
    price: 850,
    availableSeats: 14,
    imageUrl:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    duration: '4 Days / 3 Nights',
    providerId: 2,
    status: 'ACTIVE',
    highlights: ['Eiffel Tower night view', 'Louvre skip-the-line', 'Seine dinner cruise', 'Palace of Versailles'],
    includes: ['Flights', 'Boutique hotel (4 star)', 'Daily breakfast', 'Metro day pass'],
  },
  {
    id: 6,
    name: 'Dubai Luxury Desert Safari',
    destination: 'Dubai and Abu Dhabi, UAE',
    destinations: [
      { city: 'Dubai', country: 'UAE' },
      { city: 'Abu Dhabi', country: 'UAE' },
    ],
    description:
      'A luxurious Arabian adventure featuring Burj Khalifa access, gold souks, thrilling dune bashing, and authentic Bedouin desert camping.',
    price: 780,
    availableSeats: 20,
    imageUrl:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    duration: '5 Days / 4 Nights',
    providerId: 2,
    status: 'ACTIVE',
    highlights: ['Burj Khalifa observation deck', 'Desert dune bashing', 'Gold souk tour', 'Sheikh Zayed Mosque'],
    includes: ['Flights', 'Luxury hotel (5 star)', 'Breakfast and dinner', 'All safari activities'],
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
    return JSON.parse(raw);
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
