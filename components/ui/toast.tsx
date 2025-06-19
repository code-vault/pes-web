"use client";
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
}

import { createContext, useContext } from 'react';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id, duration: toast.duration || 5000 };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, newToast.duration);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getToastStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              max-w-sm w-full rounded-lg border p-4 shadow-lg
              transform transition-all duration-300 ease-in-out
              animate-in slide-in-from-right
              ${getToastStyles(toast.type)}
            `}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getIcon(toast.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold">{toast.title}</h4>
                <p className="text-sm mt-1 leading-relaxed">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 ml-4 p-1 rounded-full hover:bg-black/5 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Hook for easy toast usage
export const useContactToast = () => {
  const { showToast } = useToast();

  const showSuccessToast = (message: string, title = 'Success!') => {
    showToast({
      type: 'success',
      title,
      message,
      duration: 6000
    });
  };

  const showErrorToast = (message: string, title = 'Error') => {
    showToast({
      type: 'error',
      title,
      message,
      duration: 8000
    });
  };

  const showInfoToast = (message: string, title = 'Info') => {
    showToast({
      type: 'info',
      title,
      message,
      duration: 5000
    });
  };

  return {
    showSuccessToast,
    showErrorToast,
    showInfoToast
  };
};