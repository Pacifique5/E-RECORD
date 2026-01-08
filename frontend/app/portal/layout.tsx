"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

  if (checking) return <div className="p-8">Checking authentication…</div>;

  return <div className="min-h-screen">{children}</div>;
}
