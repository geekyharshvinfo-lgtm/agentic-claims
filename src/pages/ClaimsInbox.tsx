import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Clock, AlertCircle, Home } from 'lucide-react';
import { useClaims } from '../contexts/ClaimsContext';
import { ClaimStatus, SLARisk } from '../types';
import { cn } from '../utils/cn';
import BulkActionBar from '../components/bulk/BulkActionBar';
import BulkConfirmModal from '../components/bulk/BulkConfirmModal';

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
  const { claims } = useClaims();
  const [selectedClaims, setSelectedClaims] = useState<Set<string>>(new Set());
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    message: string;
    action: () => void;
  }>({
    title: '',
    message: '',
    action: () => {},
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedClaims(new Set(claims.map(c => c.id)));
    } else {
      setSelectedClaims(new Set());
    }
  };

  const handleSelectClaim = (claimId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedClaims);
    if (newSelected.has(claimId)) {
      newSelected.delete(claimId);
    } else {
      newSelected.add(claimId);
    }
    setSelectedClaims(newSelected);
  };

  const handleBulkApprove = () => {
    setModalConfig({
      title: 'Approve Selected Claims',
      message: 'Are you sure you want to approve these claims? This action cannot be undone.',
      action: () => {
        console.log('Approving claims:', Array.from(selectedClaims));
        alert(`Successfully approved ${selectedClaims.size} claims!`);
        setSelectedClaims(new Set());
        setShowConfirmModal(false);
      },
    });
    setShowConfirmModal(true);
  };

  const handleBulkAssign = () => {
    const assignee = prompt('Enter assignee name:');
    if (assignee) {
      console.log('Assigning claims to:', assignee, Array.from(selectedClaims));
      alert(`Successfully assigned ${selectedClaims.size} claims to ${assignee}!`);
      setSelectedClaims(new Set());
    }
  };

  const handleBulkExport = () => {
    const selectedData = claims.filter(c => selectedClaims.has(c.id));
    const csv = [
      ['Claim ID', 'Claimant', 'Vehicle', 'FNOL Date', 'Status', 'SLA Risk'].join(','),
      ...selectedData.map(c => 
        [c.id, c.claimantName, c.vehicle, c.fnolDate, c.status, c.slaRisk].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `claims-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRowClick = (claimId: string) => {
    navigate(`/claims/${claimId}`);
  };

  const isAllSelected = selectedClaims.size === claims.length && claims.length > 0;
  const isSomeSelected = selectedClaims.size > 0 && selectedClaims.size < claims.length;

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
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Home className="w-4 h-4" />
                Dashboard
              </Link>
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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Claims Inbox</h2>
            <p className="text-sm text-gray-600">Review and process insurance claims</p>
          </div>
          {selectedClaims.size > 0 && (
            <div className="text-sm text-gray-600">
              {selectedClaims.size} of {claims.length} selected
            </div>
          )}
        </div>

        {/* Claims Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={input => {
                        if (input) {
                          input.indeterminate = isSomeSelected;
                        }
                      }}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
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
                {claims.map((claim) => (
                  <tr
                    key={claim.id}
                    onClick={() => handleRowClick(claim.id)}
                    className={cn(
                      'hover:bg-gray-50 cursor-pointer transition-colors',
                      selectedClaims.has(claim.id) && 'bg-blue-50'
                    )}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedClaims.has(claim.id)}
                        onChange={(e) => handleSelectClaim(claim.id, e as any)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
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
            <div className="text-2xl font-bold text-gray-900">{claims.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-500 mb-1">Investigating</div>
            <div className="text-2xl font-bold text-yellow-600">
              {claims.filter(c => c.status === 'Investigating').length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-500 mb-1">Ready to Approve</div>
            <div className="text-2xl font-bold text-green-600">
              {claims.filter(c => c.status === 'Ready to Approve').length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-500 mb-1">High SLA Risk</div>
            <div className="text-2xl font-bold text-red-600">
              {claims.filter(c => c.slaRisk === 'High').length}
            </div>
          </div>
        </div>
      </main>

      {/* Bulk Action Bar */}
      <BulkActionBar
        selectedCount={selectedClaims.size}
        onApprove={handleBulkApprove}
        onAssign={handleBulkAssign}
        onExport={handleBulkExport}
        onClearSelection={() => setSelectedClaims(new Set())}
      />

      {/* Confirmation Modal */}
      <BulkConfirmModal
        isOpen={showConfirmModal}
        title={modalConfig.title}
        message={modalConfig.message}
        claimCount={selectedClaims.size}
        confirmLabel="Approve"
        onConfirm={modalConfig.action}
        onCancel={() => setShowConfirmModal(false)}
        type="success"
      />
    </div>
  );
}
