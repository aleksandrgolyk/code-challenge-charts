import { createContext, useCallback, useContext } from 'react';

import { Toast } from '@/components/Toast';
import { ToastType } from './types';
import toast from 'react-hot-toast';

interface ToastProps {
  renderToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastProps | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const renderToast = useCallback((type: ToastType, message: string) => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }, []);

  return (
    <ToastContext.Provider value={{ renderToast }}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
}

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
