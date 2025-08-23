'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  CreditCardIcon,
  UserPlusIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { StatusBadge } from '@/components/pure/feedback/StatusBadge';

interface Activity {
  id: string;
  type:
    | 'invoice_created'
    | 'payment_received'
    | 'client_added'
    | 'invoice_overdue';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'neutral' | 'danger';
  amount?: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'payment_received',
    title: 'Pago recibido',
    description: 'Factura #INV-001 pagada por Acme Corp',
    timestamp: 'Hace 2 horas',
    status: 'success',
    amount: '$2,500.00'
  },
  {
    id: '2',
    type: 'invoice_created',
    title: 'Nueva factura creada',
    description: 'Factura #INV-002 para TechStart LLC',
    timestamp: 'Hace 4 horas',
    status: 'neutral',
    amount: '$1,200.00'
  },
  {
    id: '3',
    type: 'client_added',
    title: 'Nuevo cliente agregado',
    description: 'Global Solutions Inc se unió a tu cartera',
    timestamp: 'Ayer',
    status: 'success'
  },
  {
    id: '4',
    type: 'invoice_overdue',
    title: 'Factura vencida',
    description: 'Factura #INV-098 vencida hace 3 días',
    timestamp: 'Hace 3 días',
    status: 'danger',
    amount: '$850.00'
  }
];

const getActivityIcon = (type: Activity['type']) => {
  const iconClass = 'h-5 w-5';

  switch (type) {
    case 'invoice_created':
      return <DocumentTextIcon className={iconClass} />;
    case 'payment_received':
      return <CreditCardIcon className={iconClass} />;
    case 'client_added':
      return <UserPlusIcon className={iconClass} />;
    case 'invoice_overdue':
      return <ExclamationTriangleIcon className={iconClass} />;
    default:
      return <ClockIcon className={iconClass} />;
  }
};

const getStatusVariant = (status: Activity['status']) => {
  switch (status) {
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'danger':
      return 'danger';
    default:
      return 'neutral';
  }
};

export const ActivityFeed: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Actividad Reciente
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Ver todo
        </motion.button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ x: 4, backgroundColor: 'rgba(147, 51, 234, 0.02)' }}
            className="flex items-start space-x-4 p-3 rounded-xl transition-all duration-300 cursor-pointer group"
          >
            {/* Timeline dot and line */}
            <div className="relative flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full
                  ${activity.status === 'success' ? 'bg-green-100 text-green-600' : ''}
                  ${activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' : ''}
                  ${activity.status === 'danger' ? 'bg-red-100 text-red-600' : ''}
                  ${activity.status === 'neutral' ? 'bg-gray-100 text-gray-600' : ''}
                `}
              >
                {getActivityIcon(activity.type)}
              </motion.div>
              {index < activities.length - 1 && (
                <div className="absolute top-10 left-1/2 h-6 w-0.5 bg-gray-200 -translate-x-1/2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {activity.title}
                </h4>
                <div className="flex items-center space-x-2">
                  {activity.amount && (
                    <span className="text-sm font-medium text-gray-900">
                      {activity.amount}
                    </span>
                  )}
                  <StatusBadge
                    label={
                      activity.status === 'success'
                        ? 'Completado'
                        : activity.status === 'warning'
                          ? 'Pendiente'
                          : activity.status === 'danger'
                            ? 'Vencido'
                            : 'Nuevo'
                    }
                    variant={getStatusVariant(activity.status)}
                    size="sm"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                {activity.description}
              </p>
              <p className="text-xs text-gray-500">{activity.timestamp}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View all button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 pt-4 border-t border-gray-100"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
        >
          Ver toda la actividad →
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
