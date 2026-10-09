import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const defaultImage =
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';

// Deterministic mock rating seeded from package id so it looks stable
const mockRating = (id) => {
  const ratings = [4.8, 4.6, 4.9, 4.7, 4.5, 4.8];
  const reviews = [120, 84, 209, 156, 73, 191];
  const idx = (Number(id) - 1) % ratings.length;
  return { rating: ratings[idx], reviews: reviews[idx] };
};

// Seat badge color — amber for low stock, green otherwise
const getSeatBadgeStyle = (seats) => {
  if (seats <= 0) return { bg: '#fee2e2', color: '#b91c1c', dot: '#ef4444' };
  if (seats <= 5) return { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' };
  return { bg: 'rgba(255,255,255,0.95)', color: '#0f172a', dot: '#10b981' };
};

const PackageCard = ({ pkg, showActions = true }) => {
  const navigate = useNavigate();

  const id = pkg.id || pkg.packageId;
  const name = pkg.name || pkg.title || pkg.packageName || 'Scenic Getaway';
  const destination = pkg.destination || pkg.location || 'Exotic Destination';
  const destinations = pkg.destinations || [];
  const description =
    pkg.description || 'Explore scenic views, landmarks, and rich cultures.';
  const price = pkg.price || pkg.cost || 499;
  const originalPrice = pkg.originalPrice || null; // for strikethrough
  const seats =
    pkg.availableSeats !== undefined
      ? pkg.availableSeats
      : pkg.seats ?? pkg.availableSlots ?? 10;
  const imageUrl = pkg.imageUrl || pkg.image || defaultImage;
  const duration = pkg.duration || '5 Days / 4 Nights';
  const { rating, reviews } = mockRating(id);

  const badgeStyle = getSeatBadgeStyle(seats);

  // Build single-line destination string from array
  const destinationLine =
    destinations.length > 0
      ? destinations
          .map((d) => (typeof d === 'string' ? d : d.city))
          .join(' • ')
      : destination;

  return (
    <div className="package-card">
      {/* ── Image wrapper ──────────────────────────────────────── */}
      <div className="package-card-img-wrapper">
        <img
          src={imageUrl}
          alt={name}
          className="package-card-img"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />

        {/* Seat availability badge */}
        <span
          className="package-card-badge"
          style={{
            background: badgeStyle.bg,
            color: badgeStyle.color,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: badgeStyle.dot,
              marginRight: 5,
              verticalAlign: 'middle',
            }}
          />
          {seats <= 0 ? 'Sold Out' : `${seats} seats left`}
        </span>

        {/* Duration pill on image */}
        <span className="package-card-duration-pill">⏱ {duration}</span>
      </div>

      {/* ── Card body ──────────────────────────────────────────── */}
      <div className="package-card-body">
        {/* Single-line destination row */}
        <div className="package-card-dest-row">
          <span className="package-card-dest-icon">📍</span>
          <span className="package-card-dest-text" title={destinationLine}>
            {destinationLine}
          </span>
        </div>

        {/* Title */}
        <h3 className="package-card-title">{name}</h3>

        {/* Star rating */}
        <div className="package-card-rating">
          <span className="package-card-stars">
            {'★'.repeat(Math.floor(rating))}
            {rating % 1 >= 0.5 ? '½' : ''}
          </span>
          <span className="package-card-rating-val">{rating}</span>
          <span className="package-card-rating-count">({reviews} reviews)</span>
        </div>

        {/* Description — clamped to 2 lines */}
        <p className="package-card-desc">{description}</p>

        {/* Price + actions row */}
        <div className="package-card-footer">
          <div className="package-card-price-block">
            <span className="package-price-label">From / person</span>
            <div className="package-price-row">
              {originalPrice && (
                <span className="package-price-original">${originalPrice}</span>
              )}
              <span className="package-price-val">${price}</span>
            </div>
          </div>

          {showActions && (
            <div className="package-card-actions">
              <Link
                to={`/packages/${id}`}
                className="btn btn-outline-primary btn-sm"
              >
                Details
              </Link>
              <button
                onClick={() => navigate(`/booking/${id}`)}
                className="btn btn-primary btn-sm package-btn-book"
                disabled={seats <= 0}
              >
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
