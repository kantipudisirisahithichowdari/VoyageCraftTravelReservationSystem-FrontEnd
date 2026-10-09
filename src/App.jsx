import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Common Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AccessDenied from './pages/AccessDenied';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';

// Traveler Pages
import TravelerDashboard from './pages/TravelerDashboard';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import BookingConfirmation from './pages/BookingConfirmation';
import MyBookings from './pages/MyBookings';

// Provider Pages
import ProviderDashboard from './pages/ProviderDashboard';
import MyPackages from './pages/MyPackages';
import AddPackage from './pages/AddPackage';
import EditPackage from './pages/EditPackage';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import ManagePackages from './pages/ManagePackages';
import ManageBookings from './pages/ManageBookings';

function App() {
  return (
    <div className="app">
      {/* Universal Role-Aware Navbar */}
      <Navbar />

      {/* Main Content View with Protected Routes */}
      <main>
        <Routes>
          {/* Public / Common Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Authenticated User Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Traveler Routes */}
          <Route
            path="/traveler/dashboard"
            element={
              <ProtectedRoute allowedRoles={['TRAVELER']}>
                <TravelerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute allowedRoles={['TRAVELER']}>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:bookingId"
            element={
              <ProtectedRoute allowedRoles={['TRAVELER']}>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-confirmation/:bookingId"
            element={
              <ProtectedRoute allowedRoles={['TRAVELER']}>
                <BookingConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute allowedRoles={['TRAVELER']}>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* Package Provider Routes */}
          <Route
            path="/provider/dashboard"
            element={
              <ProtectedRoute allowedRoles={['PROVIDER']}>
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/my-packages"
            element={
              <ProtectedRoute allowedRoles={['PROVIDER']}>
                <MyPackages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/add-package"
            element={
              <ProtectedRoute allowedRoles={['PROVIDER']}>
                <AddPackage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/edit-package/:id"
            element={
              <ProtectedRoute allowedRoles={['PROVIDER']}>
                <EditPackage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-users"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-packages"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <ManagePackages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-bookings"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <ManageBookings />
              </ProtectedRoute>
            }
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Modern Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} VoyageCraft – Multi-Destination Travel Package & Reservation Platform.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
