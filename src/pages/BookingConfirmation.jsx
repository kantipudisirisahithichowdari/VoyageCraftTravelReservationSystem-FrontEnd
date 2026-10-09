import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const location = useLocation();

  const details = location.state?.booking || {
    bookingId: bookingId || '101',
    packageName: 'Scenic Travel Package',
    destination: 'Tropical Destination',
    numTravelers: 2,
    totalPrice: 1398,
    status: 'CONFIRMED',
    transactionId: 'TXN-' + Math.floor(100000 + Math.random() * 900000),
  };

  return (
    <div className="page-container">
      <div className="form-card" style={{ maxWidth: '600px', padding: '36px' }}>
        {/* Success Icon */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#ecfdf5',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            margin: '0 auto 16px'
          }}>
            ✓
          </div>
          <h1 className="form-title" style={{ fontSize: '1.75rem', marginBottom: '4px' }}>
            Booking Confirmed!
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Your travel reservation has been successfully confirmed and registered.
          </p>
        </div>

        {/* Boarding Pass / Ticket Summary */}
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1.5px dashed #cbd5e1',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '28px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Booking ID</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0284c7' }}>#{details.bookingId}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Status</div>
              <span className="status-badge status-confirmed">Confirmed</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Package Name:</div>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>{details.packageName}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Destination:</div>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>📍 {details.destination}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Travelers:</div>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>👥 {details.numTravelers} Passenger(s)</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Total Paid:</div>
              <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '1.15rem' }}>${details.totalPrice}</div>
            </div>
          </div>

          {details.transactionId && (
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', fontSize: '0.85rem', color: '#64748b' }}>
              Payment Reference: <strong>{details.transactionId}</strong>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Link to="/my-bookings" className="btn btn-primary">
            View My Bookings
          </Link>
          <Link to="/packages" className="btn btn-outline">
            Browse More Packages
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
