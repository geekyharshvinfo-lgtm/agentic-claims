import { X, MessageSquare, CheckCircle, Upload } from 'lucide-react';
import { useState } from 'react';
import { Claim } from '@/types';
import CustomSelect from './CustomSelect';

interface RequestMoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  claim: Claim;
}

export default function RequestMoreInfoModal({ isOpen, onClose, claim }: RequestMoreInfoModalProps) {
  const [requestType, setRequestType] = useState('');
  const [requestDetails, setRequestDetails] = useState('');
  const [requiresDocuments, setRequiresDocuments] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!requestType || !requestDetails.trim()) {
      alert('Please select a request type and provide details.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setRequestType('');
        setRequestDetails('');
        setRequiresDocuments(false);
        onClose();
      }, 2000);
    }, 500);
  };

  const handleClose = () => {
    if (!isSubmitting && !showSuccess) {
      setRequestType('');
      setRequestDetails('');
      setRequiresDocuments(false);
      onClose();
    }
  };

  const requestTypes = [
    { value: 'additional-documents', label: 'Additional Documents' },
    { value: 'photo-evidence', label: 'Photo Evidence' },
    { value: 'clarification', label: 'Clarification Required' },
    { value: 'witness-info', label: 'Witness Information' },
    { value: 'police-report', label: 'Police Report' },
    { value: 'medical-records', label: 'Medical Records' },
    { value: 'repair-estimates', label: 'Repair Estimates' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Request More Information</h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting || showSuccess}
            className="text-white/80 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Message */}
        {showSuccess ? (
          <div className="p-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600">
                A query has been raised with the claimant.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Claim Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-blue-900 font-semibold">Claim ID: {claim.id}</span>
                  <span className="text-blue-700">{claim.claimantName}</span>
                </div>
              </div>

              {/* Request Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Request Type <span className="text-red-600">*</span>
                </label>
                <CustomSelect
                  value={requestType}
                  onChange={setRequestType}
                  options={requestTypes}
                  placeholder="Select request type..."
                  disabled={isSubmitting}
                />
              </div>

              {/* Request Details */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Questions / Details <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={requestDetails}
                  onChange={(e) => setRequestDetails(e.target.value)}
                  placeholder="Describe what information or documents you need from the claimant..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Be specific about what you need to continue processing this claim
                </p>
              </div>

              {/* Document Upload Request */}
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requiresDocuments}
                    onChange={(e) => setRequiresDocuments(e.target.checked)}
                    disabled={isSubmitting}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Request Document Upload
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Check this if the claimant needs to upload specific documents
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex gap-3">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={isSubmitting || !requestType || !requestDetails.trim()}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
