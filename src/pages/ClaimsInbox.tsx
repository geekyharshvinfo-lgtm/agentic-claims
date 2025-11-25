import { useNavigate } from 'react-router-dom';
import { FileText, Clock, AlertCircle } from 'lucide-react';
import { sampleClaims } from '@/data/sampleClaims';
import { ClaimStatus, SLARisk } from '@/types';
import { cn } from '@/utils/cn';

const statusColors: Record<ClaimStatus, string> = {
  'New': 'bg-blue-100 text-blue-800',
  'Investigating': 'bg-yellow-100 text-yellow-800',
  'Ready to Approve': 'bg-green-100 text-green-800',
  'Closed': 'bg-gray-100 text-gray-800',
};

const slaRiskColors: Record<SLARisk, string> = {
  'Low': 'text-green-600',
  'Medium': 'text-yellow-600',
  'High': 'text-red-600',
};

export default function ClaimsInbox() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Agentic Claims</h1>
                <p className="text-sm text-gray-500">AI-Powered Insurance Claims Processing</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Adjuster Dashboard</p>
                <p className="text-xs text-gray-500">Last updated: Just now</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Claims Inbox</h2>
          <p className="text-sm text-gray-600">Review and process insurance claims</p>
        </div>

        {/* Claims Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claim ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claimant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    FNOL Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SLA Risk
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    onClick={() => navigate(`/claims/${claim.id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-primary-600">{claim.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{claim.claimantName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{claim.vehicle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-3 h-3" />
                        {claim.fnolDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          statusColors[claim.status]
                        )}
                      >
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <AlertCircle className={cn('w-4 h-4', slaRiskColors[claim.slaRisk])} />
                        <span className={cn('text-sm font-medium', slaRiskColors[claim.slaRisk])}>
                          {claim.slaRisk}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-500 mb-1">Total Claims</div>
            <div className="text-2xl font-bold text-gray-900">{sampleClaims.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-500 mb-1">Investigating</div>
            <div className="text-2xl font-bold text-yellow-600">
              {sampleClaims.filter(c => c.status === 'Investigating').length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-500 mb-1">Ready to Approve</div>
            <div className="text-2xl font-bold text-green-600">
              {sampleClaims.filter(c => c.status === 'Ready to Approve').length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-500 mb-1">High SLA Risk</div>
            <div className="text-2xl font-bold text-red-600">
              {sampleClaims.filter(c => c.slaRisk === 'High').length}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
