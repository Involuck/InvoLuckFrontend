# Dashboard Components - InvoLuck Frontend

## Overview

This skill covers the creation and patterns of dashboard-specific components
including metrics, charts, and data displays.

## Dashboard Component Structure

```
src/components/dashboard/
├── ActivityFeed.tsx        # Recent activity list
├── ClientPreview.tsx       # Top clients preview
├── InvoiceStatusChart.tsx  # Pie chart for invoice status
├── MetricCard.tsx          # KPI metric display
├── QuickActions.tsx        # Quick action buttons
├── RevenueChart.tsx        # Line/bar chart for revenue
├── WelcomeHero.tsx         # Welcome banner with stats
└── index.ts                # Export barrel
```

## MetricCard Component

### Purpose

Display key performance indicators (KPIs) with value, change percentage, and
icon.

### Pattern

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: React.ReactNode;
  color?: 'purple' | 'green' | 'blue' | 'orange';
  loading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'purple',
  loading = false
}) => {
  const colorStyles = {
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-100 dark:border-purple-800',
      iconBg: 'bg-purple-100 dark:bg-purple-900/40',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-100 dark:border-green-800',
      iconBg: 'bg-green-100 dark:bg-green-900/40',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    // ... blue, orange
  };

  const styles = colorStyles[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`
        relative overflow-hidden
        rounded-xl sm:rounded-2xl
        border-2 ${styles.border} ${styles.bg}
        p-3 sm:p-4 lg:p-6
        shadow-lg backdrop-blur-sm
        transition-all duration-300
        hover:shadow-xl
      `}
    >
      <div className="flex items-start sm:items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
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
              className={`
                flex items-center mt-1 sm:mt-2 text-xs sm:text-sm font-medium
                ${change.type === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
              `}
            >
              <span>{change.type === 'increase' ? '↗' : '↘'}</span>
              {Math.abs(change.value)}%
            </motion.div>
          )}
        </div>

        {icon && (
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className={`
              flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12
              items-center justify-center rounded-lg sm:rounded-xl
              ${styles.iconBg} flex-shrink-0 ml-2
            `}
          >
            <div className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ${styles.iconColor}`}>
              {icon}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
```

## WelcomeHero Component

### Purpose

Welcome banner with greeting, user info, and quick stats overview.

### Pattern

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface WelcomeHeroProps {
  userName: string;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({ userName }) => {
  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Buenos días', icon: <SunIcon className="h-6 w-6" /> };
    if (hour < 18) return { text: 'Buenas tardes', icon: <SunIcon className="h-6 w-6" /> };
    return { text: 'Buenas noches', icon: <MoonIcon className="h-6 w-6" /> };
  };

  const greeting = getGreeting();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="
        relative overflow-hidden
        bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800
        rounded-xl sm:rounded-2xl
        p-4 sm:p-6 lg:p-8
        text-white shadow-2xl
      "
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-white/5 rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Greeting */}
        <div className="flex items-center space-x-2 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-yellow-300"
          >
            {greeting.icon}
          </motion.div>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold">
            {greeting.text}, {userName}
          </h1>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {[
            { label: 'Facturas este mes', value: '24', change: '+12%' },
            { label: 'Ingresos totales', value: '$45,230', change: '+8.2%' },
            { label: 'Pagos pendientes', value: '3', change: '-25%' },
            { label: 'Clientes activos', value: '127', change: '+15%' }
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4 border border-white/20"
            >
              <p className="text-purple-100 text-[10px] sm:text-xs truncate">
                {stat.label}
              </p>
              <p className="text-base sm:text-xl md:text-2xl font-bold">
                {stat.value}
              </p>
              <p className="text-green-300 text-[10px] sm:text-xs font-medium">
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-purple-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base shadow-lg"
          >
            Crear Nueva Factura
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base"
          >
            Ver Reportes
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
```

## QuickActions Component

### Purpose

Grid of quick action buttons for common tasks.

### Pattern

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  UserPlusIcon,
  ChartBarIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
  primary?: boolean;
}

const quickActions: QuickAction[] = [
  {
    id: 'create-invoice',
    label: 'Crear Factura',
    icon: <DocumentTextIcon className="h-5 w-5" />,
    color: 'bg-gradient-to-r from-purple-600 to-purple-700',
    onClick: () => {},
    primary: true
  },
  {
    id: 'add-client',
    label: 'Agregar Cliente',
    icon: <UserPlusIcon className="h-5 w-5" />,
    color: 'bg-gradient-to-r from-blue-600 to-blue-700',
    onClick: () => {}
  },
  // ... more actions
];

export const QuickActions: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-4 sm:p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          Acciones Rápidas
        </h3>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="h-2 w-2 bg-purple-500 rounded-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            className={`
              relative overflow-hidden
              rounded-lg sm:rounded-xl
              p-3 sm:p-4
              text-white font-medium
              shadow-md hover:shadow-lg
              transition-all duration-300
              ${action.color}
              ${action.primary ? 'col-span-2' : ''}
            `}
          >
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2">
              {action.icon}
              <span className="text-xs sm:text-sm font-medium truncate">
                {action.label}
              </span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
```

## Chart Components

### RevenueChart (with Recharts)

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const data = [
  { month: 'Ene', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  // ... more data
];

export const RevenueChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Ingresos Mensuales
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
```

## ActivityFeed Component

### Purpose

Display recent activity/events in a timeline format.

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'invoice' | 'payment' | 'client';
  title: string;
  description: string;
  timestamp: Date;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'invoice',
    title: 'Nueva factura creada',
    description: 'Factura #001 para Cliente ABC',
    timestamp: new Date()
  },
  // ... more activities
];

export const ActivityFeed: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Actividad Reciente
      </h3>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className={`
              w-2 h-2 rounded-full mt-2 flex-shrink-0
              ${activity.type === 'invoice' ? 'bg-purple-500' : ''}
              ${activity.type === 'payment' ? 'bg-green-500' : ''}
              ${activity.type === 'client' ? 'bg-blue-500' : ''}
            `} />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activity.description}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {formatDate(activity.timestamp)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
```

## Export Barrel

Location: `src/components/dashboard/index.ts`

```typescript
export { MetricCard } from './MetricCard';
export { WelcomeHero } from './WelcomeHero';
export { QuickActions } from './QuickActions';
export { RevenueChart } from './RevenueChart';
export { InvoiceStatusChart } from './InvoiceStatusChart';
export { ActivityFeed } from './ActivityFeed';
export { ClientPreview } from './ClientPreview';
```

## Best Practices

1. **Responsive first**: All components should work on mobile
2. **Loading states**: Include loading prop with skeleton/shimmer
3. **Dark mode**: Support both light and dark themes
4. **Animations**: Use Framer Motion for smooth transitions
5. **Accessibility**: Include proper aria labels and roles
6. **Empty states**: Handle cases with no data gracefully
7. **Error handling**: Display user-friendly error messages
