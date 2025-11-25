export type ClaimStatus = 'New' | 'Investigating' | 'Ready to Approve' | 'Closed';

export type SLARisk = 'Low' | 'Medium' | 'High';

export type AgentStatus = 'queued' | 'running' | 'completed' | 'error';

export type AgentType = 
  | 'document_ingest'
  | 'vision'
  | 'document_analysis'
  | 'liability'
  | 'fraud'
  | 'payout';

export interface Claim {
  id: string;
  claimantName: string;
  status: ClaimStatus;
  vehicle: string;
  fnolDate: string;
  slaRisk: SLARisk;
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'text';
  url: string;
  uploadedAt: string;
}

export interface AgentOutput {
  type: AgentType;
  status: AgentStatus;
  summary: string;
  detailedReasoning: string;
  timestamp: string;
  confidence?: number;
  data?: Record<string, any>;
}

export interface AgentMessage {
  agentType: AgentType;
  message: string;
  timestamp: string;
}

export interface Evidence {
  source: string;
  description: string;
  matchScore: number;
}

export interface HistoricalCase {
  caseId: string;
  description: string;
}

export interface VerificationItem {
  task: string;
  completed: boolean;
}

export interface ClaimDetails {
  claim: Claim;
  documents: Document[];
  fnolSummary: string;
  liability: string;
  recommendedPayout: number;
  confidence: number;
  notes: string;
}
