import { AgentOutput, AgentMessage, Evidence, HistoricalCase, VerificationItem } from '@/types';

export const agentOutputs: AgentOutput[] = [
  {
    type: 'document_ingest',
    status: 'completed',
    summary: 'Parsed 4 files (FNOL form, 6 photos, police_report.pdf, repair_estimate.pdf). Extracted 14 key facts.',
    detailedReasoning: `Successfully ingested all uploaded documents:
    
• FNOL Form (PDF): Parsed claimant details, incident time (23:40), location, initial damage description
• Police Report (PDF): Extracted incident narrative, officer observations, witness statement, timestamp (22:50)
• Repair Estimate (PDF): Identified damage items, labor costs, parts costs
• Claimant Statement (TXT): Extracted subjective account of incident
• 6 Vehicle Photos (JPG): Metadata extracted, ready for vision analysis

Key Facts Extracted:
1. Incident time: 22:50 (police) vs 23:40 (FNOL filing)
2. Location: MG Road intersection
3. Claimant account: "Rear impact"
4. Damage description: Front-left area
5. Vehicle: 2018 Honda City
6. Policy number: POL-2025-789
7. Claimant: Rahul Sharma
... and 7 more facts`,
    timestamp: '00:00:02',
    confidence: 0.98,
  },
  {
    type: 'vision',
    status: 'completed',
    summary: 'Detected: front-left bumper damage, left headlight shattered, hood dent. Severity: 6/10. Estimated repair cost: ₹34,500 (range: ₹30k–₹39k).',
    detailedReasoning: `Vision Analysis Complete:

Damage Assessment:
• Front-left bumper: Severe deformation, paint damage, structural compromise
• Left headlight assembly: Complete shattering, replacement required
• Hood: 15cm dent, possible frame damage
• Left fender: Minor scratches and dent
• No airbag deployment detected

Impact Analysis:
• Primary impact zone: Front-left at approximately 45-degree angle
• Impact force: Medium-high (estimated 25-35 km/h)
• Damage pattern consistent with collision with stationary or slower-moving object
• No secondary impact zones detected

Cost Breakdown:
• Bumper replacement: ₹12,000
• Headlight assembly: ₹8,500
• Hood repair/replacement: ₹9,000
• Paint and labor: ₹5,000
Total: ₹34,500 (±₹4,500)

Confidence: High (0.89)
Quality: All images clear, well-lit, multiple angles`,
    timestamp: '00:00:05',
    confidence: 0.89,
    data: {
      damageZones: ['front-left bumper', 'left headlight', 'hood'],
      severity: 6,
      estimatedCost: 34500,
    },
  },
  {
    type: 'document_analysis',
    status: 'completed',
    summary: "Police report indicates collision at 22:50 on 15 Oct 2025; witness: 'car hit from front-left.' Claimant statement: 'rear impact' — contradiction flagged.",
    detailedReasoning: `Document Cross-Analysis:

Police Report Analysis:
• Incident time: 22:50 (15 Oct 2025)
• Officer arrived: 23:05
• Witness statement (Mr. Anand Kumar): "I saw the Honda City collide with the barrier from the front-left side"
• Officer observation: "Visible damage to front-left portion of vehicle"
• No other vehicle involved
• Weather: Clear, dry conditions

Claimant Statement Analysis:
• Filed FNOL at: 23:40 (50 minutes after incident)
• Stated: "I was hit from behind while stopped at the signal"
• Claims: Rear-end collision
• No mention of barrier or front damage

Repair Estimate Analysis:
• Damage items: All front-left components
• No rear damage noted
• Consistent with police and photo evidence

CONTRADICTION DETECTED:
Claimant's account conflicts with:
1. Police officer's observation
2. Witness testimony  
3. Visual damage evidence
4. Repair estimate scope

Recommendation: High priority review required`,
    timestamp: '00:00:08',
    confidence: 0.92,
  },
  {
    type: 'liability',
    status: 'completed',
    summary: 'Evidence supports front-left impact. Claimant description contradicts police report. Recommended liability: Claimant at-fault. Confidence 0.80.',
    detailedReasoning: `Liability Assessment:

Evidence Analysis:
✓ Police report: Single-vehicle collision with barrier
✓ Witness testimony: Confirms front-left impact
✓ Photo evidence: Damage pattern matches barrier collision
✓ No evidence of other vehicle involvement
✗ Claimant statement: Inconsistent with all other evidence

Determining Factors:
1. Single-vehicle accident (barrier collision)
2. No third-party involvement
3. Claimant's account not supported by evidence
4. Officer noted no debris or marks indicating rear impact

Legal Position:
• Claimant appears to be 100% at-fault
• Collision with stationary object (barrier)
• Possible attempt to misrepresent facts
• Policy may have coverage for single-vehicle accidents

Liability Conclusion:
Claimant: 100% at-fault
Third Party: 0% (no third party involved)

Recommendation: 
• Approve claim under comprehensive coverage
• Flag for SIU review due to statement inconsistency
• Verify dashcam footage if available
• Confirm no fraud indicators before payout`,
    timestamp: '00:00:11',
    confidence: 0.80,
  },
  {
    type: 'fraud',
    status: 'completed',
    summary: 'Risk score: 0.62. Reasons: Photo timestamp mismatch (23:08 vs FNOL at 23:40); pattern match to case #18293 (0.83); previous repair activity on same part.',
    detailedReasoning: `Fraud Detection Analysis:

Risk Indicators Identified:

1. TIMESTAMP ANOMALY (High Risk)
   • Photo metadata: 23:08 
   • FNOL filing: 23:40
   • Police incident: 22:50
   • Gap: Photos taken 18 minutes BEFORE FNOL filing
   • Concern: Why delay in reporting?

2. PATTERN MATCHING (Medium-High Risk)
   • Match to Case #18293: 83% similarity
   • Same vehicle model, same damage zone
   • Previous claimant: Different name, same phone area code
   • Time gap: 8 months

3. REPAIR HISTORY (Medium Risk)
   • Previous claim on left headlight (Case #17845, 2 years ago)
   • Same repair shop in estimate
   • Potential relationship between claimant and repair facility

4. STATEMENT INCONSISTENCY (High Risk)
   • Contradicts all evidence
   • Possible deliberate misrepresentation
   • May indicate staged or exaggerated claim

5. GEOLOCATION CHECK (Low Risk)
   • Photo location matches police report ✓
   • Incident location consistent ✓

Overall Fraud Risk Score: 0.62 (MEDIUM-HIGH)

Recommendations:
⚠ Request additional verification:
  - Dashcam footage
  - Phone records for timestamp clarification
  - Interview claimant for statement clarification
⚠ SIU review recommended
⚠ Verify repair shop relationship
✓ Proceed with caution but do not deny automatically`,
    timestamp: '00:00:14',
    confidence: 0.87,
    data: {
      riskScore: 0.62,
      indicators: ['timestamp_mismatch', 'pattern_match', 'statement_conflict'],
    },
  },
  {
    type: 'payout',
    status: 'completed',
    summary: 'Recommended payout: ₹42,200 (repair ₹34,500 + towing/admin fees). Confidence 0.87.',
    detailedReasoning: `Payout Calculation:

Repair Costs:
• Front-left bumper replacement: ₹12,000
• Headlight assembly: ₹8,500
• Hood repair: ₹9,000
• Paint and labor: ₹5,000
Subtotal: ₹34,500

Additional Costs:
• Towing charges: ₹2,500
• Vehicle storage (2 days): ₹1,200
• Administrative fees: ₹4,000
Subtotal: ₹7,700

Total Payout: ₹42,200

Policy Coverage:
• Policy type: Comprehensive
• Deductible: ₹5,000 (to be subtracted)
• Coverage limit: ₹5,00,000
• Single-vehicle coverage: ✓ Included

Net Payout to Claimant: ₹37,200
(₹42,200 - ₹5,000 deductible)

Conditions:
1. Subject to fraud review clearance
2. Claimant must provide statement clarification
3. Repair work to be done at approved facility
4. Post-repair inspection required

Payment Method: Direct bank transfer
Processing Time: 3-5 business days after approval
Confidence: 0.87 (High)`,
    timestamp: '00:00:16',
    confidence: 0.87,
    data: {
      repairCost: 34500,
      additionalCosts: 7700,
      totalPayout: 42200,
      deductible: 5000,
      netPayout: 37200,
    },
  },
];

