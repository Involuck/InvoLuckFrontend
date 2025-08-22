'use client';

export default function AuthenticatedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-100">{children}</div>;
}
