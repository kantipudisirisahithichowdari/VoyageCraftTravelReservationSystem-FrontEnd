import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bookingService from '../services/bookingService';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await bookingService.getAllBookings();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Could not retrieve platform reservations.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, []);

  const getStatusBadge = (status) => {
    const s = (status || 'PENDING').toUpperCase();
    if (s === 'CONFIRMED' || s === 'PAID' || s === 'SUCCESS') {
      return <span className="status-badge status-confirmed">Confirmed</span>;
    }
    if (s === 'PENDING') {
      return <span className="status-badge status-pending">Pending</span>;
    }
    return <span className="status-badge status-failed">{s}</span>;
  };

  return (
    <div className="page-container">
      <Link to="/admin/dashboard" style={{ display: 'inline-block', marginBottom: '16px', fontWeight: 600 }}>
        &larr; Back to Admin Dashboard
      </Link>

      <div className="dashboard-header">
        <div>
          <h1 className="section-title">All Customer Reservations</h1>
          <p className="section-subtitle">Comprehensive ledger of all package bookings made on VoyageCraft</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Fetching platform bookings ledger...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="empty-state" style={{ background: '#ffffff', padding: '60px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3>No bookings recorded</h3>
          <p style={{ color: '#64748b', marginTop: '8px' }}>No traveler has submitted a reservation yet.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer / Email</th>
                <th>Package Name</th>
                <th>Destination</th>
                <th>Travelers</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const id = b.id || b.bookingId;
                const name = b.travelerName || b.userEmail || 'Customer';
                const pkgName = b.packageName || b.package?.name || 'Package';
                const dest = b.destination || b.package?.destination || 'Destination';
                const count = b.numTravelers || b.travelersCount || 1;
                const total = b.totalPrice || b.amount || 0;

                return (
                  <tr key={id}>
                    <td><strong>#{id}</strong></td>
                    <td>
                      <div><strong>{name}</strong></div>
                      {b.userEmail && <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{b.userEmail}</div>}
                    </td>
                    <td>{pkgName}</td>
                    <td>📍 {dest}</td>
                    <td>{count} traveler(s)</td>
                    <td><strong style={{ color: '#0284c7' }}>${total}</strong></td>
                    <td>{getStatusBadge(b.status)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
