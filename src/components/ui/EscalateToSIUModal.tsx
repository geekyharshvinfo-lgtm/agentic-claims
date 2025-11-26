import { X, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Claim } from '@/types';

interface EscalateToSIUModalProps {
  isOpen: boolean;
  onClose: () => void;
  claim: Claim;
}

export default function EscalateToSIUModal({ isOpen, onClose, claim }: EscalateToSIUModalProps) {
  const [suspiciousDetails, setSuspiciousDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleEscalate = () => {
    if (!suspiciousDetails.trim()) {
      alert('Please provide suspicious details before escalating.');
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
        setSuspiciousDetails('');
        onClose();
      }, 2000);
    }, 500);
  };

  const handleClose = () => {
    if (!isSubmitting && !showSuccess) {
      setSuspiciousDetails('');
      onClose();
    }
  };

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
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Escalate to SIU</h2>
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
                Case has been forwarded to SIU for further investigation.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Case Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Case Details</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Claim ID:</span>
                    <span className="font-semibold text-gray-900">{claim.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Claimant Name:</span>
                    <span className="font-semibold text-gray-900">{claim.claimantName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="font-semibold text-gray-900">{claim.vehicle}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Amount:</span>
                    <span className="font-semibold text-gray-900">₹{claim.estimatedAmount || '0'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">FNOL Date:</span>
                    <span className="font-semibold text-gray-900">{claim.fnolDate}</span>
                  </div>
                </div>
              </div>

              {/* Suspicious Details */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Suspicious Details <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={suspiciousDetails}
                  onChange={(e) => setSuspiciousDetails(e.target.value)}
                  placeholder="Describe the suspicious activities, inconsistencies, or red flags that warrant SIU investigation..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all resize-none"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Provide detailed information about why this claim requires SIU review
                </p>
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
                onClick={handleEscalate}
                disabled={isSubmitting || !suspiciousDetails.trim()}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Escalating...' : 'Escalate to SIU'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
