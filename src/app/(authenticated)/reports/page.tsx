'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ArrowDownTrayIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

export default function ReportsPage() {
  return (
    <DashboardLayout title="Reportes">
      <div className="space-y-6">
        {/* Header con acciones */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Reportes
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Analiza el rendimiento de tu negocio
            </p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <CalendarDaysIcon className="w-5 h-5" />
              Últimos 30 días
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              Exportar
            </motion.button>
          </div>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            {
              label: 'Ingresos Totales',
              value: '$0.00',
              change: '+0%',
              positive: true
            },
            {
              label: 'Facturas Emitidas',
              value: '0',
              change: '+0%',
              positive: true
            },
            {
              label: 'Promedio por Factura',
              value: '$0.00',
              change: '0%',
              positive: true
            },
            {
              label: 'Clientes Nuevos',
              value: '0',
              change: '+0%',
              positive: true
            }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stat.value}
              </p>
              <p
                className={`text-sm mt-1 ${stat.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
              >
                {stat.change} vs mes anterior
              </p>
            </div>
          ))}
        </motion.div>

        {/* Gráfico placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ingresos Mensuales
            </h2>
          </div>

          {/* Empty state */}
          <div className="px-6 py-16 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <ChartBarIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Sin datos para mostrar
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              Los gráficos se mostrarán una vez que tengas facturas registradas
              en el sistema.
            </p>
          </div>
        </motion.div>

        {/* Reportes disponibles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[
            {
              title: 'Reporte de Ventas',
              description: 'Análisis detallado de todas tus ventas',
              icon: ChartBarIcon
            },
            {
              title: 'Reporte de Clientes',
              description: 'Métricas sobre tu cartera de clientes',
              icon: ChartBarIcon
            },
            {
              title: 'Reporte Fiscal',
              description: 'Resumen para declaraciones de impuestos',
              icon: ChartBarIcon
            }
          ].map((report, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 cursor-pointer hover:border-green-300 dark:hover:border-green-600 transition-colors"
            >
              <report.icon className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {report.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {report.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
