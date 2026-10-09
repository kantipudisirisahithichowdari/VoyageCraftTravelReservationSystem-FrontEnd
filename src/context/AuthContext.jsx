import React, { createContext, useContext, useState, useEffect } from 'react';
import authService, { parseJwt, normalizeRole } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null); // 'ADMIN' | 'PROVIDER' | 'TRAVELER'
  const [loading, setLoading] = useState(true);

  // Load existing session on initial mount
  useEffect(() => {
    const savedToken = authService.getToken();
    const savedUser = authService.getUser();

    if (savedToken) {
      setToken(savedToken);
      const userRole = savedUser?.role ? normalizeRole(savedUser.role) : 'TRAVELER';
      setRole(userRole);
      setUser(savedUser || { email: 'user@voyagecraft.com', name: 'Traveler', role: userRole });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    
    // Extract token
    const receivedToken = data.token || data.jwt || data.accessToken || 'demo-jwt-token';
    
    // Extract claims from JWT if available
    const jwtClaims = parseJwt(receivedToken) || {};
    
    // Determine user role with priority: Backend response field -> JWT claims -> input fallback
    const rawRole = 
      data.role || 
      data.user?.role || 
      data.roles || 
      jwtClaims.role || 
      jwtClaims.roles || 
      jwtClaims.authorities || 
      (credentials.email.toLowerCase().includes('admin') ? 'ADMIN' : 
       credentials.email.toLowerCase().includes('provider') ? 'PROVIDER' : 'TRAVELER');
       
    const normalized = normalizeRole(rawRole);

    const receivedUser = data.user || {
      id: data.id || data.userId || jwtClaims.id || jwtClaims.sub || 1,
      email: data.email || credentials.email,
      name: data.name || data.username || credentials.email.split('@')[0],
      role: normalized,
    };

    receivedUser.role = normalized;

    setToken(receivedToken);
    setUser(receivedUser);
    setRole(normalized);
    authService.setSession(receivedToken, receivedUser);
    return { ...data, normalizedRole: normalized };
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    
    // Normalize role selected during registration
    const selectedRole = normalizeRole(userData.role || data.role || 'TRAVELER');

    if (data.token || data.jwt || data.accessToken) {
      const receivedToken = data.token || data.jwt || data.accessToken;
      const receivedUser = data.user || {
        id: data.id || data.userId || 1,
        email: userData.email,
        name: userData.name,
        role: selectedRole
      };
      receivedUser.role = selectedRole;

      setToken(receivedToken);
      setUser(receivedUser);
      setRole(selectedRole);
      authService.setSession(receivedToken, receivedUser);
    }
    return { ...data, normalizedRole: selectedRole };
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    authService.logout();
  };

  const value = {
    user,
    token,
    role,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    isAdmin: role === 'ADMIN',
    isProvider: role === 'PROVIDER',
    isTraveler: role === 'TRAVELER',
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
