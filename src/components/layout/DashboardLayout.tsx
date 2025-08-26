'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(notificationsRef, () => setNotificationsOpen(false));
  useOutsideClick(userMenuRef, () => setUserMenuOpen(false));

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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-50 flex items-center justify-between h-28 md:h-32 border-b border-gray-200 bg-white px-4 lg:px-8">
          <div className="flex items-center space-x-4">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(147, 51, 234, 0.05)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex p-2 text-gray-600 hover:text-purple-600 transition-colors rounded-lg relative group"
              title={sidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'}
            >
              <MenuIcon className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(147, 51, 234, 0.05)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="md:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors rounded-lg relative group"
              title={sidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'}
            >
              <MenuIcon className="h-5 w-5" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className={`flex items-center space-x-3`}
            >
              <div className="relative h-12 md:h-16 lg:h-20 w-auto mr-2">
                <Image
                  src="/api/logo"
                  alt="InvoLuck logo"
                  width={80}
                  height={80}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 truncate max-w-xs sm:max-w-none">
                  {title}
                </h1>
                <p className="text-sm md:text-base text-gray-600 hidden sm:block">
                  {new Date().toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="hidden md:block relative"
            >
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </motion.div>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(147, 51, 234, 0.05)'
              }}
              whileTap={{ scale: 0.98 }}
              className="md:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors rounded-lg relative group"
            >
              <SearchIcon className="h-5 w-5" />
            </motion.button>

            <div ref={notificationsRef} className="relative">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(147, 51, 234, 0.05)'
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors rounded-lg group"
                title="Notificaciones"
              >
                <BellIcon className="h-5 w-5 md:h-6 md:w-6" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.4,
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                  }}
                  className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"
                >
                  {notifications.filter((n) => n.unread).length}
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Notificaciones
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          whileHover={{ backgroundColor: '#f9fafb' }}
                          className="p-4 border-b border-gray-100 last:border-b-0 cursor-pointer"
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`}
                            />
                            <div className="flex-1">
                              <h4
                                className={`text-sm font-medium ${notification.unread ? 'text-gray-900' : 'text-gray-600'}`}
                              >
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium">
                        Ver todas las notificaciones
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div ref={userMenuRef} className="relative">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(147, 51, 234, 0.05)'
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none p-2 rounded-lg transition-colors group"
              >
                <div className="relative">
                  <div className="h-9 w-9 md:h-10 md:w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200">
                    <span className="text-sm md:text-base">U</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <motion.div
                  animate={{ rotate: userMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="hidden md:block"
                >
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          <span>U</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Usuario Demo
                          </p>
                          <p className="text-xs text-gray-500">
                            usuario@ejemplo.com
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <motion.button
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:text-purple-600 transition-colors"
                      >
                        <UserIcon className="h-4 w-4 mr-3" />
                        Mi Perfil
                      </motion.button>

                      <motion.button
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:text-purple-600 transition-colors"
                      >
                        <SettingsIcon className="h-4 w-4 mr-3" />
                        Configuración
                      </motion.button>

                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <motion.button
                          onClick={handleLogout}
                          whileHover={{ backgroundColor: '#fef2f2' }}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                        >
                          <LogoutIcon className="h-4 w-4 mr-3" />
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

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
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
