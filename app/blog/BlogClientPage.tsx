'use client';

import { useSearchParams } from 'next/navigation';
import BlogPage from './page';

export default function BlogClientPage() {
  // This will make the page a client component
  const searchParams = useSearchParams();
  
  return <BlogPage />;
}
