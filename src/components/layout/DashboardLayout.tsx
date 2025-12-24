'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';

const BellIcon = ({ className }: { className?: string }) => (
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
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
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
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
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
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
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
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
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
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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

const LogoutIcon = ({ className }: { className?: string }) => (
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
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
};

const handleLogout = () => {
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  document.cookie = 'remember=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  window.location.href = '/';
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title = 'Dashboard'
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(notificationsRef, () => setNotificationsOpen(false));
  useOutsideClick(userMenuRef, () => setUserMenuOpen(false));

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const notifications = [
    {
      id: 1,
      title: 'Nueva actualización disponible',
      message: 'Se ha lanzado una nueva versión del sistema',
      time: 'hace 5 min',
      unread: true
    },
    {
      id: 2,
      title: 'Informe mensual listo',
      message: 'El informe de ventas de agosto está disponible',
      time: 'hace 1 hora',
      unread: true
    },
    {
      id: 3,
      title: 'Mantenimiento programado',
      message: 'El sistema estará en mantenimiento mañana de 2-4 AM',
      time: 'hace 3 horas',
      unread: false
    }
  ];

  const toggleMenu = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <Sidebar
        isCollapsed={sidebarCollapsed}
        isMobileOpen={mobileMenuOpen}
        onToggle={toggleMenu}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between h-14 sm:h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 sm:px-4 lg:px-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors rounded-lg"
              aria-label="Toggle menu"
            >
              <MenuIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>

            {/* Title */}
            <div className="flex flex-col min-w-0">
              <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white truncate">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                {new Date().toLocaleDateString('es-ES', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'short'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
            {/* Search - hidden on mobile, shown on md+ */}
            <div className="hidden md:block relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 w-48 lg:w-64 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            {/* Search button - visible on mobile only */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors rounded-lg"
              aria-label="Buscar"
            >
              <SearchIcon className="h-5 w-5" />
            </motion.button>

            {/* Notifications */}
            <div ref={notificationsRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors rounded-lg"
                aria-label="Notificaciones"
              >
                <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {notifications.filter((n) => n.unread).length}
                </span>
              </motion.button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-[80vh] overflow-hidden"
                  >
                    <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                        Notificaciones
                      </h3>
                    </div>
                    <div className="max-h-64 sm:max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                          className="p-3 sm:p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 cursor-pointer [--hover-bg:#f9fafb] dark:[--hover-bg:#374151]"
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                            />
                            <div className="flex-1 min-w-0">
                              <h4
                                className={`text-sm font-medium truncate ${notification.unread ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                              >
                                {notification.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full text-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                        Ver todas
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User menu */}
            <div ref={userMenuRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                aria-label="Menú de usuario"
              >
                <div className="relative">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                    <span className="text-xs sm:text-sm">U</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <ChevronDownIcon className="h-4 w-4 text-gray-500 hidden sm:block" />
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-52 sm:w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                  >
                    <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          <span>U</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            Usuario Demo
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            usuario@ejemplo.com
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <motion.button
                        whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors [--hover-bg:#f9fafb] dark:[--hover-bg:#374151]"
                      >
                        <UserIcon className="h-4 w-4 mr-3 flex-shrink-0" />
                        Mi Perfil
                      </motion.button>

                      <motion.button
                        whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors [--hover-bg:#f9fafb] dark:[--hover-bg:#374151]"
                      >
                        <SettingsIcon className="h-4 w-4 mr-3 flex-shrink-0" />
                        Configuración
                      </motion.button>

                      <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                        <motion.button
                          onClick={handleLogout}
                          whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                          className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors [--hover-bg:#fef2f2] dark:[--hover-bg:#7f1d1d33]"
                        >
                          <LogoutIcon className="h-4 w-4 mr-3 flex-shrink-0" />
                          Cerrar Sesión
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
