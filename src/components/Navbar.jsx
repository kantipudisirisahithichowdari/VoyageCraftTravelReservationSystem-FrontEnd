import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, role, isAuthenticated, isAdmin, isProvider, isTraveler, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const getRoleColor = () => {
    if (isAdmin) return '#ef4444';
    if (isProvider) return '#0d9488';
    return '#0284c7';
  };

  const getRoleEmoji = () => {
    if (isAdmin) return '🛡️';
    if (isProvider) return '🏨';
    return '✈️';
  };

  const getDashboardPath = () => {
    if (isAdmin) return '/admin/dashboard';
    if (isProvider) return '/provider/dashboard';
    return '/traveler/dashboard';
  };

  const userInitial = (user?.name || user?.email || 'U')[0].toUpperCase();

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to={isAuthenticated ? getDashboardPath() : '/'} className="nav-brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.5 19h19v2h-19v-2zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.42a.998.998 0 0 0-1.39.06l-.94.97c-.36.37-.39.95-.08 1.36L8.85 10l-4.5 1.2-1.74-1.32a.998.998 0 0 0-1.27.05l-.64.59c-.35.32-.4.85-.11 1.23l2.4 3.19c.47.63 1.23.99 2.03.96l14.47-3.87c.8-.21 1.28-1.04 1.08-1.39z" />
          </svg>
          Voyage<span>Craft</span>
        </Link>

        {/* Dynamic Navigation Links */}
        <nav>
          <ul className="nav-links">
            {/* Public Links */}
            {!isAuthenticated && (
              <>
                <li>
                  <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/packages" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Packages
                  </NavLink>
                </li>
              </>
            )}

            {/* Traveler Links */}
            {isAuthenticated && isTraveler && (
              <>
                <li>
                  <NavLink to="/traveler/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/packages" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Explore Packages
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-bookings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    My Bookings
                  </NavLink>
                </li>
              </>
            )}

            {/* Provider Links */}
            {isAuthenticated && isProvider && (
              <>
                <li>
                  <NavLink to="/provider/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/provider/my-packages" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    My Packages
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/provider/add-package" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    + Add Package
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Links */}
            {isAuthenticated && isAdmin && (
              <>
                <li>
                  <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/manage-users" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/manage-packages" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Packages
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/manage-bookings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Bookings
                  </NavLink>
                </li>
              </>
            )}

            {/* User session — avatar dropdown (replaces redundant badge + text link) */}
            {isAuthenticated ? (
              <li className="nav-user" ref={dropdownRef}>
                <button
                  id="nav-user-avatar-btn"
                  className="nav-avatar-btn"
                  onClick={() => setDropdownOpen((o) => !o)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  title="Account menu"
                >
                  <span
                    className="nav-avatar"
                    style={{ background: getRoleColor() }}
                  >
                    {userInitial}
                  </span>
                  <span className="nav-avatar-name">
                    {user?.name?.split(' ')[0] || 'Account'}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{
                      transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s',
                      color: '#94a3b8',
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="nav-dropdown" role="menu">
                    {/* User info header */}
                    <div className="nav-dropdown-header">
                      <span
                        className="nav-avatar nav-avatar-lg"
                        style={{ background: getRoleColor() }}
                      >
                        {userInitial}
                      </span>
                      <div>
                        <div className="nav-dropdown-name">
                          {user?.name || 'User'}
                        </div>
                        <div className="nav-dropdown-role">
                          {getRoleEmoji()} {role}
                        </div>
                      </div>
                    </div>
                    <div className="nav-dropdown-divider" />
                    <Link
                      to="/profile"
                      className="nav-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                      role="menuitem"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                      My Profile
                    </Link>
                    <Link
                      to={getDashboardPath()}
                      className="nav-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                      role="menuitem"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                      Dashboard
                    </Link>
                    <div className="nav-dropdown-divider" />
                    <button
                      className="nav-dropdown-item nav-dropdown-danger"
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <li className="nav-user">
                <Link to="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
