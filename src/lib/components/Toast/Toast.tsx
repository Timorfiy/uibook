import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, Info, WarningCircle, X } from '@phosphor-icons/react';
import { cn } from '../../utils/cn';
import './Toast.css';

export type ToastTone = 'default' | 'success' | 'error';

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  /** ms before auto-dismiss. 0 keeps the toast until dismissed. */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
  leaving?: boolean;
}

interface ToastApi {
  push: (toast: ToastOptions) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast() must be used inside <ToastProvider>.');
  return ctx;
}

const MAX_VISIBLE = 4;
const EXIT_MS = 200;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((ts) => ts.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    window.setTimeout(() => {
      setToasts((ts) => ts.filter((t) => t.id !== id));
    }, EXIT_MS);
  }, []);

  const push = useCallback(
    (toast: ToastOptions) => {
      const id = ++idRef.current;
      setToasts((ts) => [...ts.slice(-(MAX_VISIBLE - 1)), { ...toast, id }]);
      const duration = toast.duration ?? 4200;
      if (duration > 0) window.setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      {createPortal(
        <div className="uib-toast-viewport" aria-live="polite">
          {toasts.map((t) => (
            <ToastView key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

const toneIcon: Record<ToastTone, ReactNode> = {
  default: <Info size={20} weight="fill" />,
  success: <CheckCircle size={20} weight="fill" />,
  error: <WarningCircle size={20} weight="fill" />,
};

function ToastView({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const tone = toast.tone ?? 'default';
  return (
    <div
      className={cn(
        'uib-toast',
        'uib-glass',
        `uib-toast--${tone}`,
        toast.leaving && 'uib-toast--leaving',
      )}
      role="status"
    >
      <span className="uib-toast__icon" aria-hidden>
        {toneIcon[tone]}
      </span>
      <div className="uib-toast__content">
        <p className="uib-toast__title">{toast.title}</p>
        {toast.description ? <p className="uib-toast__description">{toast.description}</p> : null}
      </div>
      <button type="button" className="uib-toast__close" aria-label="Dismiss" onClick={onDismiss}>
        <X size={14} weight="bold" />
      </button>
    </div>
  );
}
