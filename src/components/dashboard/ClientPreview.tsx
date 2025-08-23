'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BuildingOfficeIcon,
  ChevronRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface Client {
  id: string;
  name: string;
  company: string;
  avatar?: string;
  totalInvoices: number;
  totalRevenue: number;
  status: 'active' | 'inactive';
  rating: number;
  lastInvoice: string;
}

const topClients: Client[] = [
  {
    id: '1',
    name: 'María González',
    company: 'Acme Corporation',
    totalInvoices: 24,
    totalRevenue: 45000,
    status: 'active',
    rating: 5,
    lastInvoice: 'Hace 2 días'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    company: 'TechStart LLC',
    totalInvoices: 18,
    totalRevenue: 32000,
    status: 'active',
    rating: 4,
    lastInvoice: 'Hace 1 semana'
  },
  {
    id: '3',
    name: 'Ana Martínez',
    company: 'Global Solutions',
    totalInvoices: 15,
    totalRevenue: 28000,
    status: 'active',
    rating: 5,
    lastInvoice: 'Hace 3 días'
  },
  {
    id: '4',
    name: 'Luis Fernández',
    company: 'Innovation Hub',
    totalInvoices: 12,
    totalRevenue: 22000,
    status: 'active',
    rating: 4,
    lastInvoice: 'Hace 5 días'
  }
];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          whileHover={{ scale: 1.2 }}
          className="h-4 w-4 relative"
        >
          {star <= rating ? (
            <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          ) : (
            <StarIcon className="h-4 w-4 text-gray-300" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export const ClientPreview: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Principales Clientes
          </h3>
          <p className="text-sm text-gray-600">Tus clientes más valiosos</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          <span>Ver todos</span>
          <ChevronRightIcon className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="space-y-4">
        {topClients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{
              x: 4,
              backgroundColor: 'rgba(147, 51, 234, 0.02)',
              scale: 1.01
            }}
            className="flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 cursor-pointer group"
          >
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative flex-shrink-0"
            >
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(client.name)}
              </div>
              <div
                className={`
                absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white
                ${client.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}
              `}
              />
            </motion.div>

            {/* Client info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                  {client.name}
                </h4>
                <span className="text-sm font-medium text-gray-900">
                  ${client.totalRevenue.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600 truncate">
                  {client.company}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <StarRating rating={client.rating} />
                  <span className="text-xs text-gray-500">
                    {client.totalInvoices} facturas
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {client.lastInvoice}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 pt-4 border-t border-gray-100"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">127</p>
            <p className="text-xs text-gray-600">Total clientes</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">94%</p>
            <p className="text-xs text-gray-600">Clientes activos</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
