import React from 'react';

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex relative">
      {/* Left side - Form Content */}
      <div className="w-full md:w-1/2 relative z-10">
        {children}
      </div>
      
      {/* Right side - Background Image */}
      <div className="hidden md:block w-1/2 fixed right-0 top-0 h-full">
        <img
          src="/school 1.png"
          alt="School background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Mobile background overlay */}
      <div className="md:hidden fixed inset-0 z-0">
        <img
          src="/school 1.png"
          alt="School background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
    </div>
  );
} 