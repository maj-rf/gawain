import Navbar from '@/components/navbar';
import React from 'react';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-hidden relative">{children}</main>
    </div>
  );
}
