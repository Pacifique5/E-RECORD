import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';

type AuthUser = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  accessToken?: string;
  profilePicture?: string;
  school?: {
    id: string;
    name: string;
    code: string;
    status: string;
    logo?: string;
  } | null;
};

export default function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) return;
    const stored = localStorage.getItem('auth_user');
    if (stored) setUser(JSON.parse(stored));

    // Listen for profile picture updates
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('auth_user');
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      }
    };

    window.addEventListener('auth-user-updated', handleStorageChange);
    return () => window.removeEventListener('auth-user-updated', handleStorageChange);
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

  function updateUser(updatedUser: Partial<AuthUser>) {
    if (typeof window !== 'undefined') {
      const currentUser = localStorage.getItem('auth_user');
      if (currentUser) {
        const userData = { ...JSON.parse(currentUser), ...updatedUser };
        localStorage.setItem('auth_user', JSON.stringify(userData));
        setUser(userData);
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('auth-user-updated'));
      }
    }
  }

  return { user, login, logout, getToken, updateUser };
}
