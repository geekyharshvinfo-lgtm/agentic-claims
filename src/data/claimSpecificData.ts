import { AgentOutput, AgentMessage } from '@/types';

export interface ClaimSpecificData {
  fnolSummary: {
    location: string;
    incidentTime: string;
    fnolTime: string;
    description: string;
    weather: string;
    injuries: string;
  };
  liability: {
    assessment: 'Claimant At-Fault' | 'Third-Party At-Fault' | 'Shared Fault' | 'No-Fault';
    description: string;
  };
  payout: {
    amount: number;
    breakdown: string;
  };
  confidence: number;
  agentOutputs: AgentOutput[];
  agentConversation: AgentMessage[];
}

export const claimDataMap: Record<string, ClaimSpecificData> = {
  // AC-2025-00124: Rahul Sharma - Front-left collision with contradiction
  'AC-2025-00124': {
    fnolSummary: {
      location: 'MG Road intersection, Mumbai',
      incidentTime: '15 Oct 2025, 22:50 (Police report)',
      fnolTime: '23:40 (FNOL filing)',
      description: 'Single-vehicle collision with barrier. Claimant stated "rear impact" but evidence suggests front-left collision.',
      weather: 'Clear, dry conditions',
      injuries: 'None reported',
    },
    liability: {
      assessment: 'Claimant At-Fault',
      description: 'Single-vehicle collision. Evidence contradicts claimant statement.',
    },
    payout: {
      amount: 42200,
      breakdown: '₹34,500 (repairs) + ₹7,700 (towing, admin)',
    },
    confidence: 0.87,
    agentOutputs: [
      {
        type: 'document_ingest',
        status: 'completed',
        summary: 'Parsed 5 files (FNOL form, 6 photos, police_report.pdf, repair_estimate.pdf, claimant_statement.txt). Extracted 14 key facts.',
        detailedReasoning: 'Successfully ingested all uploaded documents. Key contradiction found: claimant stated "rear impact" but police report indicates front-left collision with barrier.',
        timestamp: '00:00:02',
        confidence: 0.98,
      },
      {
        type: 'vision',
        status: 'completed',
        summary: 'Detected: front-left bumper damage, left headlight shattered, hood dent. Severity: 6/10. Estimated repair cost: ₹34,500 (range: ₹30k–₹39k).',
        detailedReasoning: 'Primary impact zone: Front-left at 45-degree angle. Damage consistent with barrier collision, not rear impact as claimed.',
        timestamp: '00:00:05',
        confidence: 0.89,
      },
      {
        type: 'document_analysis',
        status: 'completed',
        summary: "Police report indicates collision at 22:50 on 15 Oct 2025; witness: 'car hit from front-left.' Claimant statement: 'rear impact' — contradiction flagged.",
        detailedReasoning: 'Major discrepancy detected. Police and witness confirm front-left impact, contradicting claimant account of rear collision.',
        timestamp: '00:00:07',
        confidence: 0.92,
      },
      {
        type: 'liability',
        status: 'completed',
        summary: 'Evidence supports front-left impact. Claimant description contradicts police report. Recommended liability: Claimant at-fault. Confidence 0.80.',
        detailedReasoning: 'Single-vehicle accident with barrier. No third-party involvement. Claimant 100% at-fault despite contradictory statement.',
        timestamp: '00:00:09',
        confidence: 0.80,
      },
      {
        type: 'fraud',
        status: 'completed',
        summary: 'Risk score: 0.62. Reasons: Photo timestamp mismatch (23:08 vs FNOL at 23:40); pattern match to case #18293 (0.83); previous repair activity on same part.',
        detailedReasoning: 'Medium-high fraud risk. Timestamp anomaly and statement contradiction raise concerns. Recommend verification before payout.',
        timestamp: '00:00:11',
        confidence: 0.87,
      },
      {
        type: 'payout',
        status: 'completed',
        summary: 'Recommended payout: ₹42,200 (repair ₹34,500 + towing/admin fees). Confidence 0.87.',
        detailedReasoning: 'Payout approved subject to fraud review clearance and statement clarification.',
        timestamp: '00:00:13',
        confidence: 0.87,
      },
    ],
    agentConversation: [
      { agentType: 'vision', message: 'Detected front-left damage & headlight break. Severity 6/10. Est. cost: ₹34,500.', timestamp: '00:00:03' },
      { agentType: 'document_analysis', message: 'Police report timestamp verified. Witness confirms front-left impact.', timestamp: '00:00:05' },
      { agentType: 'liability', message: 'Claimant statement conflicts with vision + police evidence. Contradiction flagged.', timestamp: '00:00:07' },
      { agentType: 'vision', message: 'Impact angle re-verified. Front-left confirmed.', timestamp: '00:00:09' },
      { agentType: 'fraud', message: 'Timestamp mismatch found. Similar to case #18293. Risk score 0.62.', timestamp: '00:00:11' },
      { agentType: 'payout', message: 'Recommended payout ₹42,200. Confidence 0.87.', timestamp: '00:00:13' },
    ],
  },

  // AC-2025-00123: Priya Patel - Clear third-party fault, rear-end collision
  'AC-2025-00123': {
    fnolSummary: {
      location: 'Nehru Place, New Delhi',
      incidentTime: '14 Oct 2025, 14:15',
      fnolTime: '14:20 (FNOL filing)',
      description: 'Rear-end collision at traffic signal. Other driver admitted fault at scene. Police report confirms third-party liability.',
      weather: 'Sunny, clear visibility',
      injuries: 'Minor whiplash (claimant)',
    },
    liability: {
      assessment: 'Third-Party At-Fault',
      description: 'Third-party driver admitted fault. Police report and witness statements confirm.',
    },
    payout: {
      amount: 85000,
      breakdown: '₹72,000 (repairs) + ₹8,000 (medical) + ₹5,000 (rental, admin)',
    },
    confidence: 0.95,
    agentOutputs: [
      {
        type: 'document_ingest',
        status: 'completed',
        summary: 'Parsed 7 files (FNOL form, police report, medical records, 4 photos, third-party statement). Extracted 18 key facts.',
        detailedReasoning: 'Complete documentation set. Third-party driver provided written admission of fault at scene. Medical records confirm whiplash injury consistent with rear impact.',
        timestamp: '00:00:02',
        confidence: 0.99,
      },
      {
        type: 'vision',
        status: 'completed',
        summary: 'Detected: rear bumper crushed, trunk misalignment, rear lights damaged. Severity: 7/10. Estimated repair cost: ₹72,000.',
        detailedReasoning: 'Clear rear-end collision damage. Impact force suggests 40-50 km/h collision. Damage pattern matches claimant account and police report perfectly.',
        timestamp: '00:00:04',
        confidence: 0.96,
      },
      {
        type: 'document_analysis',
        status: 'completed',
        summary: 'Police report timestamp verified. Witness confirms third-party ran red light. Third-party driver signed admission of fault.',
        detailedReasoning: 'Overwhelming evidence of third-party liability. Driver admitted running red light. Two independent witnesses confirm. No contradictions found.',
        timestamp: '00:00:06',
        confidence: 0.98,
      },
      {
        type: 'liability',
        status: 'completed',
        summary: 'Third-party 100% at-fault. Claimant 0% liability. Clear case with admission of fault and witness corroboration.',
        detailedReasoning: 'Straightforward liability determination. Third-party violated traffic signal. Medical evidence supports injury claim.',
        timestamp: '00:00:08',
        confidence: 0.99,
      },
      {
        type: 'fraud',
        status: 'completed',
        summary: 'Risk score: 0.08. No fraud indicators detected. All evidence consistent. Medical records authentic. Recommend fast-track approval.',
        detailedReasoning: 'Extremely low fraud risk. Timeline consistent, documentation complete, injuries align with impact severity. No red flags.',
        timestamp: '00:00:10',
        confidence: 0.97,
      },
      {
        type: 'payout',
        status: 'completed',
        summary: 'Recommended payout: ₹85,000 (repairs ₹72,000 + medical ₹8,000 + rental/admin ₹5,000). Confidence 0.95. Fast-track approved.',
        detailedReasoning: 'Full payout recommended. Third-party insurance confirmed. Include medical costs and rental vehicle during repairs.',
        timestamp: '00:00:12',
        confidence: 0.95,
      },
    ],
    agentConversation: [
      { agentType: 'document_ingest', message: 'Third-party admission of fault received. Medical records show whiplash injury.', timestamp: '00:00:02' },
      { agentType: 'vision', message: 'Rear-end damage confirmed. Severity 7/10. Repair cost ₹72,000.', timestamp: '00:00:04' },
      { agentType: 'document_analysis', message: 'Police report confirms third-party ran red light. Two witnesses corroborate.', timestamp: '00:00:06' },
      { agentType: 'liability', message: 'Clear third-party fault. Recommend 100% liability assignment.', timestamp: '00:00:08' },
      { agentType: 'fraud', message: 'No fraud indicators. Risk score 0.08. All evidence authentic.', timestamp: '00:00:10' },
      { agentType: 'payout', message: 'Approved ₹85,000 including medical and rental. Fast-track processing.', timestamp: '00:00:12' },
    ],
  },

  // AC-2025-00122: Amit Kumar - Shared fault, unclear liability
  'AC-2025-00122': {
    fnolSummary: {
      location: 'Brigade Road, Bangalore',
      incidentTime: '16 Oct 2025, 08:10',
      fnolTime: '08:15 (FNOL filing)',
      description: 'Side-swipe incident during lane change. Both drivers claim the other merged unsafely. No clear evidence of primary fault.',
      weather: 'Light rain, reduced visibility',
      injuries: 'None reported',
    },
    liability: {
      assessment: 'Shared Fault',
      description: 'Insufficient evidence to determine primary fault. Recommend 50-50 liability split.',
    },
    payout: {
      amount: 31500,
      breakdown: '₹28,000 (repairs - 50% share) + ₹3,500 (admin)',
    },
    confidence: 0.68,
    agentOutputs: [
      {
        type: 'document_ingest',
        status: 'completed',
        summary: 'Parsed 5 files (FNOL forms from both parties, 3 photos, police report). Conflicting statements detected.',
        detailedReasoning: 'Both drivers filed claims. Each blames the other for unsafe lane merge. No independent witnesses. Police report inconclusive.',
        timestamp: '00:00:02',
        confidence: 0.75,
      },
      {
        type: 'vision',
        status: 'completed',
        summary: 'Detected: right-side door and mirror damage. Severity: 5/10. Paint transfer indicates side-swipe. Estimated repair: ₹28,000.',
        detailedReasoning: 'Damage consistent with side-swipe during lane change. Impact angle ambiguous - cannot determine which vehicle merged first.',
        timestamp: '00:00:05',
        confidence: 0.65,
      },
      {
        type: 'document_analysis',
        status: 'completed',
        summary: 'Both drivers claim they were in lane first. No dashcam footage. Weather conditions (rain) reduced visibility. Police report neutral.',
        detailedReasoning: 'Insufficient evidence to assign primary fault. Road markings faded due to rain. No clear right-of-way violation detected.',
        timestamp: '00:00:07',
        confidence: 0.60,
      },
      {
        type: 'liability',
        status: 'completed',
        summary: 'Inconclusive evidence. Both drivers share responsibility. Recommended split: 50-50 liability. Confidence 0.68.',
        detailedReasoning: 'Without clear evidence, recommend shared liability. Weather conditions contributed to incident.',
        timestamp: '00:00:09',
        confidence: 0.68,
      },
      {
        type: 'fraud',
        status: 'completed',
        summary: 'Risk score: 0.35. No major fraud indicators. Genuine accident with unclear fault. Minor concern: rapid filing by both parties.',
        detailedReasoning: 'Low-medium fraud risk. Timeline reasonable. Damage consistent with stated incident. No pattern matches.',
        timestamp: '00:00:11',
        confidence: 0.72,
      },
      {
        type: 'payout',
        status: 'completed',
        summary: 'Recommended payout: ₹31,500 (50% of repair costs + admin). Both parties share costs. Confidence 0.68.',
        detailedReasoning: 'Approve 50% payout. Recommend both insurers split costs. Document shared liability for records.',
        timestamp: '00:00:13',
        confidence: 0.68,
      },
    ],
    agentConversation: [
      { agentType: 'document_ingest', message: 'Conflicting statements from both drivers. No independent witnesses.', timestamp: '00:00:02' },
      { agentType: 'vision', message: 'Side-swipe damage confirmed. Cannot determine who merged first.', timestamp: '00:00:05' },
      { agentType: 'document_analysis', message: 'Weather reduced visibility. Road markings unclear. Police neutral.', timestamp: '00:00:07' },
      { agentType: 'liability', message: 'Insufficient evidence for primary fault. Recommend 50-50 split.', timestamp: '00:00:09' },
      { agentType: 'fraud', message: 'Low fraud risk. Genuine incident. Risk score 0.35.', timestamp: '00:00:11' },
      { agentType: 'payout', message: 'Approved ₹31,500 (50% share). Shared liability documented.', timestamp: '00:00:13' },
    ],
  },

  // AC-2025-00121: Sneha Reddy - Simple parking lot incident
  'AC-2025-00121': {
    fnolSummary: {
      location: 'Indiranagar parking lot, Bangalore',
      incidentTime: '10 Oct 2025, 16:30',
      fnolTime: '16:45 (FNOL filing)',
      description: 'Minor rear bumper damage while reversing in parking lot. Claimant struck pole. Self-reported, no dispute.',
      weather: 'Clear conditions',
      injuries: 'None',
    },
    liability: {
      assessment: 'Claimant At-Fault',
      description: 'Self-reported parking lot incident. No third-party involvement.',
    },
    payout: {
      amount: 12000,
      breakdown: '₹10,500 (bumper repair) + ₹1,500 (admin)',
    },
    confidence: 0.99,
    agentOutputs: [
      {
        type: 'document_ingest',
        status: 'completed',
        summary: 'Parsed 3 files (FNOL form, 2 photos, repair estimate). Simple case - self-reported parking incident.',
        detailedReasoning: 'Straightforward documentation. Claimant admits fault. Minor damage only. No dispute or complications.',
        timestamp: '00:00:01',
        confidence: 0.99,
      },
      {
        type: 'vision',
        status: 'completed',
        summary: 'Detected: rear bumper dent and scratch. Severity: 2/10. Minor cosmetic damage. Estimated repair: ₹10,500.',
        detailedReasoning: 'Small dent consistent with low-speed pole collision. No structural damage. Simple bumper repair required.',
        timestamp: '00:00:03',
        confidence: 0.98,
      },
      {
        type: 'document_analysis',
        status: 'completed',
        summary: 'Self-reported incident. Claimant statement clear and consistent. No contradictions. Parking lot CCTV confirms account.',
        detailedReasoning: 'All documentation aligns. Claimant honest about fault. CCTV footage matches description perfectly.',
        timestamp: '00:00:04',
        confidence: 0.99,
      },
      {
        type: 'liability',
        status: 'completed',
        summary: 'Claimant 100% at-fault. Self-admitted. No third-party involvement. Clear liability.',
        detailedReasoning: 'Parking lot incident, self-reported, admitted fault. Simple case with no disputes.',
        timestamp: '00:00:05',
        confidence: 0.99,
      },
      {
        type: 'fraud',
        status: 'completed',
        summary: 'Risk score: 0.02. No fraud indicators. Honest self-reporting. CCTV confirms incident. Excellent claim behavior.',
        detailedReasoning: 'Lowest fraud risk possible. Claimant reported immediately, admitted fault, documentation complete.',
        timestamp: '00:00:06',
        confidence: 0.99,
      },
      {
        type: 'payout',
        status: 'completed',
        summary: 'Recommended payout: ₹12,000 (repair ₹10,500 + admin ₹1,500). Fast-track approved. Confidence 0.99.',
        detailedReasoning: 'Simple, honest claim. Recommend immediate approval and fast processing as reward for transparency.',
        timestamp: '00:00:07',
        confidence: 0.99,
      },
    ],
    agentConversation: [
      { agentType: 'document_ingest', message: 'Self-reported parking lot incident. All documentation clear.', timestamp: '00:00:01' },
      { agentType: 'vision', message: 'Minor bumper damage confirmed. Severity 2/10. Repair ₹10,500.', timestamp: '00:00:03' },
      { agentType: 'document_analysis', message: 'CCTV confirms claimant account. No contradictions.', timestamp: '00:00:04' },
      { agentType: 'liability', message: 'Claimant at-fault admitted. Simple case.', timestamp: '00:00:05' },
      { agentType: 'fraud', message: 'Excellent claim behavior. Risk score 0.02.', timestamp: '00:00:06' },
      { agentType: 'payout', message: 'Fast-track approved ₹12,000. Exemplary transparency.', timestamp: '00:00:07' },
    ],
  },

  // AC-2025-00120: Rajesh Iyer - Hit-and-run with high fraud risk
  'AC-2025-00120': {
    fnolSummary: {
      location: 'Anna Salai, Chennai',
      incidentTime: '15 Oct 2025, 11:20',
      fnolTime: '11:30 (FNOL filing)',
      description: 'Hit-and-run incident. Vehicle struck while parked. No witness, no CCTV footage. Damage pattern unusual for claimed scenario.',
      weather: 'Clear, daytime',
      injuries: 'None reported',
    },
    liability: {
      assessment: 'No-Fault',
      description: 'Hit-and-run claim. Third-party unidentified. Fraud indicators present - recommend SIU review.',
    },
    payout: {
      amount: 68500,
      breakdown: '₹58,000 (repairs) + ₹10,500 (assessment, admin)',
    },
    confidence: 0.42,
    agentOutputs: [
      {
        type: 'document_ingest',
        status: 'completed',
        summary: 'Parsed 4 files (FNOL form, 3 photos, claimant statement). Limited documentation. No police report, no witnesses.',
        detailedReasoning: 'Concerning lack of documentation for hit-and-run claim. No police report filed. No witnesses despite daytime busy area.',
        timestamp: '00:00:02',
        confidence: 0.45,
      },
      {
        type: 'vision',
        status: 'completed',
        summary: 'Detected: multiple damage zones (front, side, rear). Severity: 8/10. Damage pattern inconsistent with single hit-and-run. Estimated: ₹58,000.',
        detailedReasoning: 'Multiple impact zones suggest several incidents, not single hit-and-run. Damage age varies - some older repairs visible.',
        timestamp: '00:00:05',
        confidence: 0.38,
      },
      {
        type: 'document_analysis',
        status: 'completed',
        summary: 'No police report despite claim requirement. No CCTV in busy area (suspicious). Claimant statement vague and inconsistent.',
        detailedReasoning: 'Major red flags: busy daytime location with no witnesses/CCTV, no police report, damage inconsistent with claim.',
        timestamp: '00:00:08',
        confidence: 0.35,
      },
      {
        type: 'liability',
        status: 'completed',
        summary: 'Cannot verify hit-and-run claim. No evidence of third-party. Damage pattern suggests multiple incidents. Recommend denial pending investigation.',
        detailedReasoning: 'Insufficient evidence to support hit-and-run claim. Multiple inconsistencies flagged.',
        timestamp: '00:00:10',
        confidence: 0.25,
      },
      {
        type: 'fraud',
        status: 'completed',
        summary: 'Risk score: 0.89 (VERY HIGH). Red flags: no police report, damage inconsistency, pattern match to known fraud scheme, suspicious timing. MANDATORY SIU REVIEW.',
        detailedReasoning: 'Critical fraud indicators detected. Matches known fraud pattern. Previous claims history suspicious. Recommend immediate SIU escalation and claim denial.',
        timestamp: '00:00:12',
        confidence: 0.92,
      },
      {
        type: 'payout',
        status: 'completed',
        summary: 'HOLD payout. Recommend: DENY pending SIU investigation. Risk too high. Confidence 0.42 (LOW).',
        detailedReasoning: 'Cannot recommend payout. Too many fraud indicators. Escalate to Special Investigation Unit immediately.',
        timestamp: '00:00:14',
        confidence: 0.42,
      },
    ],
    agentConversation: [
      { agentType: 'document_ingest', message: 'Limited docs. No police report for hit-and-run claim. Red flag.', timestamp: '00:00:02' },
      { agentType: 'vision', message: 'Multiple damage zones detected. Inconsistent with single incident claim.', timestamp: '00:00:05' },
      { agentType: 'document_analysis', message: 'No CCTV in busy area suspicious. Claimant statement vague.', timestamp: '00:00:08' },
      { agentType: 'liability', message: 'Cannot verify third-party involvement. Evidence insufficient.', timestamp: '00:00:10' },
      { agentType: 'fraud', message: 'ALERT: High fraud risk 0.89. Multiple red flags. Escalate to SIU.', timestamp: '00:00:12' },
      { agentType: 'payout', message: 'HOLD payout. Recommend DENIAL pending investigation.', timestamp: '00:00:14' },
    ],
  },
};
