"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/loading-spinner';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) {
      router.replace('/registration/login');
      return;
    }
    setChecking(false);
  }, [router]);

  if (checking) return <LoadingSpinner fullScreen />;

  return <div className="min-h-screen">{children}</div>;
}
