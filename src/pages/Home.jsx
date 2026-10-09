import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PackageCard from '../components/PackageCard';
import packageService from '../services/packageService';
import { useAuth } from '../context/AuthContext';

const DESTINATIONS = [
  { name: 'Bali',        country: 'Indonesia',  emoji: '🌴', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },
  { name: 'Santorini',   country: 'Greece',     emoji: '🏛️', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80' },
  { name: 'Kyoto',       country: 'Japan',      emoji: '🌸', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80' },
  { name: 'Swiss Alps',  country: 'Switzerland',emoji: '🏔️', img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80' },
  { name: 'Maldives',    country: 'Maldives',   emoji: '🏝️', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80' },
  { name: 'Paris',       country: 'France',     emoji: '🗼', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80' },
];

const WHY_US = [
  { icon: '🗺️', title: 'Curated Packages',    desc: 'Every itinerary is handpicked and verified for quality.' },
  { icon: '💰', title: 'Best Price Guarantee', desc: 'Find a lower price anywhere? We match it, no questions.' },
  { icon: '🛡️', title: 'Secure Booking',       desc: 'Your payment and personal data are always protected.' },
  { icon: '📞', title: '24/7 Support',          desc: 'Our travel experts are available around the clock.' },
];

const Home = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  const [packages,  setPackages]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState('');

  useEffect(() => {
    packageService.getAllPackages()
      .then((data) => setPackages(data.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getDashboardPath = () => {
    if (role === 'ADMIN')    return '/admin/dashboard';
    if (role === 'PROVIDER') return '/provider/dashboard';
    return '/traveler/dashboard';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/packages${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`);
  };

  return (
    <div className="home-page page-enter">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="home-hero">
        {/* background orbs */}
        <div className="home-hero-orb home-hero-orb-1" />
        <div className="home-hero-orb home-hero-orb-2" />

        <div className="home-hero-content">
          <h1 className="home-hero-title">
            Find your perfect<br /><span>travel escape</span>
          </h1>
          <p className="home-hero-sub">
            Discover handpicked multi-destination packages across 50+ countries.
            <br />Book in minutes. Travel with confidence.
          </p>

          {/* Search bar */}
          <form className="home-search-bar" onSubmit={handleSearch}>
            <div className="home-search-field">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="home-search-input"
              />
            </div>
            <button type="submit" className="btn btn-primary home-search-btn" id="home-search-btn">
              Search
            </button>
          </form>

          {/* Quick destination chips */}
          <div className="home-hero-chips">
            <span className="home-chip-label">Popular:</span>
            {['Bali', 'Santorini', 'Kyoto', 'Maldives', 'Swiss Alps'].map((d) => (
              <button
                key={d}
                className="home-chip"
                onClick={() => navigate(`/packages?q=${d}`)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Hero stats row */}
        <div className="home-hero-stats">
          <div className="home-hero-stat">
            <strong>120+</strong>
            <span>Destinations</span>
          </div>
          <div className="home-hero-stat-div" />
          <div className="home-hero-stat">
            <strong>50K+</strong>
            <span>Happy Travellers</span>
          </div>
          <div className="home-hero-stat-div" />
          <div className="home-hero-stat">
            <strong>4.9 ★</strong>
            <span>Average Rating</span>
          </div>
        </div>
      </section>

      {/* ── Popular Destinations ───────────────────────────────── */}
      <section className="home-section">
        <div className="home-section-head">
          <div>
            <h2 className="home-section-title">Popular Destinations</h2>
            <p className="home-section-sub">Top picks from our travellers this season</p>
          </div>
          <Link to="/packages" className="home-section-link">View all →</Link>
        </div>

        <div className="home-dest-grid">
          {DESTINATIONS.map((d) => (
            <button
              key={d.name}
              className="home-dest-card"
              onClick={() => navigate(`/packages?q=${d.name}`)}
            >
              <img src={d.img} alt={d.name} className="home-dest-img" />
              <div className="home-dest-overlay" />
              <div className="home-dest-info">
                <span className="home-dest-name">{d.emoji} {d.name}</span>
                <span className="home-dest-country">{d.country}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured Packages ──────────────────────────────────── */}
      <section className="home-section home-section-alt">
        <div className="home-section-head">
          <div>
            <h2 className="home-section-title">Featured Packages</h2>
            <p className="home-section-sub">Carefully curated trips ready for you to book</p>
          </div>
          <Link to="/packages" className="home-section-link">Browse all →</Link>
        </div>

        {loading ? (
          <div className="home-pkg-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-img shimmer" />
                <div className="skeleton-body">
                  <div className="skeleton-line skeleton-line-short shimmer" />
                  <div className="skeleton-line shimmer" />
                  <div className="skeleton-line skeleton-line-med shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="home-pkg-grid">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id || pkg.packageId} pkg={pkg} />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/packages" className="btn btn-outline btn-lg">
            See All Packages →
          </Link>
        </div>
      </section>

      {/* ── Why VoyageCraft ───────────────────────────────────── */}
      <section className="home-section">
        <div className="home-section-head" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <h2 className="home-section-title">Why travellers choose us</h2>
          <p className="home-section-sub">We make every trip feel effortless</p>
        </div>

        <div className="home-why-grid">
          {WHY_US.map((w) => (
            <div key={w.title} className="home-why-card">
              <span className="home-why-icon">{w.icon}</span>
              <h3 className="home-why-title">{w.title}</h3>
              <p className="home-why-desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      {!isAuthenticated && (
        <section className="home-cta-banner">
          <div className="home-cta-content">
            <h2 className="home-cta-title">Ready to start your journey?</h2>
            <p className="home-cta-sub">Create a free account and unlock exclusive member deals.</p>
            <div className="home-cta-actions">
              <Link to="/register" className="btn btn-primary btn-lg">Get Started — it's free</Link>
              <Link to="/packages" className="btn btn-outline btn-lg" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.08)' }}>
                Browse packages first
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
