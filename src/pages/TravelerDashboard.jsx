import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import packageService from '../services/packageService';
import bookingService from '../services/bookingService';
import PackageCard from '../components/PackageCard';

// ── Skeleton card for loading state ────────────────────────────
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-img shimmer" />
    <div className="skeleton-body">
      <div className="skeleton-line skeleton-line-short shimmer" />
      <div className="skeleton-line shimmer" />
      <div className="skeleton-line shimmer" />
      <div className="skeleton-line skeleton-line-med shimmer" />
    </div>
  </div>
);

// ── Booking status chip color helper ───────────────────────────
const statusStyle = (status) => {
  const s = (status || '').toUpperCase();
  if (['CONFIRMED', 'PAID'].includes(s)) return 'status-confirmed';
  if (s === 'CANCELLED') return 'status-cancelled';
  return 'status-pending';
};

const HERO_BADGES = [
  { emoji: '🌏', label: 'Bali' },
  { emoji: '🗼', label: 'Paris' },
  { emoji: '🏔️', label: 'Swiss Alps' },
  { emoji: '🏝️', label: 'Maldives' },
  { emoji: '🌸', label: 'Kyoto' },
];

const TravelerDashboard = () => {
  const { user } = useAuth();
  const navigate  = useNavigate();

  const [packages,  setPackages]  = useState([]);
  const [bookings,  setBookings]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState('');
  const [duration,  setDuration]  = useState('all');
  const [destSearch, setDestSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const pkgs = await packageService.getAllPackages();
        setPackages(pkgs.slice(0, 6));
        try {
          const bkgs = await bookingService.getMyBookings(user?.id || user?.email);
          setBookings(Array.isArray(bkgs) ? bkgs.slice(0, 3) : []);
        } catch (_) {}
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const confirmedCount = bookings.filter(b => ['CONFIRMED','PAID'].includes((b.status||'').toUpperCase())).length;
  const pendingCount   = bookings.filter(b => (b.status||'').toUpperCase() === 'PENDING').length;
  const cancelledCount = bookings.filter(b => (b.status||'').toUpperCase() === 'CANCELLED').length;
  const pastTrips      = confirmedCount + cancelledCount;
  const totalSpent     = bookings.reduce((s, b) => s + (b.totalPrice || 0), 0);

  // Package filter
  const filtered = packages.filter(pkg => {
    const q = search.toLowerCase();
    const matchQ = !q || pkg.name?.toLowerCase().includes(q) || pkg.destination?.toLowerCase().includes(q);
    const d = pkg.duration || '';
    const matchD =
      duration === 'all' ||
      (duration === 'short'  && /[34] day/i.test(d)) ||
      (duration === 'medium' && /[56] day/i.test(d)) ||
      (duration === 'long'   && /[789]|10|11|12/i.test(d));
    return matchQ && matchD;
  });

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (destSearch.trim()) setSearch(destSearch.trim());
    // scroll to packages section
    document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page-enter" style={{ paddingBottom: '60px' }}>

      {/* ── Hero search widget ──────────────────────────────────── */}
      <div className="dash-hero">
        {/* Animated background orbs */}
        <div className="dash-hero-orb dash-hero-orb-1" />
        <div className="dash-hero-orb dash-hero-orb-2" />
        <div className="dash-hero-orb dash-hero-orb-3" />

        <div className="dash-hero-content">
          <div className="dash-hero-pill">✈️ VoyageCraft Dashboard</div>
          <h1 className="dash-hero-title">
            Where to next, <span>{user?.name?.split(' ')[0] || 'Traveler'}</span>?
          </h1>
          <p className="dash-hero-sub">
            Search from 120+ handpicked packages across 50+ countries
          </p>

          {/* Floating trending destination badges */}
          <div className="dash-hero-badges">
            {HERO_BADGES.map((b) => (
              <span key={b.label} className="dash-hero-badge" onClick={() => { setDestSearch(b.label); setSearch(b.label); }}>
                {b.emoji} {b.label}
              </span>
            ))}
          </div>

          <form className="dash-hero-search" onSubmit={handleHeroSearch}>
            <div className="dash-hero-search-field">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                id="hero-destination-input"
                type="text"
                placeholder="Destination, country or package name…"
                value={destSearch}
                onChange={(e) => setDestSearch(e.target.value)}
              />
            </div>
            <div className="dash-hero-search-field dash-hero-search-field-sm">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <input type="text" placeholder="Travel dates" />
            </div>
            <div className="dash-hero-search-field dash-hero-search-field-sm">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <input type="text" placeholder="Guests" defaultValue="2" />
            </div>
            <button id="hero-search-btn" type="submit" className="btn btn-primary dash-hero-btn">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="page-container">
        {/* ── Stat cards ────────────────────────────────────────── */}
        <div className="dash-stats-grid">
          {[
            {
              icon: '🧳', label: 'Active Bookings',
              value: bookings.length,
              sub: `${confirmedCount} confirmed · ${pendingCount} pending`,
              color: 'var(--sky-blue)', bg: 'var(--sky-blue-light)',
              trend: '+2 this month', up: true,
            },
            {
              icon: '✈️', label: 'Past Trips',
              value: pastTrips,
              sub: 'Journeys completed',
              color: '#10b981', bg: '#ecfdf5',
              trend: pastTrips > 0 ? `${pastTrips} completed` : 'Plan your first!', up: true,
            },
            {
              icon: '💳', label: 'Total Spent',
              value: `$${totalSpent.toLocaleString()}`,
              sub: 'Across all bookings',
              color: '#8b5cf6', bg: '#f5f3ff',
              trend: 'Avg $' + Math.round(totalSpent / Math.max(bookings.length, 1)), up: false,
            },
            {
              icon: '🔖', label: 'Loyalty Points',
              value: '1,840',
              sub: '⬆ 240 pts this trip',
              color: '#f59e0b', bg: '#fffbeb',
              trend: 'Gold tier status', up: true,
            },
          ].map((s) => (
            <div key={s.label} className="dash-stat-card" style={{ '--stat-color': s.color }}>
              <div className="dash-stat-top">
                <span className="dash-stat-icon" style={{ background: s.bg, color: s.color }}>
                  {s.icon}
                </span>
                <span className={`dash-stat-trend ${s.up ? 'trend-up' : 'trend-neutral'}`}>
                  {s.up ? '↑' : '→'} {s.trend}
                </span>
              </div>
              <div className="dash-stat-value animate-in" style={{ color: s.color }}>{s.value}</div>
              <div className="dash-stat-label">{s.label}</div>
              <div className="dash-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Recent Bookings ──────────────────────────────────── */}
        {bookings.length > 0 && (
          <section className="dashboard-section">
            <div className="section-row" style={{ marginBottom: '20px' }}>
              <div>
                <h2 className="section-heading">Your Recent Bookings</h2>
                <p className="section-subheading">Your latest reservations at a glance</p>
              </div>
              <Link to="/my-bookings" className="section-view-all">View All →</Link>
            </div>

            <div className="booking-card-grid">
              {bookings.map((b) => {
                const s = (b.status || '').toUpperCase();
                const upcoming   = s === 'CONFIRMED' || s === 'PAID';
                const label      = upcoming ? 'Upcoming' : s === 'PENDING' ? 'Awaiting Payment' : s;
                return (
                  <div key={b.id} className="booking-summary-card">
                    {b.imageUrl && (
                      <div className="booking-summary-img-wrap">
                        <img src={b.imageUrl} alt={b.packageName} className="booking-summary-img" />
                        <span className={`status-badge ${statusStyle(b.status)} booking-summary-badge`}>
                          {label}
                        </span>
                      </div>
                    )}
                    <div className="booking-summary-body">
                      <div className="booking-summary-name">{b.packageName}</div>
                      <div className="booking-summary-dest">📍 {b.destination}</div>
                      <div className="booking-summary-meta">
                        <span>👤 {b.numTravelers} traveler(s)</span>
                        <span style={{ color: 'var(--sky-blue)', fontWeight: 700 }}>
                          ${b.totalPrice}
                        </span>
                      </div>
                      <div className="booking-summary-actions">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => navigate(`/booking/${b.packageId}`)}
                          style={{ flex: 1 }}
                        >
                          View Itinerary
                        </button>
                        <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                          Download Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Featured Packages ─────────────────────────────────── */}
        <section className="dashboard-section" id="featured-section">
          <div className="section-row" style={{ marginBottom: '16px' }}>
            <div>
              <h2 className="section-heading">Featured Destinations for You</h2>
              <p className="section-subheading">
                Popular itineraries handpicked by our travel experts
              </p>
            </div>
            <Link to="/packages" className="btn btn-outline btn-sm">
              Browse All ({packages.length}+)
            </Link>
          </div>

          {/* Filter bar */}
          <div className="dashboard-filter-bar">
            <div className="filter-search-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                id="dashboard-package-search"
                type="text"
                className="filter-search"
                placeholder="Search destinations…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-pills">
              {[
                { key: 'all',    label: 'All Durations' },
                { key: 'short',  label: '3–4 Days'      },
                { key: 'medium', label: '5–6 Days'      },
                { key: 'long',   label: '7+ Days'       },
              ].map((f) => (
                <button
                  key={f.key}
                  id={`filter-duration-${f.key}`}
                  className={`filter-pill${duration === f.key ? ' filter-pill-active' : ''}`}
                  onClick={() => setDuration(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="packages-grid">
              {[1,2,3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="dash-empty-state">
              <div className="dash-empty-icon">🌍</div>
              <h3 className="dash-empty-title">No packages found</h3>
              <p className="dash-empty-sub">
                No upcoming trips planned yet. Explore Packages to book your next adventure!
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => { setSearch(''); setDuration('all'); setDestSearch(''); }}
                >
                  Clear Filters
                </button>
                <Link to="/packages" className="btn btn-outline">Browse All Packages</Link>
              </div>
            </div>
          ) : (
            <div className="packages-grid">
              {filtered.map((pkg) => (
                <PackageCard key={pkg.id || pkg.packageId} pkg={pkg} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TravelerDashboard;
