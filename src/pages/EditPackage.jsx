import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import packageService from '../services/packageService';

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    availableSeats: '',
    duration: '',
    imageUrl: '',
    destination: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        const data = await packageService.getPackageById(id);
        setFormData({
          name: data.name || data.title || '',
          description: data.description || '',
          price: data.price || data.cost || '',
          availableSeats: data.availableSeats !== undefined ? data.availableSeats : (data.seats || 10),
          duration: data.duration || '5 Days / 4 Nights',
          imageUrl: data.imageUrl || data.image || '',
          destination: data.destination || '',
        });
      } catch (err) {
        setError('Failed to retrieve package information.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError('');

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        cost: parseFloat(formData.price),
        availableSeats: parseInt(formData.availableSeats, 10),
        seats: parseInt(formData.availableSeats, 10),
      };

      await packageService.updatePackage(id, payload);
      setSuccess('Package updated successfully!');

      setTimeout(() => {
        navigate('/provider/my-packages');
      }, 1200);
    } catch (err) {
      console.error('Failed to update package:', err);
      setError(err.message || 'Could not update package. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading package details for editing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/provider/my-packages" style={{ display: 'inline-block', marginBottom: '20px', fontWeight: 600 }}>
        &larr; Back to My Packages
      </Link>

      <div className="form-card" style={{ maxWidth: '650px' }}>
        <h1 className="form-title">Edit Package Details</h1>
        <p className="form-subtitle">Update pricing, seats, and itinerary details for Package #{id}</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Package Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="destination">
              Destinations
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              className="form-control"
              value={formData.destination}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="price">
                Price (INR)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min="1"
                className="form-control"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="availableSeats">
                Available Seats
              </label>
              <input
                type="number"
                id="availableSeats"
                name="availableSeats"
                min="0"
                className="form-control"
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
                value={formData.duration}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="imageUrl">
                Cover Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                className="form-control"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              type="submit"
              className="btn btn-teal btn-lg btn-block"
              disabled={saving}
            >
              {saving ? 'Updating...' : 'Save Changes'}
            </button>
            <Link to="/provider/my-packages" className="btn btn-outline btn-lg">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPackage;
