import { IndianRupee, CheckCircle, AlertTriangle, Share2 } from 'lucide-react';
import { AgentOutput } from '@/types';

interface DecisionCardProps {
  payout: number;
  setPayout: (value: number) => void;
  notes: string;
  setNotes: (value: string) => void;
  onApprove: () => void;
  agents: AgentOutput[];
}

export default function DecisionCard({
  payout,
  setPayout,
  notes,
  setNotes,
  onApprove,
  agents,
}: DecisionCardProps) {
  const payoutAgent = agents.find(a => a.type === 'payout');
  const confidence = payoutAgent?.confidence || 0;

  return (
    <div className="bg-white rounded-lg border-2 border-primary-200 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
        <h3 className="text-lg font-bold text-white">Settlement Recommendation</h3>
        <p className="text-sm text-primary-100">AI-generated decision ready for review</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Liability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Liability Assessment
          </label>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-900">Claimant At-Fault</span>
            </div>
            <p className="text-sm text-amber-700">
              Single-vehicle collision. Evidence contradicts claimant statement.
            </p>
          </div>
        </div>

        {/* Recommended Payout */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recommended Payout
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={payout}
              onChange={(e) => setPayout(Number(e.target.value))}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg text-2xl font-bold text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Breakdown: ₹34,500 (repairs) + ₹7,700 (towing, admin)
          </p>
        </div>

        {/* Confidence */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">AI Confidence</label>
            <span className="text-sm font-bold text-gray-900">{Math.round(confidence * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000 ease-out"
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adjuster Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional observations or comments..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onApprove}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <CheckCircle className="w-5 h-5" />
            Approve & Mark Paid
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all">
              Request More Info
            </button>
            <button className="px-4 py-2 border-2 border-red-300 text-red-700 font-medium rounded-lg hover:bg-red-50 transition-all flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Escalate to SIU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
