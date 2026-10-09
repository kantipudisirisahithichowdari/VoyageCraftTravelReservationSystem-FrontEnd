import {
  getStoredBookings,
  saveStoredBookings,
  getStoredPackages,
  saveStoredPackages,
  delay,
} from './mockData.js';

export const bookingService = {
  // ── Create booking (Traveler) ─────────────────────────────────
  createBooking: async (bookingData) => {
    await delay(350);
    const bookings = getStoredBookings();
    const pkgs = getStoredPackages();

    const pkg = pkgs.find(
      (p) => String(p.id) === String(bookingData.packageId)
    );

    const travelersCount = parseInt(bookingData.numTravelers || 1, 10);

    // Decrement available seats in package
    if (pkg && pkg.availableSeats !== undefined) {
      pkg.availableSeats = Math.max(0, pkg.availableSeats - travelersCount);
      saveStoredPackages(pkgs);
    }

    const newBooking = {
      id: Math.floor(100000 + Math.random() * 900000),
      packageId: bookingData.packageId,
      packageName: bookingData.packageName || pkg?.name || 'Travel Package',
      destination: bookingData.destination || pkg?.destination || '',
      travelerId: bookingData.userId || 3,
      travelerName: bookingData.travelerName || 'Sarah Jenkins',
      userEmail: bookingData.userEmail || bookingData.contactEmail || 'traveler@voyagecraft.com',
      contactPhone: bookingData.contactPhone || '',
      numTravelers: travelersCount,
      totalPrice:
        bookingData.totalPrice ||
        (pkg?.price || 499) * travelersCount,
      status: 'PENDING',
      bookingDate: new Date().toISOString().split('T')[0],
      travelDate:
        bookingData.travelDate ||
        new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      imageUrl: pkg?.imageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    };

    bookings.unshift(newBooking);
    saveStoredBookings(bookings);
    return newBooking;
  },

  // ── Get traveler's own bookings ──────────────────────────────
  getMyBookings: async (userIdOrEmail) => {
    await delay(200);
    const bookings = getStoredBookings();

    if (!userIdOrEmail) {
      return bookings;
    }

    const filtered = bookings.filter((b) => {
      const matchId =
        b.travelerId &&
        String(b.travelerId) === String(userIdOrEmail);
      const matchEmail =
        b.userEmail &&
        b.userEmail.toLowerCase() === String(userIdOrEmail).toLowerCase();
      return matchId || matchEmail;
    });

    // If no specific match for this user yet, return the default traveler bookings
    return filtered.length > 0 ? filtered : bookings.filter((b) => b.travelerId === 3 || b.userEmail === 'traveler@voyagecraft.com');
  },

  // ── Get all bookings (Admin) ──────────────────────────────────
  getAllBookings: async () => {
    await delay(200);
    return getStoredBookings();
  },

  // ── Get booking by ID ─────────────────────────────────────────
  getBookingById: async (id) => {
    await delay(150);
    const bookings = getStoredBookings();
    const found = bookings.find((b) => String(b.id) === String(id));
    if (found) return found;
    throw new Error('Booking reservation not found');
  },

  // ── Update booking status ─────────────────────────────────────
  updateBookingStatus: async (id, status = 'CONFIRMED') => {
    await delay(200);
    const bookings = getStoredBookings();
    const b = bookings.find((item) => String(item.id) === String(id));
    if (b) {
      b.status = status;
      saveStoredBookings(bookings);
      return b;
    }
    return null;
  },

  // ── Cancel booking ────────────────────────────────────────────
  cancelBooking: async (id) => {
    await delay(200);
    const bookings = getStoredBookings();
    const b = bookings.find((item) => String(item.id) === String(id));
    if (b) {
      b.status = 'CANCELLED';
      saveStoredBookings(bookings);
      return b;
    }
    return null;
  },
};

export default bookingService;
