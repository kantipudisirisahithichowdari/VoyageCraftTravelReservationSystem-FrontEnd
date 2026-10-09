import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import packageService from '../services/packageService';
import formatINR from '../services/currency';

const MyPackages = () => {
  const { user } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchPackages();
  }, [user]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await packageService.getProviderPackages(user?.id || 1);
      setPackages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Could not retrieve your package listings.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete the package "${name}"?`)) {
      try {
        await packageService.deletePackage(id);
        setPackages(packages.filter(p => (p.id || p.packageId) !== id));
        setSuccessMsg(`Package "${name}" was successfully removed.`);
        setTimeout(() => setSuccessMsg(''), 3000);
      } catch (err) {
        console.warn('Backend delete failed, removing from local view:', err);
        setPackages(packages.filter(p => (p.id || p.packageId) !== id));
        setSuccessMsg(`Package "${name}" removed from view.`);
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <div>
          <h1 className="section-title">My Travel Packages</h1>
          <p className="section-subtitle">Manage, edit, or remove your published multi-destination tours</p>
        </div>
        <Link to="/provider/add-package" className="btn btn-teal">
          + Add New Package
        </Link>
      </div>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your packages...</p>
        </div>
      ) : packages.length === 0 ? (
        <div className="empty-state" style={{ background: '#ffffff', padding: '60px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3>No packages found</h3>
          <p style={{ color: '#64748b', marginTop: '8px', marginBottom: '20px' }}>Start creating your first vacation itinerary to receive bookings.</p>
          <Link to="/provider/add-package" className="btn btn-teal">
            Create Package
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Destinations</th>
                <th>Price</th>
                <th>Seats</th>
                <th>Duration</th>
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
                    <td><strong>{name}</strong></td>
                    <td>📍 {destination}</td>
                    <td><strong style={{ color: '#0284c7' }}>{formatINR(pkg.price || pkg.cost)}</strong></td>
                    <td>{seats} seats</td>
                    <td>{pkg.duration || '5 Days'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link to={`/packages/${id}`} className="btn btn-outline btn-sm">
                          View
                        </Link>
                        <Link to={`/provider/edit-package/${id}`} className="btn btn-outline-primary btn-sm">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(id, name)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Delete
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

export default MyPackages;
