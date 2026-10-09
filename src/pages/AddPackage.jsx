import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import packageService from '../services/packageService';

const AddPackage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    availableSeats: '',
    duration: '5 Days / 4 Nights',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  });

  // Multiple Destinations State
  const [destinations, setDestinations] = useState([
    { city: 'Rome', country: 'Italy' },
    { city: 'Florence', country: 'Italy' }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDestinationChange = (index, field, value) => {
    const updated = [...destinations];
    updated[index][field] = value;
    setDestinations(updated);
  };

  const addDestinationRow = () => {
    setDestinations([...destinations, { city: '', country: '' }]);
  };

  const removeDestinationRow = (index) => {
    if (destinations.length > 1) {
      setDestinations(destinations.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim() || !formData.price || !formData.availableSeats) {
      setError('Please fill in all mandatory package fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Construct destination string summary as well as structured array
      const validDestinations = destinations.filter(d => d.city.trim() && d.country.trim());
      const destinationSummary = validDestinations.map(d => `${d.city}, ${d.country}`).join(' & ') || 'Multi-City Tour';

      const payload = {
        name: formData.name,
        title: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        cost: parseFloat(formData.price),
        availableSeats: parseInt(formData.availableSeats, 10),
        seats: parseInt(formData.availableSeats, 10),
        duration: formData.duration,
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        destination: destinationSummary,
        destinations: validDestinations,
        providerId: user?.id || 1,
        providerEmail: user?.email || 'provider@voyagecraft.com',
        status: 'ACTIVE'
      };

      await packageService.createPackage(payload);
      setSuccess('Travel package created and published successfully!');

      setTimeout(() => {
        navigate('/provider/my-packages');
      }, 1500);
    } catch (err) {
      console.error('Failed to create package:', err);
      const msg = err.message || 'Failed to save package. Please check the form fields and try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Link to="/provider/dashboard" style={{ display: 'inline-block', marginBottom: '20px', fontWeight: 600 }}>
        &larr; Back to Provider Dashboard
      </Link>

      <div className="form-card" style={{ maxWidth: '700px' }}>
        <h1 className="form-title">Create Multi-Destination Package</h1>
        <p className="form-subtitle">Publish a new tour package for travelers worldwide</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Package Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="e.g. Grand Italian Heritage & Wine Tour"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Multi-Destination Itinerary (Cities & Countries) *
            </label>
            {destinations.map((dest, index) => (
              <div key={index} className="destination-row">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City (e.g. Venice)"
                  value={dest.city}
                  onChange={(e) => handleDestinationChange(index, 'city', e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country (e.g. Italy)"
                  value={dest.country}
                  onChange={(e) => handleDestinationChange(index, 'country', e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeDestinationRow(index)}
                  className="btn btn-outline-danger"
                  style={{ padding: '0', height: '42px' }}
                  disabled={destinations.length <= 1}
                  title="Remove Destination"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addDestinationRow}
              className="btn btn-outline btn-sm"
              style={{ marginTop: '6px' }}
            >
              + Add Another City/Country
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="price">
                Price per Traveler (INR) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min="1"
                step="any"
                className="form-control"
                placeholder="e.g. 799"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="availableSeats">
                Available Departure Seats *
              </label>
              <input
                type="number"
                id="availableSeats"
                name="availableSeats"
                min="1"
                className="form-control"
                placeholder="e.g. 15"
                value={formData.availableSeats}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="duration">
                Trip Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                className="form-control"
                placeholder="e.g. 6 Days / 5 Nights"
                value={formData.duration}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="imageUrl">
                Featured Cover Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                className="form-control"
                placeholder="https://images.unsplash.com/..."
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Tour Description & Highlights *
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="4"
              placeholder="Describe the landmarks, guided tours, meal inclusions, and accommodation details..."
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
            <button
              type="submit"
              className="btn btn-teal btn-lg btn-block"
              disabled={loading}
            >
              {loading ? 'Saving Package...' : 'Save & Publish Package'}
            </button>
            <Link to="/provider/dashboard" className="btn btn-outline btn-lg">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
