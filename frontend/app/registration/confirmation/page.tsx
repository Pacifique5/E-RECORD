import React from 'react';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Thanks for your school registration request</h1>
        <p className="text-sm text-gray-600 mb-6">
          Our team is going review your request to use e-record we will notify you later.
        </p>
        
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Verify my code
        </button>
      </div>
    </div>
  );
} 