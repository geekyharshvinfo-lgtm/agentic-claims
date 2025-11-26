import { Link } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  Wallet,
  CreditCard
} from 'lucide-react';
import { useClaims } from '../contexts/ClaimsContext';
import { calculateDashboardStats } from '../utils/dashboardStats';
import StatsCard from '../components/dashboard/StatsCard';

export default function Dashboard() {
  const { claims } = useClaims();
  const stats = calculateDashboardStats(claims);

  // Calculate financial stats
  const totalClaimAmount = claims.reduce((sum, claim) => {
    const amount = parseFloat(claim.estimatedAmount || '0');
    return sum + amount;
  }, 0);

  const disbursedAmount = claims.reduce((sum, claim) => {
    return sum + (claim.disbursedAmount || 0);
  }, 0);

  const pendingAmount = totalClaimAmount - disbursedAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Claims Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Overview of all claims and their current status
              </p>
            </div>
            <Link
              to="/claims"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              View All Claims
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Financial Overview Cards */}
        <div className="grid gap-6 sm:grid-cols-3 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Wallet className="w-8 h-8" />
              </div>
            </div>
            <p className="text-blue-100 text-sm font-medium mb-1">Total Claim Amount</p>
            <p className="text-3xl font-bold mb-2">{formatCurrency(totalClaimAmount)}</p>
            <p className="text-blue-100 text-xs">Across all claims</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <DollarSign className="w-8 h-8" />
              </div>
            </div>
            <p className="text-green-100 text-sm font-medium mb-1">Amount Disbursed</p>
            <p className="text-3xl font-bold mb-2">{formatCurrency(disbursedAmount)}</p>
            <p className="text-green-100 text-xs">
              {totalClaimAmount > 0 ? `${((disbursedAmount / totalClaimAmount) * 100).toFixed(1)}% of total` : '0% of total'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <CreditCard className="w-8 h-8" />
              </div>
            </div>
            <p className="text-amber-100 text-sm font-medium mb-1">Pending Disbursement</p>
            <p className="text-3xl font-bold mb-2">{formatCurrency(pendingAmount)}</p>
            <p className="text-amber-100 text-xs">
              {totalClaimAmount > 0 ? `${((pendingAmount / totalClaimAmount) * 100).toFixed(1)}% of total` : '0% of total'}
            </p>
          </div>
        </div>

        {/* Stats Cards Grid - Compact Inline Design */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Claims"
            value={stats.total}
            icon={FileText}
            color="blue"
          />
          <StatsCard
            title="New Claims"
            value={stats.byStatus.New}
            icon={FileText}
            color="blue"
          />
          <StatsCard
            title="High Priority"
            value={stats.highPriority}
            icon={AlertTriangle}
            color="red"
          />
          <StatsCard
            title="Ready to Approve"
            value={stats.byStatus['Ready to Approve']}
            icon={CheckCircle}
            color="green"
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/claims"
              className="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-4 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FileText className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">View All Claims</p>
                <p className="text-sm text-gray-600">Browse complete claims list</p>
              </div>
            </Link>

            <Link
              to="/admin/create-claim"
              className="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-4 hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <FileText className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Create New Claim</p>
                <p className="text-sm text-gray-600">Manually add a claim</p>
              </div>
            </Link>

            <Link
              to="/claims?filter=high-priority"
              className="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-4 hover:border-red-500 hover:bg-red-50 transition-colors"
            >
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div>
                <p className="font-medium text-gray-900">High Priority Claims</p>
                <p className="text-sm text-gray-600">Review urgent cases</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* By Status */}
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Claims by Status</h2>
            <div className="space-y-3">
              {Object.entries(stats.byStatus).map(([status, count]) => {
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                const colors = {
                  'New': 'bg-blue-500',
                  'Investigating': 'bg-amber-500',
                  'Ready to Approve': 'bg-green-500',
                  'Closed': 'bg-gray-500',
                };
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{status}</span>
                      <span className="text-sm text-gray-600">{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors[status as keyof typeof colors]} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* By SLA Risk */}
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Claims by SLA Risk</h2>
            <div className="space-y-3">
              {Object.entries(stats.bySlaRisk).map(([risk, count]) => {
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                const colors = {
                  'High': 'bg-red-500',
                  'Medium': 'bg-amber-500',
                  'Low': 'bg-green-500',
                };
                return (
                  <div key={risk}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{risk} Risk</span>
                      <span className="text-sm text-gray-600">{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors[risk as keyof typeof colors]} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
