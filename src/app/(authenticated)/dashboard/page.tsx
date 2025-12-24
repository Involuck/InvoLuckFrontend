'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Layout Components
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Dashboard Components
import { WelcomeHero } from '@/components/dashboard/WelcomeHero';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { InvoiceStatusChart } from '@/components/dashboard/InvoiceStatusChart';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { ClientPreview } from '@/components/dashboard/ClientPreview';

// Iconos simples
const DocumentTextIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const CurrencyDollarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <WelcomeHero userName="Usuario" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        >
          <MetricCard
            title="Facturas Totales"
            value="78"
            change={{ value: 12, type: 'increase' }}
            icon={<DocumentTextIcon className="h-6 w-6" />}
            color="purple"
          />
          <MetricCard
            title="Ingresos del Mes"
            value="$45,230"
            change={{ value: 8.2, type: 'increase' }}
            icon={<CurrencyDollarIcon className="h-6 w-6" />}
            color="green"
          />
          <MetricCard
            title="Clientes Activos"
            value="127"
            change={{ value: 15, type: 'increase' }}
            icon={<UsersIcon className="h-6 w-6" />}
            color="blue"
          />
          <MetricCard
            title="Pagos Pendientes"
            value="3"
            change={{ value: 25, type: 'decrease' }}
            icon={<ClockIcon className="h-6 w-6" />}
            color="orange"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            <RevenueChart />
            <QuickActions />
          </div>

          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <InvoiceStatusChart />
            <ActivityFeed />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <ClientPreview />
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
