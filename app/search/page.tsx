'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled to avoid hydration issues
const SearchContent = dynamic(() => import('./SearchContent'), { ssr: false });

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
