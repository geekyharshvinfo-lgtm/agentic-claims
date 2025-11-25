import { Claim, ClaimStatus, SLARisk } from '../types';

export interface DashboardStats {
  total: number;
  byStatus: Record<ClaimStatus, number>;
  bySlaRisk: Record<SLARisk, number>;
  highPriority: number;
}

export function calculateDashboardStats(claims: Claim[]): DashboardStats {
  const stats: DashboardStats = {
    total: claims.length,
    byStatus: {
      'New': 0,
      'Investigating': 0,
      'Ready to Approve': 0,
      'Closed': 0,
    },
    bySlaRisk: {
      'Low': 0,
      'Medium': 0,
      'High': 0,
    },
    highPriority: 0,
  };

  claims.forEach((claim) => {
    stats.byStatus[claim.status]++;
    stats.bySlaRisk[claim.slaRisk]++;
    if (claim.slaRisk === 'High') {
      stats.highPriority++;
    }
  });

  return stats;
}
