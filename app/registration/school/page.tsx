import React from 'react';
import Link from 'next/link';

export default function SchoolRegistrationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-6">
          <Link href="/registration/personal-details" className="text-blue-600 hover:text-blue-700">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-center flex-1 pr-5">Register School</h1>
        </div>
        <p className="text-sm text-gray-600 mb-6">Step 2 of 2: Registering school</p>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
              School Name
            </label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              placeholder="Enter school name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="schoolPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone number
            </label>
            <input
              type="tel"
              id="schoolPhone"
              name="schoolPhone"
              placeholder="Enter your phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="schoolEmail" className="block text-sm font-medium text-gray-700 mb-1">
              School Email
            </label>
            <input
              type="email"
              id="schoolEmail"
              name="schoolEmail"
              placeholder="Enter your school email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
} 