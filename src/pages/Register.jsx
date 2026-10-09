import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'TRAVELER', // Default role
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const authResult = await register(formData);
      setSuccess('Account created successfully! Redirecting to your dashboard...');

      setTimeout(() => {
        const userRole = authResult.normalizedRole || formData.role;
        if (userRole === 'ADMIN') {
          navigate('/admin/dashboard');
        } else if (userRole === 'PROVIDER') {
          navigate('/provider/dashboard');
        } else {
          navigate('/traveler/dashboard');
        }
      }, 1200);
    } catch (err) {
      console.error('Registration error:', err);
      const message = err.message || 'Registration failed. Please check your information and try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 className="form-title">Create an Account</h2>
          <p className="form-subtitle">Choose your account type to get started with VoyageCraft</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="role">
              Account Type / Role
            </label>
            <select
              id="role"
              name="role"
              className="form-control form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="TRAVELER">Traveler (Browse & Book Vacations)</option>
              <option value="PROVIDER">Package Provider (Create & Manage Tours)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Name / Company Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="e.g. Sarah Jenkins or Alpine Adventures"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="e.g. user@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Minimum 4 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={loading}
          >
            {loading ? 'Registering Account...' : 'Register Account'}
          </button>
        </form>

        <div className="form-footer" style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ fontWeight: 600 }}>Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
