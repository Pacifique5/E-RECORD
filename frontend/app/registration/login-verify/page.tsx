"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/use-auth';

export default function LoginVerifyPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [code, setCode] = useState(['', '', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if user is not logged in or doesn't have a school
    if (!user || !user.school) {
      router.push('/registration/login');
      return;
    }

    // Redirect if school is not approved
    if (user.school.status !== 'approved') {
      router.push('/registration/confirmation');
      return;
    }
  }, [user, router]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value.toUpperCase();
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 6) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join('');
    
    if (enteredCode.length !== 7) {
      setError('Please enter a complete 7-character school code');
      return;
    }

    if (!user?.school) {
      setError('No school associated with your account');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Check if the entered code matches the user's school code
      if (enteredCode === user.school.code) {
        // Code matches - redirect directly to dashboard based on role
        if (user.role === 'headmaster') {
          router.push('/portal/headmaster');
        } else if (user.role === 'accountant') {
          router.push('/portal/accountant');
        } else {
          router.push('/portal');
        }
      } else {
        // Code doesn't match
        setError(`Invalid school code. Please enter the code for ${user.school.name} (${user.school.code})`);
      }
    } catch (err: any) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || !user.school) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-4">Verify School Code</h1>
        <p className="text-sm text-gray-600 text-center mb-2">
          Welcome back, {user.firstName}!
        </p>
        <p className="text-sm text-gray-600 text-center mb-8">
          Please enter your school code for <strong>{user.school.name}</strong> to access your dashboard.
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="code-0" className="block text-sm font-medium text-gray-700 mb-2">
              School Code for {user.school.name}
            </label>
            <div className="flex justify-center space-x-2 mb-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-mono border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  maxLength={1}
                  required
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Enter the 7-character code for your school (e.g., SCH0001)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? 'Verifying...' : 'Access Dashboard'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            <Link href="/registration/login" className="text-blue-600 hover:text-blue-700">
              Back to Login
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Need help?</h3>
          <p className="text-sm text-blue-700">
            If you don't have your school code, please contact your administrator or check the admin dashboard where your school was approved.
          </p>
        </div>
      </div>
    </div>
  );
}