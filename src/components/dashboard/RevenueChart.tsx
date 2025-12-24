'use client';

import React from 'react';
import { motion } from 'framer-motion';

const data = [
  { month: 'Ene', revenue: 4000, invoices: 12 },
  { month: 'Feb', revenue: 3000, invoices: 8 },
  { month: 'Mar', revenue: 5000, invoices: 15 },
  { month: 'Abr', revenue: 4500, invoices: 13 },
  { month: 'May', revenue: 6000, invoices: 18 },
  { month: 'Jun', revenue: 5500, invoices: 16 },
  { month: 'Jul', revenue: 7000, invoices: 22 },
  { month: 'Ago', revenue: 6500, invoices: 20 },
  { month: 'Sep', revenue: 8000, invoices: 25 },
  { month: 'Oct', revenue: 7500, invoices: 23 },
  { month: 'Nov', revenue: 9000, invoices: 28 },
  { month: 'Dic', revenue: 8500, invoices: 26 }
];

export const RevenueChart: React.FC = () => {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const _maxInvoices = Math.max(...data.map((d) => d.invoices));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Tendencia de Ingresos
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ingresos mensuales de los últimos 12 meses
          </p>
        </div>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full font-medium"
          >
            12M
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-medium"
          >
            6M
          </motion.button>
        </div>
      </div>

      <div className="h-80">
        <div className="flex items-end justify-between h-full space-x-1">
          {data.map((item, index) => (
            <motion.div
              key={item.month}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="flex-1 flex flex-col items-center"
            >
              <div className="relative w-full">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm min-h-[4px]"
                  style={{
                    height: `${(item.revenue / maxRevenue) * 200}px`
                  }}
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  ${item.revenue.toLocaleString()}
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
                {item.month}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700"
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            $72,500
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total del año
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            +15.3%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            vs año anterior
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            $6,042
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Promedio mensual
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
