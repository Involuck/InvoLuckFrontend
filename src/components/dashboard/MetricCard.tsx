'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: React.ReactNode;
  color?: 'purple' | 'green' | 'blue' | 'orange' | 'red';
  loading?: boolean;
}

const colorStyles = {
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    iconBg: 'bg-purple-100 dark:bg-purple-900/40',
    iconColor: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800'
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    iconBg: 'bg-green-100 dark:bg-green-900/40',
    iconColor: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800'
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    iconBg: 'bg-blue-100 dark:bg-blue-900/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800'
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    iconBg: 'bg-orange-100 dark:bg-orange-900/40',
    iconColor: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800'
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    iconBg: 'bg-red-100 dark:bg-red-900/40',
    iconColor: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800'
  }
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'purple',
  loading = false
}) => {
  const styles = colorStyles[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`
        relative overflow-hidden rounded-xl sm:rounded-2xl border-2 ${styles.border} ${styles.bg}
        p-3 sm:p-4 lg:p-6 shadow-lg backdrop-blur-sm transition-all duration-300
        hover:shadow-xl hover:shadow-purple-500/10
      `}
    >
      <div className="flex items-start sm:items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-0.5 sm:mb-1 truncate">
            {title}
          </p>
          {loading ? (
            <div className="h-6 sm:h-8 w-16 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate"
            >
              {value}
            </motion.p>
          )}
          {change && !loading && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`
                flex items-center mt-1 sm:mt-2 text-xs sm:text-sm font-medium
                ${change.type === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
              `}
            >
              <span className="mr-0.5 sm:mr-1">
                {change.type === 'increase' ? '↗' : '↘'}
              </span>
              {Math.abs(change.value)}%
            </motion.div>
          )}
        </div>
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          className={`
            flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg sm:rounded-xl ${styles.iconBg} flex-shrink-0 ml-2
          `}
        >
          <div
            className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ${styles.iconColor}`}
          >
            {icon}
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
    </motion.div>
  );
};
