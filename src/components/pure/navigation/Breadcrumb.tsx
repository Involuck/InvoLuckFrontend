'use client';

import * as React from 'react';
import Link from 'next/link';

export interface Crumb {
  label: string;
  href?: string;
}
export interface BreadcrumbProps {
  items: Crumb[];
  separator?: React.ReactNode;
  className?: string;
}

export function Breadcrumb({
  items,
  separator = '/',
  className = ''
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 underline-offset-2 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={isLast ? 'text-gray-900 font-medium' : ''}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden>{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
