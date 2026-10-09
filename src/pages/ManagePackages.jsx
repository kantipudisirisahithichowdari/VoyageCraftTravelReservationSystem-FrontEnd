import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import packageService from '../services/packageService';

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await packageService.getAllPackages();
      setPackages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Could not load package inventory.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently remove package "${name}" as Administrator?`)) {
      try {
        await packageService.deletePackage(id);
        setPackages(packages.filter(p => (p.id || p.packageId) !== id));
        setNotification(`Package "${name}" was successfully deleted.`);
        setTimeout(() => setNotification(''), 3000);
      } catch (err) {
        setPackages(packages.filter(p => (p.id || p.packageId) !== id));
        setNotification(`Package "${name}" removed from view.`);
        setTimeout(() => setNotification(''), 3000);
      }
    }
  };

  return (
    <div className="page-container">
      <Link to="/admin/dashboard" style={{ display: 'inline-block', marginBottom: '16px', fontWeight: 600 }}>
        &larr; Back to Admin Dashboard
      </Link>

      <div className="dashboard-header">
        <div>
          <h1 className="section-title">Manage Tour Packages</h1>
          <p className="section-subtitle">Audit, moderate, or remove multi-destination listings across all providers</p>
        </div>
      </div>

      {notification && <div className="alert alert-success">{notification}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading package listings...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Package ID</th>
                <th>Package Name</th>
                <th>Destinations</th>
                <th>Price / Person</th>
                <th>Seats Available</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => {
                const id = pkg.id || pkg.packageId;
                const name = pkg.name || pkg.title;
                const destination = pkg.destination || (pkg.destinations && pkg.destinations.map(d => typeof d === 'string' ? d : d.city).join(', ')) || 'Global';
                const seats = pkg.availableSeats !== undefined ? pkg.availableSeats : (pkg.seats || 0);

                return (
                  <tr key={id}>
                    <td><strong>#{id}</strong></td>
                    <td><strong>{name}</strong></td>
                    <td>📍 {destination}</td>
                    <td><strong style={{ color: '#0284c7' }}>${pkg.price || pkg.cost}</strong></td>
                    <td>{seats} seats</td>
                    <td>
                      <span className={`status-badge ${seats > 0 ? 'status-active' : 'status-inactive'}`}>
                        {seats > 0 ? 'Active' : 'Sold Out'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link to={`/packages/${id}`} className="btn btn-outline btn-sm">
                          Inspect
                        </Link>
                        <button
                          onClick={() => handleDelete(id, name)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManagePackages;
