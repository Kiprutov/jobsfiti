'use client';

import { ReactNode, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export function SearchParamsWrapper({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  return <>{children}</>;
}

export default function SearchParamsProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsWrapper>
        {children}
      </SearchParamsWrapper>
    </Suspense>
  );
}
