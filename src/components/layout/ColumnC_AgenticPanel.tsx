import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AgentOutput } from '@/types';
import { ClaimSpecificData } from '@/data/claimSpecificData';
import AgentTimeline from '@/components/agents/AgentTimeline';
import AgentConversation from '@/components/agents/AgentConversation';
import ExplainabilityPanel from '@/components/agents/ExplainabilityPanel';

interface ColumnCProps {
  agents: AgentOutput[];
  isRunning: boolean;
  isComplete: boolean;
  claimData: ClaimSpecificData;
}

export default function ColumnC({ agents, isRunning, isComplete, claimData }: ColumnCProps) {
  const [showExplainability, setShowExplainability] = useState(false);

  return (
    <div className="w-[420px] bg-white border-l border-gray-200 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
        <h3 className="text-lg font-bold text-gray-900">Agentic Activity</h3>
        <p className="text-sm text-gray-500">
          {isRunning ? 'AI agents working...' : isComplete ? 'Investigation complete' : 'Waiting to start...'}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Agent Timeline */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Agent Timeline</h4>
          <AgentTimeline agents={agents} />
        </div>

        {/* Explainability Panel */}
        {isComplete && (
          <div>
            <button
              onClick={() => setShowExplainability(!showExplainability)}
              className="w-full flex items-center justify-between p-4 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">?</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-primary-700">
                    Why the Agent Reached This Decision
                  </div>
                  <div className="text-xs text-gray-600">Click to expand explainability</div>
                </div>
              </div>
              {showExplainability ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {showExplainability && (
              <div className="mt-3">
                <ExplainabilityPanel />
              </div>
            )}
          </div>
        )}

        {/* Agent Conversation Thread */}
        {agents.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Agent Conversation</h4>
            <AgentConversation agents={agents} agentConversation={claimData.agentConversation} />
          </div>
        )}

        {/* Final Summary */}
        {isComplete && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg">✓</span>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-green-900 mb-1">
                  Investigation Complete
                </h5>
                <p className="text-xs text-green-700 leading-relaxed">
                  All 6 agents have completed their analysis. The system recommends approving the claim with a payout of ₹{claimData.payout.amount.toLocaleString()} (confidence: {Math.round(claimData.confidence * 100)}%). Review the decision card below to proceed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
