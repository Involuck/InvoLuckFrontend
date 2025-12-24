'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SunIcon,
  MoonIcon,
  CloudIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface WelcomeHeroProps {
  userName?: string;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12)
    return { text: 'Buenos días', icon: <SunIcon className="h-6 w-6" /> };
  if (hour < 18)
    return { text: 'Buenas tardes', icon: <CloudIcon className="h-6 w-6" /> };
  return { text: 'Buenas noches', icon: <MoonIcon className="h-6 w-6" /> };
};

const businessHealthStatus = {
  score: 92,
  status: 'Excelente',
  color: 'text-green-600',
  bgColor: 'bg-green-100',
  message: 'Tu negocio está funcionando perfectamente'
};

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  userName = 'Usuario'
}) => {
  const [mounted, setMounted] = useState(false);
  const greeting = getGreeting();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl p-8 text-white">
        <div className="h-32 animate-pulse bg-purple-500/20 rounded-lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 0],
            y: [20, -20, 20],
            x: [0, Math.random() * 20 - 10, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="text-yellow-300 flex-shrink-0"
            >
              {greeting.icon}
            </motion.div>
            <div className="min-w-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-2xl md:text-3xl font-bold truncate"
              >
                {greeting.text}, {userName}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-purple-100 text-xs sm:text-sm md:text-base"
              >
                Listo para gestionar tu negocio hoy
              </motion.p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-3"
          >
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-5 w-5 text-yellow-300" />
              <div>
                <p className="text-sm font-semibold">Salud del Negocio</p>
                <p className="text-xs text-purple-100">
                  {businessHealthStatus.message}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-300">
                {businessHealthStatus.score}%
              </p>
              <p className="text-xs text-green-200">
                {businessHealthStatus.status}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4"
        >
          {[
            { label: 'Facturas este mes', value: '24', change: '+12%' },
            { label: 'Ingresos totales', value: '$45,230', change: '+8.2%' },
            { label: 'Pagos pendientes', value: '3', change: '-25%' },
            { label: 'Clientes activos', value: '127', change: '+15%' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4 border border-white/20"
            >
              <p className="text-purple-100 text-[10px] sm:text-xs mb-0.5 sm:mb-1 truncate">
                {stat.label}
              </p>
              <p className="text-base sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1">
                {stat.value}
              </p>
              <p className="text-green-300 text-[10px] sm:text-xs font-medium">
                {stat.change}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3"
        >
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-purple-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Crear Nueva Factura
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-white/20 transition-all duration-300"
          >
            Ver Reportes
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
