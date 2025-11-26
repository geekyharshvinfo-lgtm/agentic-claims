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
  // AC-2025-00124: Rahul Sharma - Genuine claim, info matches police records
  'AC-2025-00124': {
    fnolSummary: {
      location: 'MG Road intersection, Mumbai',
      incidentTime: '15 Oct 2025, 22:50 (Police report)',
      fnolTime: '23:40 (FNOL filing)',
      description: 'Single-vehicle collision with barrier. Claimant info verified and matches police records.',
      weather: 'Clear, dry conditions',
      injuries: 'None reported',
    },
    liability: {
      assessment: 'No-Fault',
      description: 'Genuine claim verified. Claimant information matches police records. No fraud indicators detected.',
    },
    payout: {
      amount: 42200,
      breakdown: '₹34,500 (repairs) + ₹7,700 (towing, admin)',
    },
    confidence: 0.95,
    agentOutputs: [
      {
        type: 'document_ingest',
        status: 'completed',
        summary: 'Parsed 5 files (FNOL form, 6 photos, police_report.pdf, repair_estimate.pdf, claimant_statement.txt). Extracted 14 key facts.',
        detailedReasoning: `📄 DOCUMENT INGESTION ANALYSIS

Files Processed: 5 documents, 6 images
Total Size: 3.2 MB
Processing Time: 2.3 seconds
OCR Confidence: 0.98 average

1. FNOL FORM (PDF - 2 pages)
   • File size: 847 KB, OCR: 0.98
   • Fields extracted: 23/23 (100%)
   • Policy: POL-2025-789 ✓ Active
   • Claimant: Rahul Sharma, DOB: 15-Jun-1988
   • Phone: +91-9876543210 ✓ Matches records
   • Address: 123 MG Road, Mumbai 400001 ✓ Verified
   • Vehicle: 2018 Honda City, Reg: MH-01-AB-1234
   • Odometer: 45,230 km (avg 6,461 km/year - normal)
   • Filing time: 23:40 IST (+50 min from incident)

2. POLICE REPORT (PDF - 3 pages)
   • File size: 1.2 MB, OCR: 0.96
   • FIR: FIR-2025-10-15-0892 ✓ Verified
   • Officer: Constable Pradeep Kumar (Badge #7845)
   • Incident: 22:50 IST, Oct 15, 2025
   • Location: 19.0760°N, 72.8777°E (MG Road intersection)
   • Weather: Clear, 28°C, Dry road
   • BAC: 0.00% (breathalyzer administered)
   • Witness: Mr. Anand Kumar (independent, verified)
   • Quote: "Front-left damage consistent with barrier impact"

3. REPAIR ESTIMATE (PDF - 1 page)
   • Workshop: Mumbai Auto Care (authorized dealer)
   • Estimate ID: EST-2025-1847
   • Inspector: Vijay Patel (ASE certified)
   • Parts: Bumper ₹12k + Headlight ₹8.5k + Hood ₹9k
   • Labor: 12 hours @ ₹600/hr
   • Total: ₹34,500 (within market range)

4. CLAIMANT STATEMENT (TXT)
   • File: 3.2 KB, dated Oct 15, 23:30
   • Account: "Misjudged turn, struck barrier front-left"
   • Consistency score: 0.94 vs police report
   • No contradictions detected

5. PHOTOS (6 JPG images)
   • Resolution: 1920x1080 avg
   • EXIF intact: All 6 photos
   • Timestamps: 23:08-23:12 (18 min after incident)
   • GPS: 19.0760°N, 72.8777°E ✓ Matches scene
   • Camera: iPhone 13 Pro (IMEI verified to claimant)

CROSS-VERIFICATION:
✓ Name match: 100%
✓ Vehicle reg match: 100%
✓ Location GPS: 0.99 (within 1m)
✓ Timeline logical: 0.96
✓ No tampering detected: 0.98

EXTRACTED KEY FACTS (14):
1. Single-vehicle barrier collision
2. Front-left damage zone
3. Incident time: 22:50 IST
4. Location verified via GPS
5. Independent witness confirms account
6. No intoxication (BAC 0.00%)
7. Weather clear, road dry
8. Immediate police notification
9. All documents authentic
10. Claimant history clean (no prior claims)
11. Policy active and valid
12. Damage estimate reasonable
13. No contradictions in statements
14. Photos geographically verified

Confidence: 0.98 | Status: ✓ VERIFIED`,
        timestamp: '00:00:02',
        confidence: 0.98,
      },
      {
        type: 'vision',
        status: 'completed',
        summary: 'Detected: front-left bumper damage, left headlight shattered, hood dent. Severity: 6/10. Estimated repair cost: ₹34,500 (range: ₹30k–₹39k).',
        detailedReasoning: `🔍 VISION AI DAMAGE ASSESSMENT

Images Analyzed: 6 photos
Total Resolution: 11,520 x 6,480 pixels
Processing Time: 3.1 seconds
AI Model: VisionNet v4.2 (Automotive)

PHOTO ANALYSIS:
Photo #1 - Wide Front View
• Resolution: 1920x1080, Quality: 9.2/10
• Lighting: Excellent (street lamps, 850 lux)
• Damage zones detected: 3 primary, 1 secondary
• Confidence: 0.96

Photo #2 - Front-Left Close-up
• Resolution: 1920x1080, Quality: 9.5/10  
• Bumper deformation: 8-12 cm depth
• Paint damage area: ~450 cm²
• Structural integrity: 22% compromised

Photo #3 - Headlight Detail
• Lens shatter: Complete fragmentation
• Housing damage: 65% compromised
• Moisture ingress: High risk
• Electrical damage: Visible wire exposure

Photo #4 - Hood Damage
• Dent dimensions: 15cm x 22cm
• Depth: 4.5cm (shadow analysis)
• Metal stress: Non-recoverable deformation
• Replacement vs repair: Replace (cost-effective)

Photo #5 - Side Profile  
• Impact angle: 42-48° from center
• Secondary scratches: Left fender
• Wheel alignment: Visually intact
• Suspension: No visible damage

Photo #6 - Barrier Paint Transfer
• Transfer color: Red oxide (Mumbai std barrier)
• Impact height: 65cm from ground
• Contact width: ~30cm
• Barrier material: Concrete (verified)

DAMAGE SEVERITY BY ZONE:

Zone 1: Front-Left Bumper
• Severity: 8/10 (Severe)
• Material: ABS Plastic
• Damage type: Crush + Tear + Paint loss
• Repair feasibility: 0% (complete replacement)
• OEM part #: HC-BMP-FL-2018
• Est. cost: ₹12,000 ±₹1,500
• Labor: 2.5 hrs @ ₹600/hr = ₹1,500

Zone 2: Left Headlight Assembly
• Severity: 10/10 (Total failure)
• Type: Xenon HID projector unit
• Lens: Shattered beyond repair
• Housing: Cracked, moisture ingress
• Wiring: Damaged connector visible
• OEM part #: HC-HL-L-XEN-2018
• Est. cost: ₹8,500 ±₹1,000
• Labor: 1.5 hrs @ ₹600/hr = ₹900

Zone 3: Hood Panel
• Severity: 6/10 (Moderate-Severe)
• Material: Steel alloy (1.2mm)
• Dent area: 330 cm²
• Paint damage: Down to primer layer
• Frame stress: Moderate buckling
• Repair vs Replace: Replace recommended
• OEM part #: HC-HOOD-2018
• Est. cost: ₹9,000 ±₹1,200
• Labor: 2.0 hrs @ ₹600/hr = ₹1,200

Zone 4: Left Fender (Secondary)
• Severity: 3/10 (Minor)
• Damage: Surface scratches
• Length: 18cm scratch line
• Depth: Clear coat only
• Repair: Paint correction included in hood work

IMPACT PHYSICS ANALYSIS:

Collision Dynamics:
• Approach angle: 45° ± 3° (front-left bias)
• Vehicle speed: 25-35 km/h (est. from deformation)
• Kinetic energy: 14,800 joules (calculated)
• Impact duration: 0.18-0.22 sec (typical)
• Deceleration: ~4.2 g-force

Force Distribution:
• Bumper absorbed: 70% (~10,360 J)
• Headlight: 20% (~2,960 J)
• Hood: 10% (~1,480 J)
• Total energy dissipated: 100%

Damage Pattern Verification:
✓ Single impact event: 0.97 confidence
✓ Barrier collision match: 0.94 confidence
✓ No secondary impacts: 0.99 confidence
✓ Damage age: <24 hours (fresh): 0.96
✓ Paint transfer confirms barrier: 0.92

COST ESTIMATION:

Parts (OEM):
• Bumper assembly: ₹12,000
• Headlight unit: ₹8,500
• Hood panel: ₹9,000
Subtotal: ₹29,500

Labor (Certified technician):
• Bumper R&R: 2.5 hrs = ₹1,500
• Headlight R&R: 1.5 hrs = ₹900
• Hood R&R: 2.0 hrs = ₹1,200
• Paint prep: 2.0 hrs = ₹1,000
• Color match & spray: 3.0 hrs = ₹1,500
• Final polish: 0.5 hrs = ₹200
Subtotal: ₹6,300

Materials:
• Paint (silver metallic): ₹1,200
• Primer & clear coat: ₹500
• Clips & fasteners: ₹200
Subtotal: ₹1,900

Total: ₹37,700
Market adjustment: -8% = ₹34,500
Confidence range: ₹30,000 - ₹39,000

QUALITY METRICS:
• Damage detection: 0.96
• Severity assessment: 0.92
• Cost accuracy: 0.89  
• Pattern matching: 0.94
• Overall confidence: 0.94

CONCLUSION: Damage authentic, consistent with reported barrier collision. Approve estimate.`,
        timestamp: '00:00:05',
        confidence: 0.94,
      },
      {
        type: 'document_analysis',
        status: 'completed',
        summary: "Police report indicates collision at 22:50 on 15 Oct 2025; witness: 'car hit from front-left.' Claimant information matches police records perfectly.",
        detailedReasoning: `📋 DOCUMENT CROSS-ANALYSIS

TIMELINE VERIFICATION:
22:50 - Incident occurs (police FIR)
22:53 - Witness calls police (+3 min)
22:58 - Claimant calls police (+8 min)
23:05 - Officer arrives (+15 min)
23:08 - Photos taken (+18 min) ✓ Logical
23:12 - Last photo (+22 min)
23:18 - Vehicle towed (+28 min)
23:40 - FNOL filed (+50 min) ✓ Expected

Timeline Analysis:
• All intervals logical and expected
• No suspicious gaps or overlaps
• Photo timing consistent with towing prep
• 50-min FNOL delay = normal (police wait)
• Confidence: 0.97

STATEMENT CORRELATION:
Police Officer (Constable Kumar):
"Vehicle positioned 2.3m from barrier, front-left damage, paint transfer visible, driver cooperative, no intoxication"

Witness (Mr. Anand Kumar):
"Heard crash, saw Honda City hit barrier front-left, driver alone and shaken but unhurt"

Claimant (Rahul Sharma):
"Misjudged turn radius, struck barrier with front-left, called police immediately, alone in vehicle"

Consistency Score:
• Location: 100% match (all say MG Road intersection)
• Damage zone: 100% match (all say front-left)
• Time: 97% match (22:50 vs "10:50 PM" - same time)
• Alone: 100% match
• No injuries: 100% match
• Weather: 100% match (clear)
Overall: 0.99 correlation

DOCUMENT AUTHENTICITY:
Police Report FIR-2025-10-15-0892:
✓ Digital signature verified
✓ Officer badge #7845 - active duty confirmed
✓ Station stamp authentic
✓ Paper watermark detected (official forms)
✓ No alterations or white-out
✓ Handwriting analysis: consistent throughout
Authenticity: 0.98

GPS VERIFICATION:
Reported: 19.0760°N, 72.8777°E
Photo EXIF: 19.0760°N, 72.8777°E
Distance: <1 meter ✓ Perfect match
Verification: 0.999

CLAIMANT BACKGROUND CHECK:
• Policy holder: 3 years, no prior claims ✓
• Phone verified: Matches records 100%
• Address verified: Municipal records confirm
• Vehicle reg: Matches policy ✓
• No fraud history: Clean record
• Credit check: Good standing
Background confidence: 0.96

RED FLAG ANALYSIS:
⚠ Checked for: 0 flags found
✓ No document tampering
✓ No timeline inconsistencies  
✓ No contradicting statements
✓ No suspicious behavioral patterns
✓ No connection to fraud networks
✓ No duplicate claims

CONCLUSION: All documents authentic and correlated. Genuine claim verified.
Confidence: 0.96 | Recommendation: APPROVE`,
        timestamp: '00:00:07',
        confidence: 0.96,
      },
      {
        type: 'liability',
        status: 'completed',
        summary: 'Evidence supports front-left impact. Claimant information matches police report. Recommended liability: Claimant at-fault. Confidence 0.95.',
        detailedReasoning: `⚖️ LIABILITY DETERMINATION ANALYSIS

INCIDENT TYPE: Single-vehicle collision with stationary object (road barrier)

APPLICABLE LAW & REGULATIONS:
• Motor Vehicles Act 1988, Section 3: Driver responsible for vehicle control
• Maharashtra Motor Vehicle Rules: Duty of care when approaching intersections
• Case precedent: Single-vehicle accidents = driver 100% liable unless force majeure
• No force majeure conditions apply (clear weather, dry road, no mechanical failure)

EVIDENCE ASSESSMENT:

1. Physical Evidence (Weight: 0.95)
   • Barrier damage: Paint transfer confirms contact ✓
   • Vehicle damage: Front-left pattern matches barrier collision ✓
   • Impact angle: 45° approach angle (physics analysis) ✓
   • No third-party debris/marks: Single vehicle confirmed ✓
   • Quality score: 9.5/10

2. Documentary Evidence (Weight: 0.96)
   • Police FIR: Single-vehicle incident recorded ✓
   • Officer statement: "No other vehicles involved" ✓
   • Breathalyzer: 0.00% BAC (no intoxication) ✓
   • Weather report: Clear, dry conditions ✓
   • Quality score: 9.6/10

3. Witness Testimony (Weight: 0.93)
   • Independent witness: Mr. Anand Kumar ✓
   • Statement: "Saw Honda City hit barrier" ✓
   • Credibility: High (no relationship to parties) ✓
   • Consistency: Matches all other evidence ✓
   • Quality score: 9.3/10

4. Claimant Statement (Weight: 0.94)
   • Account: "Misjudged turn radius" ✓
   • Self-admission of error ✓
   • No claim of third-party involvement ✓
   • Honest & cooperative demeanor ✓
   • Quality score: 9.4/10

FAULT ANALYSIS:

Driver Responsibilities Checklist:
✗ Maintain safe speed for conditions
✗ Navigate turn within lane boundaries
✗ Maintain control of vehicle
✗ Avoid fixed objects
✓ Report incident to police
✓ Provide truthful statement

Violations: 4/6 duties breached

CONTRIBUTORY FACTORS:
• Driver error: 100% (misjudged turn radius)
• Road conditions: 0% (dry, well-maintained)
• Weather: 0% (clear visibility)
• Vehicle defect: 0% (no mechanical issues)
• Third-party: 0% (no other vehicles)

LIABILITY CALCULATION:

Claimant Fault Assessment:
• Primary cause: Driver misjudgment = 100%
• No mitigating circumstances
• No shared responsibility possible
• No third-party contribution

Legal Liability Formula:
Claimant% = (Driver Error / Total Causation) × 100
Claimant% = (100% / 100%) × 100 = 100%

POLICY COVERAGE VERIFICATION:
• Policy type: Comprehensive ✓
• Single-vehicle coverage: YES ✓
• Deductible applies: ₹5,000
• Coverage limit: ₹5,00,000
• Claim within limits: YES ✓

COMPARATIVE ANALYSIS:
Alternative scenarios considered:
1. Barrier positioned unsafely? NO - Standard placement verified
2. Road design flaw? NO - Intersection meets safety standards
3. Visibility obstruction? NO - Clear sightlines confirmed
4. Mechanical failure? NO - No evidence of defects

Each alternative: <5% probability

FINAL DETERMINATION:
├─ Claimant Liability: 100%
├─ Third-Party Liability: 0% (none involved)
├─ Shared Liability: 0% (not applicable)
└─ Basis: Single-vehicle, driver error, comprehensive evidence

CONFIDENCE BREAKDOWN:
• Evidence quality: 0.95
• Legal clarity: 0.97
• Documentation completeness: 0.96
• Statement consistency: 0.94
Overall Confidence: 0.95

RECOMMENDATION: APPROVE claim under comprehensive coverage. Claimant 100% at-fault. Apply standard deductible.`,
        timestamp: '00:00:09',
        confidence: 0.95,
      },
      {
        type: 'fraud',
        status: 'completed',
        summary: 'Risk score: 0.12. No major fraud indicators detected. Claimant info matches police records. Timeline verified. Genuine claim.',
        detailedReasoning: `🚨 FRAUD DETECTION ANALYSIS

RISK SCORE: 0.12 / 1.00 (LOW RISK)
Classification: GENUINE CLAIM
Recommendation: APPROVE

INDICATOR ANALYSIS (12 factors checked):

1. TIMELINE INTEGRITY ✓ PASS
   • Incident: 22:50
   • Police call: 22:58 (+8 min)
   • Photos: 23:08 (+18 min)
   • FNOL: 23:40 (+50 min)
   Risk: 0.05 (Very Low)
   Rationale: All intervals logical and expected

2. DOCUMENT AUTHENTICITY ✓ PASS
   • Police report: Verified digital signature
   • FNOL form: Genuine watermark detected
   • Photos: EXIF data intact, no tampering
   • No alterations detected
   Risk: 0.02 (Negligible)

3. GEOLOCATION VERIFICATION ✓ PASS
   • Photo GPS: 19.0760°N, 72.8777°E
   • Police report: Same coordinates
   • Match accuracy: <1 meter
   Risk: 0.01 (Negligible)

4. CLAIMANT HISTORY ✓ PASS
   • Policy age: 3 years
   • Prior claims: 0
   • Payment history: Perfect record
   • No fraud patterns
   Risk: 0.03 (Very Low)

5. DAMAGE CONSISTENCY ✓ PASS
   • Damage type: Front-left barrier collision
   • Physics analysis: Matches 25-35 km/h impact
   • Paint transfer: Confirms barrier contact
   • All photos show same fresh damage
   Risk: 0.04 (Very Low)

6. STATEMENT CORRELATION ✓ PASS
   • Claimant vs Police: 99% match
   • Claimant vs Witness: 98% match
   • No contradictions found
   Risk: 0.02 (Negligible)

7. REPAIR ESTIMATE VALIDATION ✓ PASS
   • Workshop: Authorized dealer ✓
   • Cost: ₹34,500 (market rate verified)
   • Parts: OEM pricing confirmed
   • Labor: Standard hourly rates
   Risk: 0.06 (Very Low)

8. BEHAVIORAL ANALYSIS ✓ PASS
   • Immediate police notification ✓
   • Cooperative with officer ✓
   • Honest admission of fault ✓
   • No evasive behavior ✓
   Risk: 0.03 (Very Low)

9. PATTERN MATCHING ✓ PASS
   • Compared to 47,000 historical claims
   • No match to known fraud schemes
   • Claim type: Common genuine pattern
   • Similarity to fraud cases: 0.08
   Risk: 0.08 (Very Low)

10. THIRD-PARTY VERIFICATION ✓ PASS
    • Independent witness present ✓
    • Witness credibility: High ✓
    • Officer observation: Confirms account ✓
    Risk: 0.02 (Negligible)

11. FINANCIAL INDICATORS ✓ PASS
    • Claim amount: Reasonable (₹42k)
    • Not inflated or suspicious
    • Deductible: ₹5k applies
    • No premium timing issues
    Risk: 0.05 (Very Low)

12. SOCIAL NETWORK ANALYSIS ✓ PASS
    • No connection to repair shop ✓
    • No connection to fraud networks ✓
    • Claimant background: Clean ✓
    Risk: 0.01 (Negligible)

RISK CALCULATION:
Base Risk: 0.50 (neutral starting point)

Risk Reductions:
- Clean history: -0.15
- Perfect documentation: -0.12
- Independent witness: -0.08
- Timeline logical: -0.06
- Damage authentic: -0.10
- Self-admission of fault: -0.05
- GPS verified: -0.04

Total Reductions: -0.60

Risk Increases:
+0.22 (standard single-vehicle claim baseline)

FINAL RISK = 0.50 - 0.60 + 0.22 = 0.12

CONFIDENCE METRICS:
• Analysis completeness: 0.98
• Data quality: 0.97
• Pattern recognition: 0.95
• Overall confidence: 0.96

CONCLUSION: Genuine claim. No fraud indicators. Approve with confidence.`,
        timestamp: '00:00:11',
        confidence: 0.96,
      },
      {
        type: 'payout',
        status: 'completed',
        summary: 'Recommended payout: ₹42,200 (repair ₹34,500 + towing/admin fees). Confidence 0.95. Approved.',
        detailedReasoning: `💰 PAYOUT CALCULATION & APPROVAL

CLAIM AMOUNT BREAKDOWN:

REPAIR COSTS:
1. Parts (OEM):
   • Front bumper assembly: ₹12,000
   • Left headlight (Xenon HID): ₹8,500
   • Hood panel: ₹9,000
   Subtotal: ₹29,500

2. Labor:
   • Bumper R&R: 2.5 hrs @ ₹600 = ₹1,500
   • Headlight R&R: 1.5 hrs @ ₹600 = ₹900
   • Hood R&R: 2.0 hrs @ ₹600 = ₹1,200
   • Paint prep: 2.0 hrs @ ₹500 = ₹1,000
   • Spray & finish: 3.0 hrs @ ₹500 = ₹1,500
   • Detailing: 0.5 hrs @ ₹400 = ₹200
   Subtotal: ₹6,300

3. Materials:
   • Paint (silver metallic): ₹1,200
   • Primer & clear: ₹500
   • Fasteners: ₹200
   Subtotal: ₹1,900

4. Shop Supplies & Markup:
   • Consumables: ₹400
   • Waste disposal: ₹200
   • Shop overhead: ₹2,200
   Subtotal: ₹2,800

REPAIR TOTAL: ₹40,500
Market Adjustment (-15%): -₹6,000
ADJUSTED REPAIR: ₹34,500

ADDITIONAL COSTS:
5. Towing Services:
   • Tow to storage: ₹1,500
   • Tow to repair shop: ₹1,000
   Subtotal: ₹2,500

6. Storage Fees:
   • 2 days @ ₹600/day: ₹1,200

7. Administrative:
   • Documentation: ₹800
   • Inspection fees: ₹500
   • Processing: ₹700
   Subtotal: ₹2,000

ADDITIONAL TOTAL: ₹5,700
Rounded: ₹7,700 (includes contingency)

GROSS CLAIM TOTAL: ₹42,200

POLICY VERIFICATION:
• Policy: POL-2025-789 ✓ Active
• Type: Comprehensive ✓ Covers single-vehicle
• Coverage limit: ₹5,00,000
• Claim amount: ₹42,200 (8.4% of limit) ✓
• Deductible: ₹5,000 (applies)

NET PAYOUT CALCULATION:
Gross amount: ₹42,200
Less deductible: -₹5,000
------------------------
NET TO CLAIMANT: ₹37,200

PAYMENT DETAILS:
• Method: Direct bank transfer
• Account: Verified from policy records
• Processing time: 3-5 business days
• Tax: TDS applicable if >₹50k threshold (N/A)

APPROVAL CONDITIONS:
1. ✓ Fraud check cleared (risk 0.12)
2. ✓ All documentation verified
3. ✓ Repair at authorized facility required
4. ✓ Post-repair inspection mandatory
5. ✓ Original parts/invoices submission required

COMPARATIVE ANALYSIS:
Similar claims (last 6 months):
• Average payout: ₹38,500
• This claim: ₹37,200 (96% of average)
• Within normal range: ✓

FINANCIAL IMPACT:
• Reserve allocation: ₹42,200
• Actual payout: ₹37,200
• Claimant pays: ₹5,000 (deductible)
• Loss ratio impact: +0.0084% (minimal)

APPROVAL AUTHORITY:
• Amount tier: Under ₹50,000
• Authority level: Senior Adjuster
• Requires: Single approval ✓
• SIU review: Not required ✓

PAYMENT SCHEDULE:
Day 0: Claim approved
Day 1: Reserve allocated
Day 2-3: Repair authorization issued
Day 4-10: Repairs completed
Day 11: Post-repair inspection
Day 12: Invoice verification
Day 13: Payment processed
Day 14-15: Funds transferred

CONFIDENCE BREAKDOWN:
• Cost accuracy: 0.89
• Coverage verification: 0.99
• Documentation complete: 0.98
• Approval justified: 0.96
Overall Confidence: 0.95

STATUS: ✓ APPROVED
Net payout: ₹37,200
Claimant responsibility: ₹5,000 deductible`,
        timestamp: '00:00:13',
        confidence: 0.95,
      },
    ],
    agentConversation: [
      { agentType: 'vision', message: 'Detected front-left damage & headlight break. Severity 6/10. Est. cost: ₹34,500.', timestamp: '00:00:03' },
      { agentType: 'document_analysis', message: 'Police report timestamp verified. Claimant info matches police records perfectly.', timestamp: '00:00:05' },
      { agentType: 'liability', message: 'All information verified. Genuine claim confirmed. No contradictions found.', timestamp: '00:00:07' },
      { agentType: 'vision', message: 'Impact angle verified. Damage consistent with reported incident.', timestamp: '00:00:09' },
      { agentType: 'fraud', message: 'No major flags detected. All documentation authentic. Risk score 0.12.', timestamp: '00:00:11' },
      { agentType: 'payout', message: 'Approved ₹42,200. Genuine claim. Confidence 0.95.', timestamp: '00:00:13' },
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
