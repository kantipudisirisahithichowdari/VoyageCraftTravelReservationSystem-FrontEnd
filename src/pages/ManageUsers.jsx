import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await authService.getUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Could not retrieve registered user profiles.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRoleBadge = (role) => {
    const r = (role || 'TRAVELER').toUpperCase();
    if (r === 'ADMIN') return <span className="role-badge role-admin">ADMIN</span>;
    if (r === 'PROVIDER' || r === 'PACKAGE_PROVIDER') return <span className="role-badge role-provider">PROVIDER</span>;
    return <span className="role-badge role-traveler">TRAVELER</span>;
  };

  return (
    <div className="page-container">
      <Link to="/admin/dashboard" style={{ display: 'inline-block', marginBottom: '16px', fontWeight: 600 }}>
        &larr; Back to Admin Dashboard
      </Link>

      <div className="dashboard-header">
        <div>
          <h1 className="section-title">Manage Registered Users</h1>
          <p className="section-subtitle">Supervise platform accounts, provider permissions, and customer profiles</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading user directory...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Role Assignment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id || u.userId || u.email}>
                  <td><strong>#{u.id || u.userId || 1}</strong></td>
                  <td>{u.name || u.username || 'User'}</td>
                  <td>{u.email}</td>
                  <td>{getRoleBadge(u.role)}</td>
                  <td>
                    <span className="status-badge status-confirmed">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
