'use client';

import React from 'react';
import { motion } from 'framer-motion';

const data = [
  { name: 'Pagadas', value: 65, color: '#10b981', count: 51 },
  { name: 'Pendientes', value: 25, color: '#f59e0b', count: 20 },
  { name: 'Vencidas', value: 8, color: '#ef4444', count: 6 },
  { name: 'Borradores', value: 2, color: '#6b7280', count: 1 }
];

export const InvoiceStatusChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Estado de Facturas
          </h3>
          <p className="text-sm text-gray-600">
            Distribución actual de tus facturas
          </p>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="h-3 w-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
        />
      </div>

      <div className="h-64 flex items-center justify-center">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>

          {data.map((item, index) => {
            const circumference = 2 * Math.PI * 60;
            const strokeDasharray = (item.value / 100) * circumference;
            const strokeDashoffset =
              index === 0
                ? 0
                : data
                    .slice(0, index)
                    .reduce(
                      (acc, curr) => acc + (curr.value / 100) * circumference,
                      0
                    );

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="absolute inset-0"
                style={{
                  transform: 'rotate(-90deg)'
                }}
              >
                <svg className="w-full h-full" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="60"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="16"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
              </motion.div>
            );
          })}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">78</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  {item.name}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {item.count}
                </span>
              </div>
              <div className="text-xs text-gray-500">{item.value}%</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 pt-4 border-t border-gray-100"
      >
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">78</p>
            <p className="text-sm text-gray-600">Total facturas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">83%</p>
            <p className="text-sm text-gray-600">Tasa de cobro</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
