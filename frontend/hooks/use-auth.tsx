import { useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';

type AuthUser = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  accessToken?: string;
  school?: {
    id: string;
    name: string;
    code: string;
    status: string;
  } | null;
};

export default function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) return;
    const stored = localStorage.getItem('auth_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  async function login(email: string, password: string) {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const authUser: AuthUser = {
      id: res.id,
      email: res.email,
      firstName: res.firstName,
      lastName: res.lastName,
      role: res.role,
      accessToken: res.accessToken,
      school: res.school,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('auth_user', JSON.stringify(authUser));
    }
    setUser(authUser);

    return authUser;
  }

  function logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('auth_user');
    }
    setUser(null);
  }

  function getToken() {
    return typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  }

  return { user, login, logout, getToken };
}
