import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import packageService from '../services/packageService';
import bookingService from '../services/bookingService';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [pkg, setPkg] = useState(null);
  const [numTravelers, setNumTravelers] = useState(1);
  const [travelerName, setTravelerName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If user is logged in, prefill contact info
    if (user) {
      if (user.name) setTravelerName(user.name);
      if (user.email) setContactEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await packageService.getPackageById(id);
        setPkg(data);
      } catch (err) {
        setError('Failed to load package for reservation.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Preparing reservation details...</p>
        </div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="page-container">
        <div className="alert alert-error">{error || 'Package not found'}</div>
        <Link to="/packages" className="btn btn-outline">
          &larr; Back to Packages
        </Link>
      </div>
    );
  }

  const packagePrice = pkg.price || pkg.cost || 499;
  const packageName = pkg.name || pkg.title || pkg.packageName || 'Scenic Tour';
  const destination = pkg.destination || pkg.location || 'Selected Destination';
  const availableSeats = pkg.availableSeats !== undefined ? pkg.availableSeats : (pkg.seats || 10);
  const totalPrice = numTravelers * packagePrice;

  const handleTravelerCountChange = (val) => {
    const count = parseInt(val, 10);
    if (isNaN(count) || count < 1) {
      setNumTravelers(1);
    } else if (count > availableSeats) {
      setNumTravelers(availableSeats);
    } else {
      setNumTravelers(count);
    }
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/booking/${id}` } } });
      return;
    }

    if (numTravelers < 1) {
      setError('Please select at least 1 traveler.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Microservice payload matching standard Spring Boot Booking DTOs
      const bookingPayload = {
        packageId: pkg.id || id,
        packageName: packageName,
        destination: destination,
        userId: user?.id || user?.userId || 1,
        userEmail: user?.email || contactEmail,
        travelerName: travelerName || user?.name || 'Guest Traveler',
        contactEmail: contactEmail || user?.email,
        contactPhone: contactPhone,
        numTravelers: numTravelers,
        travelersCount: numTravelers,
        seatsBooked: numTravelers,
        totalPrice: totalPrice,
        price: totalPrice,
        amount: totalPrice,
        bookingDate: new Date().toISOString(),
        status: 'PENDING'
      };

      const response = await bookingService.createBooking(bookingPayload);

      // Extract generated booking ID
      const bookingId = response.id || response.bookingId || response.bookingReference || Math.floor(100000 + Math.random() * 900000);

      // Navigate to Payment page with booking ID and amount
      navigate(`/payment/${bookingId}`, {
        state: {
          booking: {
            bookingId: bookingId,
            packageName: packageName,
            destination: destination,
            numTravelers: numTravelers,
            totalPrice: totalPrice,
            userEmail: contactEmail || user?.email,
          }
        }
      });
    } catch (err) {
      console.error('Booking failed:', err);
      const errMsg = err.message || 'Could not create booking. Please check your inputs and try again.';
      setError(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <Link to={`/packages/${id}`} style={{ display: 'inline-block', marginBottom: '20px', fontWeight: 600 }}>
        &larr; Back to Package Details
      </Link>

      <div className="section-header" style={{ textAlign: 'left', marginBottom: '24px' }}>
        <h1 className="section-title">Complete Your Reservation</h1>
        <p className="section-subtitle">Review trip details and confirm your travel party</p>
      </div>

      {!isAuthenticated && (
        <div className="alert alert-info" style={{ marginBottom: '24px' }}>
          <span>ℹ️ You must be logged in to confirm a booking.</span>
          <Link to="/login" state={{ from: { pathname: `/booking/${id}` } }} className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>
            Login Now
          </Link>
        </div>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      <div className="details-container">
        {/* Booking Form */}
        <div className="details-main-card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#1e293b' }}>Traveler Information</h2>

          <form onSubmit={handleConfirmBooking}>
            <div className="form-group">
              <label className="form-label" htmlFor="travelerCount">
                Number of Travelers (Max: {availableSeats})
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ width: '42px', height: '42px', padding: 0 }}
                  onClick={() => handleTravelerCountChange(numTravelers - 1)}
                  disabled={numTravelers <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="travelerCount"
                  className="form-control"
                  style={{ width: '100px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}
                  min="1"
                  max={availableSeats}
                  value={numTravelers}
                  onChange={(e) => handleTravelerCountChange(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ width: '42px', height: '42px', padding: 0 }}
                  onClick={() => handleTravelerCountChange(numTravelers + 1)}
                  disabled={numTravelers >= availableSeats}
                >
                  +
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="primaryName">
                Lead Traveler Full Name
              </label>
              <input
                type="text"
                id="primaryName"
                className="form-control"
                placeholder="Enter lead traveler full name"
                value={travelerName}
                onChange={(e) => setTravelerName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Contact Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Where should we send your confirmation?"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                className="form-control"
                placeholder="+1 (555) 000-0000"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              disabled={submitting}
              style={{ marginTop: '24px' }}
            >
              {submitting ? 'Creating Reservation...' : 'Confirm Booking & Proceed to Payment'}
            </button>
          </form>
        </div>

        {/* Selected Package Summary */}
        <div className="details-side-card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#1e293b' }}>Reservation Summary</h3>
          
          <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '1.1rem', color: '#0284c7', marginBottom: '4px' }}>{packageName}</h4>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>📍 {destination}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: '#64748b' }}>Rate per traveler:</span>
              <strong>${packagePrice}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ color: '#64748b' }}>Travelers:</span>
              <strong>x {numTravelers}</strong>
            </div>
          </div>

          <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '16px', marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total Price:</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0284c7' }}>${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
