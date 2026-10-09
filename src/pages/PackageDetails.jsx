import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import packageService from '../services/packageService';
import { useAuth } from '../context/AuthContext';

const defaultImage = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isProvider, isAdmin } = useAuth();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await packageService.getPackageById(id);
        setPkg(data);
      } catch (err) {
        setError('Could not retrieve package details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading itinerary details...</p>
        </div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="page-container">
        <div className="alert alert-error">{error || 'Package not found.'}</div>
        <Link to="/packages" className="btn btn-outline">
          &larr; Back to Packages
        </Link>
      </div>
    );
  }

  const name = pkg.name || pkg.title || pkg.packageName || 'Scenic Package';
  const destination = pkg.destination || pkg.location || 'Exciting Destination';
  const destinations = pkg.destinations || [];
  const description = pkg.description || 'Enjoy a curated tour with guided activities and luxury stays.';
  const price = pkg.price || pkg.cost || 499;
  const seats = pkg.availableSeats !== undefined ? pkg.availableSeats : (pkg.seats || pkg.availableSlots || 10);
  const imageUrl = pkg.imageUrl || pkg.image || defaultImage;
  const duration = pkg.duration || '5 Days / 4 Nights';

  return (
    <div className="page-container">
      <Link to="/packages" style={{ display: 'inline-block', marginBottom: '20px', fontWeight: 600 }}>
        &larr; Back to Package Directory
      </Link>

      <div className="details-container">
        {/* Main Details */}
        <div className="details-main-card">
          <img
            src={imageUrl}
            alt={name}
            className="details-image"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
          <div className="details-content">
            {/* Multi-destinations Badges */}
            {destinations.length > 0 ? (
              <div className="destinations-tag-list" style={{ marginBottom: '14px' }}>
                {destinations.map((d, i) => (
                  <span key={i} className="destination-tag" style={{ fontSize: '0.85rem', padding: '4px 10px' }}>
                    📍 {typeof d === 'string' ? d : `${d.city}, ${d.country}`}
                  </span>
                ))}
              </div>
            ) : (
              <div className="package-card-destination" style={{ fontSize: '1rem', color: '#0d9488', marginBottom: '10px' }}>
                📍 {destination}
              </div>
            )}

            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px', color: '#0f172a' }}>
              {name}
            </h1>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <span className="user-badge" style={{ fontSize: '0.9rem', backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                ⏱️ {duration}
              </span>
              <span className="user-badge" style={{ fontSize: '0.9rem', backgroundColor: '#ccfbf1', color: '#0d9488' }}>
                💺 {seats} Available Seats
              </span>
              <span className="user-badge" style={{ fontSize: '0.9rem', backgroundColor: '#f1f5f9', color: '#475569' }}>
                🛡️ Verified Provider
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: '#0f172a' }}>
              Tour Overview & Itinerary Highlights
            </h3>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', whiteSpace: 'pre-line', marginBottom: '28px' }}>
              {description}
            </p>

            <div style={{ padding: '24px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ marginBottom: '12px', color: '#0f172a' }}>✨ Included in this VoyageCraft Tour:</h4>
              <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: '1.8' }}>
                <li>Multi-destination transfers and scenic rail/coach transport</li>
                <li>Premium boutique hotel & resort accommodation</li>
                <li>Certified multilingual local tour guides</li>
                <li>Daily breakfast and signature welcome dinner</li>
                <li>Dedicated 24/7 VoyageCraft travel support & assistance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Side Booking Summary Card */}
        <div className="details-side-card">
          <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', color: '#0f172a' }}>Reservation Details</h3>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 600 }}>
              Price per traveler
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0284c7' }}>${price}</div>
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#475569' }}>
              <span>Destinations</span>
              <strong>{destination}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#475569' }}>
              <span>Availability</span>
              <strong style={{ color: seats > 0 ? '#10b981' : '#ef4444' }}>
                {seats > 0 ? `${seats} Seats Open` : 'Sold Out'}
              </strong>
            </div>
          </div>

          {isProvider ? (
            <Link to={`/provider/edit-package/${id}`} className="btn btn-teal btn-lg btn-block">
              Edit this Package
            </Link>
          ) : (
            <button
              onClick={() => navigate(`/booking/${id}`)}
              className="btn btn-primary btn-lg btn-block"
              disabled={seats <= 0}
            >
              {seats > 0 ? 'Reserve & Book Now' : 'Currently Unavailable'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
