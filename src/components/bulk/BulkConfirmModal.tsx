import { CheckCircle, AlertTriangle } from 'lucide-react';

interface BulkConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  claimCount: number;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'success' | 'warning' | 'danger';
}

export default function BulkConfirmModal({
  isOpen,
  title,
  message,
  claimCount,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  type = 'success',
}: BulkConfirmModalProps) {
  if (!isOpen) return null;

  const typeStyles = {
    success: {
      icon: CheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      buttonColor: 'bg-green-600 hover:bg-green-700',
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      buttonColor: 'bg-amber-600 hover:bg-amber-700',
    },
    danger: {
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
  };

  const style = typeStyles[type];
  const Icon = style.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`rounded-full p-3 ${style.bgColor}`}>
              <Icon className={`h-6 w-6 ${style.iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 mb-4">{message}</p>
              <div className={`rounded-md p-3 ${style.bgColor} border border-gray-200`}>
                <p className="text-sm font-medium text-gray-900">
                  {claimCount} claim{claimCount !== 1 ? 's' : ''} will be affected
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${style.buttonColor}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
