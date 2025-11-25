import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { sampleClaims, sampleDocuments } from '@/data/sampleClaims';
import { claimDataMap } from '@/data/claimSpecificData';
import { useAgentSimulation } from '@/hooks/useAgentSimulation';
import ColumnA from '@/components/layout/ColumnA_ClaimInfo';
import ColumnB from '@/components/layout/ColumnB_Investigation';
import ColumnC from '@/components/layout/ColumnC_AgenticPanel';

export default function AdjusterWorkspace() {
  const { claimId } = useParams();
  const navigate = useNavigate();
  
  const claim = sampleClaims.find(c => c.id === claimId);
  const claimData = claimDataMap[claimId || ''] || claimDataMap['AC-2025-00124'];
  
  const [payout, setPayout] = useState(claimData.payout.amount);
  const [notes, setNotes] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { agents, isRunning, isComplete } = useAgentSimulation(true, claimId);

  // Update payout when claim changes
  useEffect(() => {
    setPayout(claimData.payout.amount);
    setNotes(''); // Reset notes when switching claims
  }, [claimId, claimData.payout.amount]);

  if (!claim) {
    return <div>Claim not found</div>;
  }

  const handleApprove = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSettlement = () => {
    // Update claim status to "Settled"
    const claimIndex = sampleClaims.findIndex(c => c.id === claimId);
    if (claimIndex !== -1) {
      sampleClaims[claimIndex].status = 'Settled';
    }

    // Close modal and show success toast
    setShowConfirmModal(false);
    setShowToast(true);

    // Navigate back to claims list after 2 seconds
    setTimeout(() => {
      navigate('/claims');
    }, 2000);
  };

  const handleCancelSettlement = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/claims')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Claims</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">{claim.id}</h1>
                  <p className="text-xs text-gray-500">{claim.claimantName}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Adjuster Workspace</p>
              <p className="text-xs text-gray-500">Auto-investigation in progress</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <main className="flex h-[calc(100vh-73px)]" key={claimId}>
        {/* Column A: Claim Info & Documents */}
        <ColumnA claim={claim} documents={sampleDocuments} />

        {/* Column B: Investigation Workspace */}
        <ColumnB
          documents={sampleDocuments}
          payout={payout}
          setPayout={setPayout}
          notes={notes}
          setNotes={setNotes}
          onApprove={handleApprove}
          isComplete={isComplete}
          claimData={claimData}
        />

        {/* Column C: Agentic Activity Panel */}
        <ColumnC agents={agents} isRunning={isRunning} isComplete={isComplete} claimData={claimData} />
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Confirm Claim Settlement</h3>
              </div>
              <button
                onClick={handleCancelSettlement}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-4">
              <p className="text-gray-700">
                You are about to settle claim <span className="font-semibold text-gray-900">{claim.id}</span>
              </p>

              {/* Verification Checklist */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Claimant details verified</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Agentic analysis reviewed</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Documentation complete</span>
                </div>
              </div>

              {/* Settlement Amount */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Settlement Amount</p>
                <p className="text-2xl font-bold text-gray-900">₹{payout.toLocaleString('en-IN')}</p>
              </div>

              {/* Warning Message */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-semibold mb-1">This is an irreversible action.</p>
                    <p>Proceeding will permanently settle this case and process the reimbursement amount.</p>
                  </div>
                </div>
              </div>

              <p className="text-center text-gray-700 font-medium">
                Are you sure you want to continue?
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button
                onClick={handleCancelSettlement}
                className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSettlement}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Confirm Settlement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom">
          <CheckCircle className="w-5 h-5" />
          <div>
            <p className="font-semibold">Claim Settled Successfully</p>
            <p className="text-sm text-green-100">₹{payout.toLocaleString('en-IN')} processed • Returning to claims list...</p>
          </div>
        </div>
      )}
    </div>
  );
}
