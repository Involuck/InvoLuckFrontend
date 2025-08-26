'use client';

import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { toast, type Toast as ToastType } from 'react-hot-toast';

// Define the possible statuses for our toasts
export type ToastStatus = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  t: ToastType; // The toast object from react-hot-toast
  status?: ToastStatus;
  title: string;
  message?: string;
}

// A map of statuses to their corresponding icon and color classes
const statusConfig = {
  success: {
    Icon: CheckCircleIcon,
    iconClass: 'text-green-500',
    progressClass: 'bg-green-500'
  },
  error: {
    Icon: XCircleIcon,
    iconClass: 'text-red-500',
    progressClass: 'bg-red-500'
  },
  warning: {
    Icon: ExclamationTriangleIcon,
    iconClass: 'text-yellow-500',
    progressClass: 'bg-yellow-500'
  },
  info: {
    Icon: InformationCircleIcon,
    iconClass: 'text-blue-500',
    progressClass: 'bg-blue-500'
  }
};

export const Toast = ({ t, status = 'info', title, message }: ToastProps) => {
  const { Icon, iconClass } = statusConfig[status];

  return (
    <div
      className={clsx(
        'flex w-full max-w-sm transform items-start gap-4 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5 transition-all duration-300 ease-in-out dark:bg-slate-800 dark:ring-white/10',
        {
          'animate-in slide-in-from-top-full': t.visible,
          'animate-out slide-out-to-right-full': !t.visible
        }
      )}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <Icon className={clsx('size-6', iconClass)} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
          {title}
        </p>
        {message && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {message}
          </p>
        )}
      </div>

      {/* Close Button */}
      <div className="flex-shrink-0">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="inline-flex rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:hover:bg-slate-700"
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
