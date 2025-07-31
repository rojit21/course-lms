'use client';

import { SessionProvider } from 'next-auth/react';
import Navigation from '@/components/ui/Navigation';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
    </SessionProvider>
  );
} 