export const agentConversation: AgentMessage[] = [
  {
    agentType: 'vision',
    message: 'Detected front-left damage & headlight break. Severity 6/10. Est. cost: ₹34,500.',
    timestamp: '00:00:03',
  },
  {
    agentType: 'document_analysis',
    message: 'Police report timestamp verified. Witness confirms front-left impact.',
    timestamp: '00:00:05',
  },
  {
    agentType: 'liability',
    message: 'Claimant statement conflicts with vision + police evidence. Contradiction flagged.',
    timestamp: '00:00:07',
  },
  {
    agentType: 'vision',
    message: 'Impact angle re-verified. Front-left confirmed.',
    timestamp: '00:00:09',
  },
  {
    agentType: 'fraud',
    message: 'Timestamp mismatch found. Similar to case #18293. Risk score 0.62.',
    timestamp: '00:00:11',
  },
  {
    agentType: 'payout',
    message: 'Recommended payout ₹42,200. Confidence 0.87.',
    timestamp: '00:00:13',
  },
];

export const evidenceData: Evidence[] = [
  {
    source: 'Photo #3',
    description: 'Left bumper deformation — match score 0.91',
    matchScore: 0.91,
  },
  {
    source: 'Police report pg1',
    description: 'Incident time 22:50; consistent with metadata',
    matchScore: 0.95,
  },
  {
    source: 'Claimant statement',
    description: 'Rear impact claim contradicts visual evidence',
    matchScore: 0.15,
  },
  {
    source: 'Witness testimony',
    description: 'Front-left collision confirmed',
    matchScore: 0.88,
  },
  {
    source: 'Repair estimate',
    description: 'All damage items front-left zone',
    matchScore: 0.93,
  },
];

export const historicalMatches: HistoricalCase[] = [
  {
    caseId: '#18293',
    description: 'Similar impact angle',
  },
  {
    caseId: '#18110',
    description: 'Similar damage pattern',
  },
  {
    caseId: '#17320',
    description: 'Same car model, similar repair bill',
  },
];

export const verificationChecklist: VerificationItem[] = [
  {
    task: 'Confirm claimant phone recording',
    completed: false,
  },
  {
    task: 'Request dashcam footage',
    completed: false,
  },
  {
    task: 'Reconfirm timestamp with service center',
    completed: false,
  },
];
