// This file is used to generate static params at build time
export function generateStaticParams() {
  // Return an array of all possible guide IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export const dynamicParams = false; // Return 404 for non-existent guides
