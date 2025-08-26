'use client';

import { createContext, useContext, ReactNode } from 'react';
import { toast, Toaster, ToastBar } from 'react-hot-toast';
import { Toast, type ToastStatus } from './Toast';

interface ToastContextType {
  showToast: (
    title: string,
    options?: { message?: string; status?: ToastStatus }
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// The custom hook that components will use to show toasts
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// The provider component
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  // Function to trigger a new toast
  const showToast = (
    title: string,
    options: { message?: string; status?: ToastStatus } = {}
  ) => {
    const { message, status = 'info' } = options;
    // toast.custom allows us to render our own React component
    toast.custom(
      (t) => <Toast t={t} title={title} message={message} status={status} />,
      { duration: 5000 } // Default duration
    );
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* The Toaster component from react-hot-toast manages the toast queue */}
      <Toaster position="bottom-right" gutter={8}>
        {/* We can also style the default toast bar if needed, but we use custom */}
        {(t) => <ToastBar toast={t}>{({ icon, message }) => <>{message}</>}</ToastBar>}
      </Toaster>
    </ToastContext.Provider>
  );
};