import {
  getStoredUsers,
  saveStoredUsers,
  delay,
} from './mockData.js';

// Helper function to decode JWT claims safely
export const parseJwt = (token) => {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

// Helper to normalize role strings
export const normalizeRole = (roleInput) => {
  if (!roleInput) return 'TRAVELER';

  let roleStr = '';
  if (typeof roleInput === 'string') {
    roleStr = roleInput.toUpperCase().trim();
  } else if (Array.isArray(roleInput) && roleInput.length > 0) {
    const first = roleInput[0];
    roleStr =
      typeof first === 'string'
        ? first.toUpperCase().trim()
        : (first?.authority || '').toUpperCase().trim();
  } else if (typeof roleInput === 'object') {
    roleStr = (
      roleInput.authority ||
      roleInput.name ||
      roleInput.role ||
      ''
    )
      .toUpperCase()
      .trim();
  }

  if (roleStr.startsWith('ROLE_')) roleStr = roleStr.substring(5);

  if (roleStr === 'ADMIN') return 'ADMIN';
  if (
    roleStr === 'PROVIDER' ||
    roleStr === 'PACKAGE_PROVIDER' ||
    roleStr === 'VENDOR'
  )
    return 'PROVIDER';
  return 'TRAVELER';
};

export const authService = {
  // ── Login ────────────────────────────────────────────────────
  login: async (credentials) => {
    await delay(300);
    const users = getStoredUsers();
    const userEmail = (credentials.email || '').trim().toLowerCase();
    const userPassword = credentials.password || '';

    const found = users.find(
      (u) =>
        u.email.toLowerCase() === userEmail &&
        (u.password === userPassword || !u.password)
    );

    if (!found) {
      throw new Error(
        'Invalid email or password. You can use the quick demo logins or register a new account.'
      );
    }

    const mockToken = `mock-token-${found.role.toLowerCase()}-${found.id}-${Date.now()}`;
    return {
      token: mockToken,
      user: found,
      role: found.role,
    };
  },

  // ── Register ─────────────────────────────────────────────────
  register: async (userData) => {
    await delay(350);
    const users = getStoredUsers();
    const userEmail = (userData.email || '').trim().toLowerCase();

    const exists = users.some((u) => u.email.toLowerCase() === userEmail);
    if (exists) {
      throw new Error(
        'An account with this email address already exists. Please log in or use a different email.'
      );
    }

    const resolvedRole = normalizeRole(userData.role || 'TRAVELER');
    const newUser = {
      id: Date.now(),
      name: userData.name || 'New Member',
      email: userData.email,
      password: userData.password || 'password123',
      role: resolvedRole,
      phone: userData.phone || '',
      createdAt: new Date().toISOString().split('T')[0],
    };

    users.push(newUser);
    saveStoredUsers(users);

    const mockToken = `mock-token-${resolvedRole.toLowerCase()}-${newUser.id}-${Date.now()}`;
    return {
      token: mockToken,
      user: newUser,
      role: resolvedRole,
    };
  },

  // ── Get all users (Admin) ────────────────────────────────────
  getUsers: async () => {
    await delay(200);
    return getStoredUsers();
  },

  // ── Delete user (Admin) ──────────────────────────────────────
  deleteUser: async (id) => {
    await delay(200);
    const users = getStoredUsers().filter((u) => String(u.id) !== String(id));
    saveStoredUsers(users);
    return { success: true };
  },

  // ── Session storage ──────────────────────────────────────────
  setSession: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: () => localStorage.getItem('token'),

  getUser: () => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  },
};

export default authService;
