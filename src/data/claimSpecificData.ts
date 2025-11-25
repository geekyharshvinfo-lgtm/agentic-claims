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
}

export const claimDataMap: Record<string, ClaimSpecificData> = {
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
  },
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
  },
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
  },
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
  },
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
  },
};
