import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLE_META = {
  ADMIN:    { color: '#ef4444', bg: '#fef2f2', emoji: '🛡️', label: 'Administrator' },
  PROVIDER: { color: '#8b5cf6', bg: '#f5f3ff', emoji: '🏨', label: 'Package Provider' },
  TRAVELER: { color: '#0284c7', bg: '#e0f2fe', emoji: '✈️', label: 'Traveler' },
};

const ACTIVITY_LOG = [
  { icon: '🎫', text: 'Booking #101 confirmed — Tropical Bali Getaway',  time: '2 days ago' },
  { icon: '✅', text: 'Payment processed for Swiss Alps Mountain Trek',    time: '5 days ago' },
  { icon: '🔍', text: 'Viewed Santorini Sunset Cruise & Stay',             time: '1 week ago' },
  { icon: '📋', text: 'Profile information updated',                       time: '2 weeks ago' },
];

const Profile = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const meta = ROLE_META[role] || ROLE_META.TRAVELER;
  const initial = (user?.name || 'U')[0].toUpperCase();

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name:     user?.name  || '',
    email:    user?.email || '',
    phone:    user?.phone || '+1-555-0300',
    currency: 'USD',
    language: 'English',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  // Mock travel stats per role
  const stats =
    role === 'ADMIN'
      ? [
          { label: 'Total Users',    value: '3',   icon: '👥' },
          { label: 'Total Packages', value: '6',   icon: '🗺️' },
          { label: 'Total Bookings', value: '3',   icon: '🎫' },
          { label: 'Platform Score', value: '9.8', icon: '⭐' },
        ]
      : role === 'PROVIDER'
      ? [
          { label: 'Packages Listed', value: '6',    icon: '🗺️' },
          { label: 'Total Bookings',  value: '18',   icon: '🎫' },
          { label: 'Avg Rating',      value: '4.8★', icon: '⭐' },
          { label: 'Revenue',         value: '$12K', icon: '💳' },
        ]
      : [
          { label: 'Trips Completed',   value: '2',   icon: '✈️' },
          { label: 'Countries Visited', value: '4',   icon: '🌍' },
          { label: 'Total Spent',       value: '$2.6K', icon: '💳' },
          { label: 'Loyalty Points',    value: '1,840', icon: '🔖' },
        ];

  return (
    <div className="profile-page page-enter">
      {/* ── Cover Banner ─────────────────────────────────────── */}
      <div className="profile-cover">
        <div className="profile-cover-overlay" />
        <div className="profile-cover-content">
          {/* Avatar with edit overlay */}
          <div className="profile-avatar-wrap">
            <div className="profile-avatar" style={{ background: meta.color }}>
              {initial}
            </div>
            <button className="profile-avatar-edit" title="Upload photo" aria-label="Upload profile photo">
              📷
            </button>
          </div>
          <div className="profile-cover-info">
            <div className="profile-cover-name">
              {user?.name || 'VoyageCraft User'}
              <span className="profile-verified-badge">✔ Verified</span>
            </div>
            <div className="profile-cover-role" style={{ background: meta.bg, color: meta.color }}>
              {meta.emoji} {meta.label}
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column body ──────────────────────────────────── */}
      <div className="profile-body page-container">
        {/* LEFT — Profile card + quick actions */}
        <aside className="profile-sidebar">
          {/* Contact info card */}
          <div className="profile-card">
            <div className="profile-card-header">
              <span>Contact Details</span>
              {!editing && (
                <button
                  id="profile-edit-btn"
                  className="link-btn"
                  style={{ fontSize: '0.83rem' }}
                  onClick={() => setEditing(true)}
                >
                  ✏️ Edit
                </button>
              )}
            </div>

            {saved && (
              <div className="alert alert-success" style={{ marginBottom: '16px', padding: '10px 14px', fontSize: '0.85rem' }}>
                ✅ Profile updated successfully!
              </div>
            )}

            {editing ? (
              <form onSubmit={handleSave}>
                {[
                  { key: 'name',     label: 'Full Name',          type: 'text'  },
                  { key: 'email',    label: 'Email Address',      type: 'email' },
                  { key: 'phone',    label: 'Phone Number',       type: 'tel'   },
                  { key: 'currency', label: 'Preferred Currency', type: 'text'  },
                  { key: 'language', label: 'Language',           type: 'text'  },
                ].map(({ key, label, type }) => (
                  <div className="form-group" key={key} style={{ marginBottom: '14px' }}>
                    <label className="form-label" htmlFor={`profile-${key}`} style={{ fontSize: '0.78rem', marginBottom: '4px' }}>
                      {label}
                    </label>
                    <input
                      id={`profile-${key}`}
                      name={key}
                      type={type}
                      className="form-control"
                      style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                      value={formData[key]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <button id="profile-save-btn" type="submit" className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                    Save Changes
                  </button>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditing(false)} style={{ flex: 1 }}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <dl className="profile-info-list">
                {[
                  { label: 'Full Name',          value: formData.name     },
                  { label: 'Email',              value: formData.email    },
                  { label: 'Phone',              value: formData.phone    },
                  { label: 'Currency',           value: formData.currency },
                  { label: 'Language',           value: formData.language },
                  { label: 'Member Since',       value: user?.createdAt || '2026-03-01' },
                ].map(({ label, value }) => (
                  <div key={label} className="profile-info-row">
                    <dt className="profile-info-label">{label}</dt>
                    <dd className="profile-info-value">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* Quick actions */}
          <div className="profile-card">
            <div className="profile-card-header"><span>Quick Actions</span></div>
            <div className="profile-actions-list">
              {[
                { icon: '🔒', label: 'Change Password' },
                { icon: '🔔', label: 'Notification Preferences' },
                { icon: '🔐', label: 'Two-Factor Authentication' },
                { icon: '📄', label: 'Download My Data' },
              ].map(({ icon, label }) => (
                <button key={label} className="profile-action-btn" type="button">
                  <span>{icon}</span>
                  <span>{label}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              ))}
              <button
                id="profile-logout-btn"
                className="profile-action-btn profile-action-danger"
                type="button"
                onClick={handleLogout}
              >
                <span>🚪</span>
                <span>Sign Out</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT — Stats + permissions + activity */}
        <main className="profile-main">
          {/* Travel stats grid */}
          <div className="profile-card">
            <div className="profile-card-header"><span>
              {role === 'ADMIN' ? 'Platform Overview' : role === 'PROVIDER' ? 'Provider Stats' : 'My Travel Stats'}
            </span></div>
            <div className="profile-stats-grid">
              {stats.map(({ label, value, icon }) => (
                <div key={label} className="profile-stat-tile">
                  <span className="profile-stat-icon">{icon}</span>
                  <span className="profile-stat-value">{value}</span>
                  <span className="profile-stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>


          {/* Recent activity */}
          <div className="profile-card">
            <div className="profile-card-header"><span>Recent Activity</span></div>
            <ul className="profile-activity-list">
              {ACTIVITY_LOG.map((item, i) => (
                <li key={i} className="profile-activity-item">
                  <span className="profile-activity-icon">{item.icon}</span>
                  <div className="profile-activity-text">
                    <span>{item.text}</span>
                    <span className="profile-activity-time">{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
