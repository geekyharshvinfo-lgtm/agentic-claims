import { Upload, FileText, Image as ImageIcon, Plus } from 'lucide-react';
import { Claim, Document } from '@/types';
import { cn } from '@/utils/cn';

interface ColumnAProps {
  claim: Claim;
  documents: Document[];
}

export default function ColumnA({ claim, documents }: ColumnAProps) {
  const getDocumentIcon = (type: Document['type']) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-4 h-4" />;
      case 'pdf':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Claim Summary */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Claim Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Claim ID</span>
              <span className="font-medium text-gray-900">{claim.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Claimant</span>
              <span className="font-medium text-gray-900">{claim.claimantName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Vehicle</span>
              <span className="font-medium text-gray-900 text-right">{claim.vehicle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">FNOL Time</span>
              <span className="font-medium text-gray-900">{claim.fnolDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className={cn(
                'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                claim.status === 'Investigating' && 'bg-yellow-100 text-yellow-800'
              )}>
                {claim.status}
              </span>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Uploaded Documents */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Uploaded Documents ({documents.length})
          </h3>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors group"
              >
                <div className={cn(
                  'flex-shrink-0 w-8 h-8 rounded flex items-center justify-center',
                  doc.type === 'image' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'
                )}>
                  {getDocumentIcon(doc.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate group-hover:text-primary-600 transition-colors">
                    {doc.name}
                  </p>
                  <p className="text-xs text-gray-500">{doc.uploadedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Upload More Files */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Upload More Files</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 hover:bg-primary-50/50 transition-all cursor-pointer group">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-primary-600 transition-colors" />
            <p className="text-sm text-gray-600 mb-1">Drag & drop files here</p>
            <p className="text-xs text-gray-500">or click to browse</p>
          </div>
        </div>

        {/* Request More Documents */}
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Plus className="w-4 h-4" />
          Request More Documents
        </button>
      </div>
    </div>
  );
}
