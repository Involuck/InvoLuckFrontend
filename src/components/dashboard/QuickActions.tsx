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
      className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Acciones Rápidas
        </h3>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="h-2 w-2 bg-purple-500 rounded-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            className={`
              relative overflow-hidden rounded-xl p-4 text-white font-medium
              transition-all duration-300 group
              ${action.color}
              ${action.primary ? 'col-span-2' : ''}
            `}
          >
            <div className="flex items-center justify-center space-x-2">
              <motion.div whileHover={{ rotate: 5 }} className="flex-shrink-0">
                {action.icon}
              </motion.div>
              <span className="text-sm font-medium">{action.label}</span>
            </div>

            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <PlusIcon className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
