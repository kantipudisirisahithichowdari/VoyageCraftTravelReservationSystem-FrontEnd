import {
  getStoredBookings,
  saveStoredBookings,
  delay,
} from './mockData.js';

export const paymentService = {
  // ── Process payment for a booking ────────────────────────────
  processPayment: async (paymentData) => {
    await delay(400);

    const bookingId = paymentData.bookingId;
    const bookings = getStoredBookings();
    const foundBooking = bookings.find((b) => String(b.id) === String(bookingId));

    if (foundBooking) {
      foundBooking.status = 'CONFIRMED';
      saveStoredBookings(bookings);
    }

    const txnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      success: true,
      status: 'SUCCESS',
      paymentStatus: 'SUCCESS',
      paymentId: `PAY-${Date.now()}`,
      transactionId: txnId,
      bookingId: bookingId,
      amount: paymentData.amount || foundBooking?.totalPrice || 699,
      transactionDate: new Date().toISOString(),
      message: 'Payment processed successfully',
    };
  },

  // ── Get payment status ────────────────────────────────────────
  getPaymentStatus: async (paymentIdOrBookingId) => {
    await delay(150);
    return {
      paymentId: `PAY-${paymentIdOrBookingId}`,
      bookingId: paymentIdOrBookingId,
      status: 'SUCCESS',
      paymentStatus: 'SUCCESS',
      transactionDate: new Date().toISOString(),
    };
  },
};

export default paymentService;
