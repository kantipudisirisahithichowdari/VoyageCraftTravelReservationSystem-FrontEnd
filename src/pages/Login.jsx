import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DEMO_ACCOUNTS = [
  { label: 'Admin',    emoji: '🛡️', email: 'admin@voyagecraft.com',    password: 'admin123',    color: '#ef4444' },
  { label: 'Provider', emoji: '🏨', email: 'provider@voyagecraft.com', password: 'provider123', color: '#8b5cf6' },
  { label: 'Traveler', emoji: '✈️', email: 'traveler@voyagecraft.com', password: 'traveler123', color: '#0ea5e9' },
];

// Rotating testimonials shown on the right panel
const TESTIMONIALS = [
  { quote: 'VoyageCraft made planning our Europe trip effortless. Booked 3 countries in 10 minutes!', author: 'Priya S.', location: 'Mumbai, India' },
  { quote: 'The best travel platform I\'ve used. Seamless booking from Bali to Switzerland.', author: 'James K.', location: 'London, UK' },
  { quote: 'Absolutely loved the multi-destination packages. Our Kyoto trip was perfect.', author: 'Yuki T.', location: 'Tokyo, Japan' },
];

const Login = () => {
  const [formData, setFormData]       = useState({ email: '', password: '' });
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [testimonialAnimate, setTestimonialAnimate] = useState(false);

  // Auto-rotate testimonials every 4 s
  const nextTestimonial = useCallback(() => {
    setTestimonialAnimate(true);
    setTimeout(() => {
      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
      setTestimonialAnimate(false);
    }, 350);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 4000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  const { login }    = useAuth();
  const navigate     = useNavigate();
  const location     = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const fillDemo = (account) => {
    setFormData({ email: account.email, password: account.password });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const authResult = await login(formData);
      const fromPath = location.state?.from?.pathname;
      if (fromPath && fromPath !== '/' && fromPath !== '/login' && fromPath !== '/register') {
        navigate(fromPath, { replace: true });
        return;
      }
      const userRole = authResult.normalizedRole || 'TRAVELER';
      if (userRole === 'ADMIN')         navigate('/admin/dashboard',    { replace: true });
      else if (userRole === 'PROVIDER') navigate('/provider/dashboard', { replace: true });
      else                              navigate('/traveler/dashboard',  { replace: true });
    } catch (err) {
      let message = 'Login failed. Please check your credentials.';
      if (err.response?.data?.message) message = err.response.data.message;
      else if (err.message)            message = err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const t = TESTIMONIALS[testimonialIdx];

  return (
    <div className="login-split">
      {/* ─────────────────────── LEFT — Form Panel ──────────────────────── */}
      <div className="login-form-panel">
        <div className="login-form-inner">
          {/* Brand */}
          <div className="login-brand">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--teal)">
              <path d="M2.5 19h19v2h-19v-2zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.42a.998.998 0 0 0-1.39.06l-.94.97c-.36.37-.39.95-.08 1.36L8.85 10l-4.5 1.2-1.74-1.32a.998.998 0 0 0-1.27.05l-.64.59c-.35.32-.4.85-.11 1.23l2.4 3.19c.47.63 1.23.99 2.03.96l14.47-3.87c.8-.21 1.28-1.04 1.08-1.39z"/>
            </svg>
            <span>Voyage<strong>Craft</strong></span>
          </div>

          <h1 className="login-heading">Welcome back</h1>
          <p className="login-subheading">Sign in to plan your next adventure</p>

          {/* Demo accounts */}
          <div className="login-demo-box">
            <span className="login-demo-label">🎭 Demo Mode — click to auto-fill</span>
            <div className="login-demo-pills">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.label}
                  type="button"
                  className="login-demo-pill"
                  style={{ '--acc-color': acc.color }}
                  onClick={() => fillDemo(acc)}
                >
                  <span className="login-demo-emoji">{acc.emoji}</span>
                  <span>
                    <span className="login-demo-role" style={{ color: acc.color }}>{acc.label}</span>
                    <span className="login-demo-pw">{acc.password}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="alert alert-error" style={{ marginBottom: '16px' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ marginTop: '4px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email Address</label>
              <div className="input-icon-wrap">
                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  className="form-control input-with-icon"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" htmlFor="login-password" style={{ marginBottom: 0 }}>Password</label>
                <button type="button" className="link-btn" style={{ fontSize: '0.82rem' }}>Forgot password?</button>
              </div>
              <div className="input-icon-wrap">
                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  name="password"
                  className="form-control input-with-icon input-with-icon-right"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            <div className="login-remember">
              <label className="login-checkbox-label">
                <input type="checkbox" id="login-remember" />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              id="login-submit-btn"
              className="btn btn-primary btn-block btn-lg login-cta"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </>
              )}
            </button>
          </form>

          <p className="login-footer-text">
            Don't have an account?{' '}
            <Link to="/register" style={{ fontWeight: 700 }}>Create one free</Link>
          </p>
        </div>
      </div>

      {/* ─────────────────────── RIGHT — Hero Showcase ──────────────────── */}
      <div className="login-hero-panel">
        <div className="login-hero-overlay" />
        {/* Animated blur orbs */}
        <div className="login-hero-orb login-hero-orb-1" />
        <div className="login-hero-orb login-hero-orb-2" />

        {/* Floating stats */}
        <div className="login-hero-stats">
          <div className="login-hero-stat">
            <span className="login-hero-stat-val">50K+</span>
            <span className="login-hero-stat-lbl">Happy Travelers</span>
          </div>
          <div className="login-hero-stat-divider" />
          <div className="login-hero-stat">
            <span className="login-hero-stat-val">120+</span>
            <span className="login-hero-stat-lbl">Destinations</span>
          </div>
          <div className="login-hero-stat-divider" />
          <div className="login-hero-stat">
            <span className="login-hero-stat-val">4.9★</span>
            <span className="login-hero-stat-lbl">Avg. Rating</span>
          </div>
        </div>

        {/* Testimonial card */}
        <div className={`login-testimonial-card${testimonialAnimate ? ' fade-exit' : ' fade-enter'}`}>
          <div className="login-testimonial-quote">&ldquo;</div>
          <p className="login-testimonial-text">{t.quote}</p>
          <div className="login-testimonial-author">
            <div className="login-testimonial-avatar">
              {t.author[0]}
            </div>
            <div>
              <div className="login-testimonial-name">{t.author}</div>
              <div className="login-testimonial-loc">📍 {t.location}</div>
            </div>
          </div>
          <div className="login-testimonial-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`login-dot${i === testimonialIdx ? ' login-dot-active' : ''}`}
                onClick={() => { setTestimonialAnimate(false); setTestimonialIdx(i); }}
                aria-label={`Testimonial ${i + 1}`}
              >
                {i === testimonialIdx && <span key={testimonialIdx} className="login-dot-active-progress" />}
              </button>
            ))}
          </div>
        </div>

        {/* Destination label with pulsing dot */}
        <div className="login-hero-destination">
          Santorini, Greece
        </div>
      </div>
    </div>
  );
};

export default Login;
