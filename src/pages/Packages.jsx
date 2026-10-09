import React, { useState, useEffect } from 'react';
import PackageCard from '../components/PackageCard';
import packageService from '../services/packageService';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await packageService.getAllPackages();
      setPackages(data);
    } catch (err) {
      setError('Failed to fetch travel packages. Please check if the Package Service is running.');
    } finally {
      setLoading(false);
    }
  };

  // Filter packages by search query (matches destination or name)
  const filteredPackages = packages.filter((pkg) => {
    const destination = (pkg.destination || pkg.location || '').toLowerCase();
    const name = (pkg.name || pkg.title || '').toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    return destination.includes(query) || name.includes(query);
  });

  return (
    <div className="page-container">
      <div className="section-header">
        <h1 className="section-title">All Travel Packages</h1>
        <p className="section-subtitle">
          Find and book the perfect travel package for your next adventure
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by destination (e.g. Bali, Switzerland, Paris)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content State */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading available travel packages...</p>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>⚠️ {error}</span>
          <button onClick={fetchPackages} className="btn btn-outline-danger btn-sm" style={{ marginLeft: 'auto' }}>
            Retry
          </button>
        </div>
      ) : filteredPackages.length === 0 ? (
        <div className="empty-state">
          <p>No travel packages match your search query: "<strong>{searchQuery}</strong>".</p>
          <button onClick={() => setSearchQuery('')} className="btn btn-outline btn-sm" style={{ marginTop: '16px' }}>
            Clear Search
          </button>
        </div>
      ) : (
        <div className="packages-grid">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id || pkg.packageId} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Packages;
