import { ReactNode } from 'react';

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto">
      {children}
    </div>
  );
}
