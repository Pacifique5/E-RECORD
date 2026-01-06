import React from 'react';
import Link from 'next/link';

export default function VerifyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-4">We've Sent You a Verification Code!</h1>
        <p className="text-sm text-gray-600 text-center mb-8">Check your inbox for a 6-digit code.</p>
        
        <form className="space-y-6">
          <div className="flex justify-between gap-2">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Verify my code
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{' '}
            <button className="text-blue-600 hover:text-blue-700">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 