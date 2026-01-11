"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import useAuth from '@/hooks/use-auth';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  // Headmaster fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // School fields
  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [schoolCity, setSchoolCity] = useState('');
  const [schoolState, setSchoolState] = useState('');
  const [schoolCountry, setSchoolCountry] = useState('');
  const [schoolPhone, setSchoolPhone] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [schoolLogo, setSchoolLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSchoolLogo(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }
    
    setLoading(true);
    try {
      // Step 1: Register headmaster
      const registerResponse = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          email, 
          password,
          phoneNumber: phoneNumber || undefined,
          role: 'headmaster'
        }),
      });

      // Step 2: Auto-login to get user ID
      const authUser = await login(email, password);
      
      // Step 3: Register school with headmaster ID
      const formData = new FormData();
      formData.append('name', schoolName);
      formData.append('address', schoolAddress);
      formData.append('city', schoolCity);
      formData.append('state', schoolState);
      formData.append('country', schoolCountry);
      formData.append('phoneNumber', schoolPhone);
      formData.append('email', schoolEmail);
      formData.append('headmasterId', authUser.id);
      
      if (schoolLogo) {
        formData.append('logo', schoolLogo);
      }

      await apiFetch('/schools', {
        method: 'POST',
        body: formData,
      });

      // Redirect to confirmation page
      router.push('/registration/confirmation');
    } catch (err: any) {
      const msg = err?.body?.message || err?.message || 'Registration failed';
      setError(Array.isArray(msg) ? msg.join(', ') : String(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white bg-opacity-90">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Register Headmaster & School</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">Complete registration in one step</p>

        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Headmaster Information Section */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">👤 Headmaster Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

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
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Choose your password (min. 6 characters)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* School Information Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">🏫 School Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
                  School Name
                </label>
                <input
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  placeholder="Enter school name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="schoolLogo" className="block text-sm font-medium text-gray-700 mb-1">
                  School Logo <span className="text-gray-400">(optional)</span>
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="schoolLogo"
                    name="schoolLogo"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {logoPreview && (
                    <div className="flex-shrink-0">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Upload your school logo (PNG, JPG, or GIF)</p>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="schoolAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  School Address
                </label>
                <input
                  value={schoolAddress}
                  onChange={(e) => setSchoolAddress(e.target.value)}
                  type="text"
                  id="schoolAddress"
                  name="schoolAddress"
                  placeholder="Enter school address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="schoolCity" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  value={schoolCity}
                  onChange={(e) => setSchoolCity(e.target.value)}
                  type="text"
                  id="schoolCity"
                  name="schoolCity"
                  placeholder="Enter city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="schoolState" className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province
                </label>
                <input
                  value={schoolState}
                  onChange={(e) => setSchoolState(e.target.value)}
                  type="text"
                  id="schoolState"
                  name="schoolState"
                  placeholder="Enter state"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="schoolCountry" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  value={schoolCountry}
                  onChange={(e) => setSchoolCountry(e.target.value)}
                  type="text"
                  id="schoolCountry"
                  name="schoolCountry"
                  placeholder="Enter country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="schoolPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  School Phone
                </label>
                <input
                  value={schoolPhone}
                  onChange={(e) => setSchoolPhone(e.target.value)}
                  type="tel"
                  id="schoolPhone"
                  name="schoolPhone"
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
                  value={schoolEmail}
                  onChange={(e) => setSchoolEmail(e.target.value)}
                  type="email"
                  id="schoolEmail"
                  name="schoolEmail"
                  placeholder="Enter school email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 text-lg font-medium"
          >
            {loading ? 'Creating Account & School...' : 'Register Headmaster & School'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/registration/login" className="text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
        </p>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            <strong>Note:</strong> This will create both your headmaster account and register your school for admin approval.
          </p>
        </div>
      </div>
    </div>
  );
}