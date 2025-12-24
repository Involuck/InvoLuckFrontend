'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  UserPlusIcon,
  ChartBarIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
  primary?: boolean;
}

const quickActions: QuickAction[] = [
  {
    id: 'create-invoice',
    label: 'Crear Factura',
    icon: <DocumentTextIcon className="h-5 w-5" />,
    color: 'bg-gradient-to-r from-purple-600 to-purple-700',
    onClick: () => {},
    primary: true
  },
  {
    id: 'add-client',
    label: 'Agregar Cliente',
    icon: <UserPlusIcon className="h-5 w-5" />,
    color: 'bg-gradient-to-r from-blue-600 to-blue-700',
    onClick: () => {}
  },
  {
    id: 'view-reports',
    label: 'Ver Reportes',
    icon: <ChartBarIcon className="h-5 w-5" />,
    color: 'bg-gradient-to-r from-green-600 to-green-700',
    onClick: () => {}
  },
  {
    id: 'export-data',
    label: 'Exportar Datos',
    icon: <ArrowDownTrayIcon className="h-5 w-5" />,
    color: 'bg-gradient-to-r from-orange-600 to-orange-700',
    onClick: () => {}
  }
];

export const QuickActions: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-4 sm:p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          Acciones Rápidas
        </h3>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="h-2 w-2 bg-purple-500 rounded-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{
              scale: 1.02,
              y: -2
            }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            className={`
              relative overflow-hidden rounded-lg sm:rounded-xl p-3 sm:p-4 text-white font-medium
              transition-all duration-300 group shadow-md hover:shadow-lg
              ${action.color}
              ${action.primary ? 'col-span-2' : ''}
            `}
          >
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2">
              <motion.div whileHover={{ rotate: 5 }} className="flex-shrink-0">
                {action.icon}
              </motion.div>
              <span className="text-xs sm:text-sm font-medium truncate">
                {action.label}
              </span>
            </div>

            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.button>
        ))}
      </div>

      {/* Floating action button - hidden on mobile, visible on larger screens */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 hidden sm:block"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Crear nuevo"
        >
          <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
