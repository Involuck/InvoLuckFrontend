'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
    />
  </svg>
);

const InvoicesIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const ClientsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const ReportsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: DashboardIcon,
    href: '/dashboard'
  },
  {
    id: 'invoices',
    label: 'Facturas',
    icon: InvoicesIcon,
    href: '/invoices',
    badge: '12'
  },
  {
    id: 'clients',
    label: 'Clientes',
    icon: ClientsIcon,
    href: '/clients'
  },
  {
    id: 'reports',
    label: 'Reportes',
    icon: ReportsIcon,
    href: '/reports'
  },
  {
    id: 'settings',
    label: 'Configuración',
    icon: SettingsIcon,
    href: '/settings'
  }
];

export interface SidebarProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed = false,
  isMobileOpen = false,
  onClose
}) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && onClose) {
        onClose();
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          x: isMobile && !isMobileOpen ? -320 : 0,
          width: isMobile ? 320 : isCollapsed ? 64 : 256
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          width: { duration: isMobile ? 0.3 : 0.2 }
        }}
        className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 shadow-lg z-30 overflow-hidden"
      >
        <div className="h-28 flex items-center px-5 border-b border-gray-200 flex-shrink-0">
          <div className={`flex items-center justify-start w-full`}>
            <img
              src="/api/logo"
              alt="InvoLuck logo"
              className="h-24 lg:h-28 w-auto object-contain flex-shrink-0"
            />
            <AnimatePresence>
              {(!isCollapsed || isMobile) && (
                <motion.span
                  initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                  animate={{ opacity: 1, width: 120, marginLeft: 12 }}
                  exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent whitespace-nowrap overflow-hidden"
                >
                  InvoLuck
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col h-[calc(100vh-7rem)] overflow-hidden">
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="overflow-hidden"
                >
                  <Link href={item.href} onClick={onClose}>
                    <motion.div
                      whileHover={{
                        x: isCollapsed && !isMobile ? 0 : 4,
                        backgroundColor: 'rgba(147, 51, 234, 0.05)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center h-12 rounded-xl transition-all duration-200 cursor-pointer group ${isActive ? 'bg-purple-100 text-purple-700 shadow-sm' : 'text-gray-600 hover:text-purple-600'} justify-start px-3`}
                    >
                      <Icon
                        className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-purple-600' : 'text-gray-500 group-hover:text-purple-500'}`}
                      />

                      <AnimatePresence>
                        {(!isCollapsed || isMobile) && (
                          <motion.div
                            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                            animate={{
                              opacity: 1,
                              width: 'auto',
                              marginLeft: 12
                            }}
                            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="flex items-center justify-between min-w-0 flex-1"
                          >
                            <span className="font-medium whitespace-nowrap">
                              {item.label}
                            </span>
                            {item.badge && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-purple-100 text-purple-600 text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ml-2"
                              >
                                {item.badge}
                              </motion.span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {isCollapsed && !isMobile && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          {item.label}
                          {item.badge && (
                            <span className="ml-2 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </motion.div>
      <div
        className={`hidden md:block transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
        style={{ flexShrink: 0 }}
      />
    </>
  );
};
