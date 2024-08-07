import { createContext, useCallback, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { ToastType } from './types';

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
      <Toaster position='bottom-right' reverseOrder={false} />
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
