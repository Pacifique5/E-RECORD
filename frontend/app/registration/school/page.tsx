"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiFetch } from '../../../lib/api';

export default function SchoolRegistrationPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // For now, we'll send the school data without the logo
      // In a real implementation, you'd upload the logo to a file storage service first
      const schoolData = {
        name,
        address,
        city,
        state,
        country,
        phoneNumber: phone,
        email,
        // logo: logoUrl, // Would be set after uploading the file
      };

      await apiFetch('/schools', {
        method: 'POST',
        body: JSON.stringify(schoolData),
      });

      // Redirect to confirmation page instead of portal
      router.push('/registration/confirmation');
    } catch (err: any) {
      const msg = err?.body?.message || err?.message || 'Failed to submit school registration request';
      setError(Array.isArray(msg) ? msg.join(', ') : String(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-6">
          <Link href="/registration" className="text-blue-600 hover:text-blue-700">
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
        <p className="text-sm text-gray-600 mb-6">Step 2 of 2: School Registration Request</p>
        
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
              School Name
            </label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter school name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="schoolAddress" className="block text-sm font-medium text-gray-700 mb-1">
              School Address
            </label>
            <input
              type="text"
              id="schoolAddress"
              name="schoolAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter school address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State/Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter state"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="schoolPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="schoolPhone"
              name="schoolPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter school phone"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter school email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="schoolLogo" className="block text-sm font-medium text-gray-700 mb-1">
              School Logo <span className="text-gray-400">(optional)</span>
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> school logo
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 2MB)</p>
                  {logo && <p className="text-xs text-blue-600 mt-1">{logo.name}</p>}
                </div>
                <input
                  id="schoolLogo"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? 'Submitting Request...' : 'Submit Registration Request'}
          </button>
        </form>

        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Your school registration request will be reviewed by our admin team. 
            You'll receive a school code once approved.
          </p>
        </div>
      </div>
    </div>
  );
}