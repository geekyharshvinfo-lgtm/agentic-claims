import { CheckCircle, UserPlus, Download, X } from 'lucide-react';

interface BulkActionBarProps {
  selectedCount: number;
  onApprove: () => void;
  onAssign: () => void;
  onExport: () => void;
  onClearSelection: () => void;
}

export default function BulkActionBar({
  selectedCount,
  onApprove,
  onAssign,
  onExport,
  onClearSelection,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg border-2 border-blue-500 p-4 flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-md">
          <span className="text-sm font-medium text-blue-900">
            {selectedCount} claim{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="h-6 w-px bg-gray-300" />

        <div className="flex items-center gap-2">
          <button
            onClick={onApprove}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <CheckCircle className="h-4 w-4" />
            Approve Selected
          </button>

          <button
            onClick={onAssign}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <UserPlus className="h-4 w-4" />
            Assign
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            <Download className="h-4 w-4" />
            Export
          </button>

          <div className="h-6 w-px bg-gray-300" />

          <button
            onClick={onClearSelection}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            title="Clear selection"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
