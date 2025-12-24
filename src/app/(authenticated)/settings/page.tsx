'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  BuildingOfficeIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const settingsSections = [
  {
    title: 'Perfil',
    description: 'Actualiza tu información personal y foto de perfil',
    icon: UserCircleIcon,
    href: '#perfil'
  },
  {
    title: 'Empresa',
    description: 'Configura los datos de tu empresa para las facturas',
    icon: BuildingOfficeIcon,
    href: '#empresa'
  },
  {
    title: 'Notificaciones',
    description: 'Gestiona tus preferencias de notificación',
    icon: BellIcon,
    href: '#notificaciones'
  },
  {
    title: 'Seguridad',
    description: 'Contraseña, autenticación y sesiones activas',
    icon: ShieldCheckIcon,
    href: '#seguridad'
  },
  {
    title: 'Facturación',
    description: 'Planes, métodos de pago e historial',
    icon: CreditCardIcon,
    href: '#facturacion'
  },
  {
    title: 'Apariencia',
    description: 'Personaliza el tema y la interfaz',
    icon: PaintBrushIcon,
    href: '#apariencia'
  }
];

export default function SettingsPage() {
  return (
    <DashboardLayout title="Configuración">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Configuración
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
            Gestiona tu cuenta y preferencias
          </p>
        </motion.div>

        {/* Theme toggle card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
              <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
                <PaintBrushIcon className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  Tema de la Interfaz
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate sm:whitespace-normal">
                  Cambia entre modo claro, oscuro o automático
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </motion.div>

        {/* Settings grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {settingsSections.map((section, index) => (
            <motion.a
              key={section.title}
              href={section.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-5 hover:border-purple-300 dark:hover:border-purple-600 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="flex items-start gap-2.5 sm:gap-3 lg:gap-4">
                <div className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors flex-shrink-0">
                  <section.icon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm sm:text-base">
                    {section.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 line-clamp-2">
                    {section.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Danger zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-3 sm:p-4 lg:p-5"
        >
          <h3 className="font-semibold text-red-700 dark:text-red-400 text-sm sm:text-base">
            Zona de Peligro
          </h3>
          <p className="text-xs sm:text-sm text-red-600 dark:text-red-300 mt-0.5 sm:mt-1 mb-3 sm:mb-4">
            Acciones irreversibles para tu cuenta
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="px-3 sm:px-4 py-2 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors text-xs sm:text-sm font-medium w-full sm:w-auto">
              Exportar todos los datos
            </button>
            <button className="px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium w-full sm:w-auto">
              Eliminar cuenta
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
