import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccessDenied = () => {
  const { role, isAuthenticated, isAdmin, isProvider } = useAuth();

  const getDashboardLink = () => {
    if (isAdmin) return '/admin/dashboard';
    if (isProvider) return '/provider/dashboard';
    return '/traveler/dashboard';
  };

  return (
    <div className="page-container">
      <div className="form-card" style={{ maxWidth: '560px', textAlign: 'center' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: '#fef2f2',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          margin: '0 auto 18px'
        }}>
          🚫
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
          Access Restricted
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '24px', lineHeight: '1.6' }}>
          You do not have the required permissions to view this page. This area is reserved for a different user role.
        </p>

        {isAuthenticated && (
          <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '24px', display: 'inline-block' }}>
            Current Signed-In Role: <strong>{role || 'GUEST'}</strong>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {isAuthenticated ? (
            <Link to={getDashboardLink()} className="btn btn-primary">
              Go to My Dashboard
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Sign In with Authorized Account
            </Link>
          )}
          <Link to="/" className="btn btn-outline">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
