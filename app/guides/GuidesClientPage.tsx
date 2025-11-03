'use client';

import { useSearchParams } from 'next/navigation';
import GuidesPage from './page';

export default function GuidesClientPage() {
  // This will make the page a client component
  const searchParams = useSearchParams();
  
  return <GuidesPage />;
}
