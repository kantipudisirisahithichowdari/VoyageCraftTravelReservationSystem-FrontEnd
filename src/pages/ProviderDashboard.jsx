import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import packageService from '../services/packageService';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        setLoading(true);
        const data = await packageService.getProviderPackages(user?.id || 1);
        setPackages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.warn('Could not load provider packages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderData();
  }, [user]);

  const totalPackages = packages.length;
  const totalSeats = packages.reduce((acc, p) => acc + (p.availableSeats || p.seats || 0), 0);
  const activeListings = packages.filter(p => (p.availableSeats || p.seats || 0) > 0).length;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Provider Portal: {user?.name || 'Package Provider'} 🏨
          </h1>
          <p className="dashboard-subtitle">
            Manage your travel itineraries, monitor available seats, and publish new multi-destination tour packages.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/provider/add-package" className="btn btn-teal">
            + Add New Package
          </Link>
          <Link to="/provider/my-packages" className="btn btn-outline">
            View All Packages
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon-teal">📦</div>
          <div className="stat-info">
            <span className="stat-label">Total Packages</span>
            <span className="stat-value">{totalPackages}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-blue">🟢</div>
          <div className="stat-info">
            <span className="stat-label">Active Listings</span>
            <span className="stat-value">{activeListings}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-amber">💺</div>
          <div className="stat-info">
            <span className="stat-label">Available Seats</span>
            <span className="stat-value">{totalSeats}</span>
          </div>
        </div>
      </div>

      {/* Recent Packages Table */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>
            Recently Listed Tour Packages
          </h2>
          <Link to="/provider/add-package" className="btn btn-sm btn-teal">
            + Create Tour
          </Link>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your packages...</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="empty-state" style={{ backgroundColor: '#ffffff', padding: '50px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ marginBottom: '16px', fontSize: '1.1rem' }}>You have not created any travel packages yet.</p>
            <Link to="/provider/add-package" className="btn btn-teal">
              Create Your First Package
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Package Name</th>
                  <th>Destination / Itinerary</th>
                  <th>Price / Person</th>
                  <th>Available Seats</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.slice(0, 5).map((pkg) => {
                  const id = pkg.id || pkg.packageId;
                  const seats = pkg.availableSeats !== undefined ? pkg.availableSeats : (pkg.seats || 0);
                  return (
                    <tr key={id}>
                      <td>
                        <strong>{pkg.name || pkg.title}</strong>
                      </td>
                      <td>
                        📍 {pkg.destination || (pkg.destinations && pkg.destinations.map(d => typeof d === 'string' ? d : d.city).join(', ')) || 'Multiple Cities'}
                      </td>
                      <td>
                        <strong style={{ color: '#0284c7' }}>${pkg.price || pkg.cost}</strong>
                      </td>
                      <td>{seats} seats</td>
                      <td>
                        <span className={`status-badge ${seats > 0 ? 'status-active' : 'status-inactive'}`}>
                          {seats > 0 ? 'Active' : 'Sold Out'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Link to={`/packages/${id}`} className="btn btn-outline btn-sm">
                            View
                          </Link>
                          <Link to={`/provider/edit-package/${id}`} className="btn btn-outline-primary btn-sm">
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProviderDashboard;
