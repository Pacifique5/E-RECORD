"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/use-auth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const authUser = await login(email, password);
      
      // Enhanced role-based routing with school approval status
      if (authUser.role === 'admin') {
        // Admin: Direct access to admin dashboard
        router.push('/admin');
      } else if (authUser.role === 'headmaster') {
        // Headmaster: Check school approval status
        if (!authUser.school) {
          // No school associated - redirect to school registration
          router.push('/registration/school');
        } else if (authUser.school.status === 'pending') {
          // School pending approval - show waiting page
          router.push('/registration/confirmation');
        } else if (authUser.school.status === 'approved') {
          // School approved - require code verification before dashboard access
          router.push('/registration/verify');
        } else if (authUser.school.status === 'rejected') {
          // School rejected - show rejection message and allow re-application
          setError('Your school registration was rejected. Please contact support or submit a new application.');
          return;
        }
      } else if (authUser.role === 'accountant') {
        // Accountant: Check if associated school is approved
        if (!authUser.school || authUser.school.status !== 'approved') {
          setError('Your school is not yet approved. Please wait for admin approval.');
          return;
        }
        router.push('/portal/accountant');
      } else if (authUser.role === 'staff') {
        // Staff: Check if associated school is approved
        if (!authUser.school || authUser.school.status !== 'approved') {
          setError('Your school is not yet approved. Please wait for admin approval.');
          return;
        }
        router.push('/portal');
      } else {
        // Default fallback
        router.push('/portal');
      }
    } catch (err: any) {
      const msg = err?.body?.message || err?.message || 'Login failed';
      setError(Array.isArray(msg) ? msg.join(', ') : String(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white bg-opacity-90">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Login to E-Record</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Access your dashboard based on your role
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link href="/registration/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/registration" className="text-blue-600 hover:text-blue-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}