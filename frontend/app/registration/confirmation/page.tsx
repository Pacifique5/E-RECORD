"use client";

import React from 'react';
import Link from 'next/link';

export default function RegistrationConfirmationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Thanks for your school registration request
        </h1>

        <p className="text-gray-600 mb-8">
          Your school registration request is being reviewed by our admin team. 
          You can check back later or wait for email notification.
        </p>

        <div className="space-y-4">
          <Link
            href="/registration/verify"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-block text-center"
          >
            Check Status
          </Link>

          <Link
            href="/registration/login"
            className="w-full text-blue-600 py-2 px-4 rounded-md hover:text-blue-700 inline-block text-center"
          >
            Login Again
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Admin reviews your school registration request</li>
            <li>• You'll receive an email notification when approved</li>
            <li>• Your school will be assigned a unique code</li>
            <li>• You can then access your school management portal</li>
          </ul>
        </div>
      </div>
    </div>
  );
}