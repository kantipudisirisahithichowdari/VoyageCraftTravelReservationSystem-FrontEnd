import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import bookingService from '../services/bookingService';
import formatINR from '../services/currency';

const MyBookings = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await bookingService.getMyBookings(user?.id || user?.email);
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.warn('Could not fetch bookings:', err);
        setError('Failed to fetch your bookings from the Booking Service.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated, user, navigate]);

  const getStatusBadge = (status) => {
    const s = (status || 'PENDING').toUpperCase();
    if (s === 'CONFIRMED' || s === 'PAID' || s === 'SUCCESS' || s === 'COMPLETED') {
      return <span className="status-badge status-confirmed">Confirmed</span>;
    }
    if (s === 'PENDING') {
      return <span className="status-badge status-pending">Pending Payment</span>;
    }
    return <span className="status-badge status-failed">{s}</span>;
  };

  return (
    <div className="page-container">
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '24px' }}>
        <h1 className="section-title">My Bookings</h1>
        <p className="section-subtitle">
          Manage and review all your travel reservations and payment statuses
        </p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your reservations...</p>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>⚠️ {error}</span>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-outline-danger btn-sm"
            style={{ marginLeft: 'auto' }}
          >
            Retry
          </button>
        </div>
      ) : bookings.length === 0 ? (
        <div className="empty-state" style={{ backgroundColor: '#ffffff', padding: '60px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🎫</span>
          <h2 style={{ fontSize: '1.3rem', color: '#1e293b', marginBottom: '8px' }}>No bookings found.</h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>You haven't reserved any travel packages yet.</p>
          <Link to="/packages" className="btn btn-primary">
            Explore Travel Packages
          </Link>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((b) => {
            const bookingId = b.id || b.bookingId;
            const packageName = b.packageName || b.package?.name || 'VoyageCraft Package';
            const destination = b.destination || b.package?.destination || 'Global Tour';
            const totalAmount = b.totalPrice || b.amount || b.price || 0;
            const status = b.status || b.bookingStatus || 'CONFIRMED';
            const numTravelers = b.numTravelers || b.travelersCount || b.seatsBooked || 1;
            const isPending = (status || '').toUpperCase() === 'PENDING';

            return (
              <div key={bookingId} className="booking-item">
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Booking ID:</span>
                    <strong style={{ color: '#0284c7' }}>#{bookingId}</strong>
                    {getStatusBadge(status)}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '4px' }}>
                    {packageName}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    📍 {destination} • 👥 {numTravelers} Traveler(s)
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Total Amount</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0284c7' }}>
                      {formatINR(totalAmount)}
                    </div>
                  </div>

                  {isPending && (
                    <button
                      onClick={() =>
                        navigate(`/payment/${bookingId}`, {
                          state: {
                            booking: {
                              bookingId: bookingId,
                              packageName: packageName,
                              totalPrice: totalAmount,
                              numTravelers: numTravelers,
                            },
                          },
                        })
                      }
                      className="btn btn-teal btn-sm"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
