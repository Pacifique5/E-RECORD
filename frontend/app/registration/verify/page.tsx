"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      // Convert common mistakes: O -> 0, I -> 1, l -> 1
      let cleanValue = value.toUpperCase();
      if (index >= 3) { // Only for the numeric part (positions 3-6)
        cleanValue = cleanValue.replace(/O/g, '0').replace(/[Il]/g, '1');
      }
      newCode[index] = cleanValue;
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
    const schoolCode = code.join('');
    
    if (schoolCode.length !== 7) {
      setError('Please enter a complete 7-character school code (e.g., SCH0001)');
      return;
    }

    // Validate format: should start with SCH followed by 4 digits
    const codePattern = /^SCH\d{4}$/;
    if (!codePattern.test(schoolCode)) {
      setError('Invalid code format. School codes should be in format SCH0001 (SCH followed by 4 digits, not letters)');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Check if school code exists and get status
      console.log('Verifying school code:', schoolCode); // Debug log
      const response = await apiFetch(`/schools/code/${schoolCode}`);
      console.log('API response:', response); // Debug log
      
      if (response.status === 'approved') {
        setSuccess(`🎉 Congratulations! Your school "${response.name}" has been approved! Redirecting to your dashboard...`);
        setTimeout(() => {
          router.push('/portal/headmaster');
        }, 2000);
      } else if (response.status === 'pending') {
        setError('Your school registration is still pending admin approval. Please wait for notification.');
      } else if (response.status === 'rejected') {
        setError('Your school registration was rejected. Please contact support for more information.');
      }
    } catch (err: any) {
      console.error('Verification error:', err); // Debug log
      if (err.status === 404) {
        setError(`School code "${schoolCode}" not found. Please check your code carefully - make sure you're using zeros (0) not letter O's, and that your school has been approved by an admin.`);
      } else {
        setError(`Failed to verify school code. Error: ${err.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-4">Check Your School Code</h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Enter the 7-character school code you received after admin approval.
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="code-0" className="block text-sm font-medium text-gray-700 mb-2">
              School Code
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
              Enter the 7-character code exactly as shown (e.g., SCH0001 - that's SCH followed by four zeros and a number)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? 'Checking...' : 'Check School Status'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don't have a school code yet?{' '}
            <Link href="/registration/confirmation" className="text-blue-600 hover:text-blue-700">
              Check approval status
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link href="/registration/login" className="text-blue-600 hover:text-blue-700">
              Back to Login
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">How it works:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Submit school registration request</li>
            <li>• Admin reviews and approves your school</li>
            <li>• You receive a 7-character school code (e.g., SCH0001)</li>
            <li>• Use this page to verify your approval status</li>
            <li>• Login with your credentials to access portal</li>
          </ul>
          <div className="mt-3 p-2 bg-yellow-100 rounded border-l-4 border-yellow-500">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> School codes use zeros (0), not letter O's. 
              Example: SCH<span className="font-mono bg-white px-1 rounded">0001</span> not SCH<span className="font-mono bg-white px-1 rounded line-through">OOO1</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 