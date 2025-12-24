'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

export default function InvoicesPage() {
  return (
    <DashboardLayout title="Facturas">
      <div className="space-y-4 sm:space-y-6">
        {/* Header con acciones */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4"
        >
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Facturas
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
              Gestiona y da seguimiento a todas tus facturas
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium text-sm shadow-sm transition-colors w-full sm:w-auto"
          >
            <PlusIcon className="w-5 h-5" />
            Nueva Factura
          </motion.button>
        </motion.div>

        {/* Barra de búsqueda y filtros */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-2 sm:gap-3"
        >
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar facturas..."
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
            />
          </div>
          <button className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
            <FunnelIcon className="w-4 sm:w-5 h-4 sm:h-5" />
            Filtros
          </button>
        </motion.div>

        {/* Tabla */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
        >
          {/* Encabezados de tabla - ocultos en mobile */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 lg:px-6 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
            <div className="col-span-3">Factura</div>
            <div className="col-span-3">Cliente</div>
            <div className="col-span-2">Fecha</div>
            <div className="col-span-2">Monto</div>
            <div className="col-span-2">Estado</div>
          </div>

          {/* Empty state */}
          <div className="px-4 sm:px-6 py-10 sm:py-16 text-center">
            <div className="mx-auto w-12 sm:w-16 h-12 sm:h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <DocumentTextIcon className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
              No hay facturas aún
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 max-w-sm mx-auto">
              Comienza creando tu primera factura para llevar un control de tus
              ventas y cobros.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-colors"
            >
              <PlusIcon className="w-4 sm:w-5 h-4 sm:h-5" />
              Crear primera factura
            </motion.button>
          </div>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {[
            { label: 'Total Facturado', value: '$0.00', color: 'purple' },
            { label: 'Pendiente de Cobro', value: '$0.00', color: 'yellow' },
            { label: 'Cobrado este mes', value: '$0.00', color: 'green' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5"
            >
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-0.5 sm:mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
