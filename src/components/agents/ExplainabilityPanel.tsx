import { CheckSquare, Square, FileCheck } from 'lucide-react';
import { evidenceData, historicalMatches, verificationChecklist } from '@/data/agentResponses';

export default function ExplainabilityPanel() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 space-y-6">
        {/* Evidence Used */}
        <div>
          <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-primary-600" />
            Evidence Used
          </h5>
          <div className="space-y-2">
            {evidenceData.map((evidence, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-900 mb-1">{evidence.source}</div>
                  <div className="text-xs text-gray-600">{evidence.description}</div>
                </div>
                <div className="flex-shrink-0">
                  <div className="text-xs font-semibold text-primary-600">
                    {(evidence.matchScore * 100).toFixed(0)}%
                  </div>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-primary-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${evidence.matchScore * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearest Historical Matches */}
        <div>
          <h5 className="text-sm font-semibold text-gray-900 mb-3">Nearest Historical Matches</h5>
          <div className="space-y-2">
            {historicalMatches.map((match, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-900">{match.caseId}</div>
                  <div className="text-xs text-gray-600">{match.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-Generated Verification Checklist */}
        <div>
          <h5 className="text-sm font-semibold text-gray-900 mb-3">
            Auto-Generated Verification Checklist
          </h5>
          <div className="space-y-2">
            {verificationChecklist.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
                <div className="text-xs text-gray-700">{item.task}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-800">
              <strong>Note:</strong> Complete these verification steps before final approval to ensure claim accuracy and reduce fraud risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
