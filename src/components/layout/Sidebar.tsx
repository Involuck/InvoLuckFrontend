'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const XMarkIcon = ({ className }: { className?: string }) => (
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
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

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

  // Check if mobile based on window width
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sidebar width logic
  const getSidebarWidth = () => {
    if (isMobile) return 280;
    return isCollapsed ? 64 : 256;
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
            className="fixed left-0 top-0 h-screen w-[280px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-2xl z-50 overflow-hidden"
          >
            {/* Mobile Header with close button */}
            <div className="h-14 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4">
              <div className="flex items-center">
                <div className="relative h-10 w-10 flex-shrink-0">
                  <Image
                    src="/api/logo"
                    alt="InvoLuck logo"
                    width={40}
                    height={40}
                    className="h-full w-auto object-contain"
                    priority
                  />
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  InvoLuck
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Cerrar menú"
              >
                <XMarkIcon className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={item.href} onClick={onClose}>
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-center h-12 rounded-xl px-4 transition-all duration-200 ${
                          isActive
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 flex-shrink-0 ${
                            isActive
                              ? 'text-purple-600 dark:text-purple-400'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        />
                        <span className="ml-3 font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 text-xs font-semibold px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: getSidebarWidth()
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        className="hidden md:block fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-30 overflow-hidden"
      >
        <div className="h-16 flex items-center border-b border-gray-200 dark:border-gray-700 flex-shrink-0 px-3">
          <div className="flex items-center w-full">
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src="/api/logo"
                alt="InvoLuck logo"
                width={48}
                height={48}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent whitespace-nowrap overflow-hidden"
                >
                  InvoLuck
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
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
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{
                        x: isCollapsed ? 0 : 4,
                        backgroundColor: 'rgba(147, 51, 234, 0.05)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center h-12 rounded-xl transition-all duration-200 cursor-pointer group ${
                        isActive
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm'
                          : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                      } ${isCollapsed ? 'justify-center px-2' : 'justify-start px-3'}`}
                    >
                      <Icon
                        className={`h-5 w-5 flex-shrink-0 ${
                          isActive
                            ? 'text-purple-600 dark:text-purple-400'
                            : 'text-gray-500 dark:text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400'
                        }`}
                      />

                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.div
                            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                            animate={{
                              opacity: 1,
                              width: 'auto',
                              marginLeft: 12
                            }}
                            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
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
                                className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ml-2"
                              >
                                {item.badge}
                              </motion.span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
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

      {/* Spacer for desktop layout */}
      <div
        className={`hidden md:block transition-all duration-300 flex-shrink-0 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      />
    </>
  );
};
