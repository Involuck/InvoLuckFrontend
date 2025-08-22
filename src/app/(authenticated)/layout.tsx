'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  )
}
