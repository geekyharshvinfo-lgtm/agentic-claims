import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
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

  const { agents, isRunning, isComplete } = useAgentSimulation(true);

  // Update payout when claim changes
  useEffect(() => {
    setPayout(claimData.payout.amount);
    setNotes(''); // Reset notes when switching claims
  }, [claimId, claimData.payout.amount]);

  if (!claim) {
    return <div>Claim not found</div>;
  }

  const handleApprove = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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
        <ColumnC agents={agents} isRunning={isRunning} isComplete={isComplete} />
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="font-medium">Claim approved. Payout generated (simulated).</span>
        </div>
      )}
    </div>
  );
}
