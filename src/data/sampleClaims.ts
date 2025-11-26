import { Claim, Document } from '@/types';

// Generate multiple claims to reach the desired counts
const generateClaims = (): Claim[] => {
  const claims: Claim[] = [];
  const statuses: Claim['status'][] = ['New', 'Investigating', 'Ready to Approve', 'Closed'];
  const slaRisks: Claim['slaRisk'][] = ['Low', 'Medium', 'High'];
  
  const names = [
    'Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Reddy', 'Rajesh Iyer',
    'Kavita Singh', 'Arjun Mehta', 'Deepika Nair', 'Vikram Chopra', 'Ananya Desai',
    'Rohan Gupta', 'Meera Joshi', 'Karthik Rao', 'Divya Krishnan', 'Sanjay Verma',
    'Pooja Menon', 'Aditya Shah', 'Riya Kapoor', 'Nikhil Pandey', 'Shreya Agarwal'
  ];

  const vehicles = [
    '2018 Honda City', '2020 Maruti Swift', '2019 Hyundai Creta', '2021 Tata Nexon',
    '2017 Ford EcoSport', '2022 Kia Seltos', '2019 Mahindra XUV500', '2020 Toyota Innova',
    '2018 Volkswagen Polo', '2021 Skoda Rapid', '2019 Renault Duster', '2020 Nissan Kicks',
    '2017 Honda Jazz', '2022 MG Hector', '2018 Hyundai i20', '2021 Maruti Baleno',
    '2019 Tata Harrier', '2020 Jeep Compass', '2018 Ford Figo', '2021 Honda WRV'
  ];

  // Generate 670 claims with specific distribution
  // 400 New, 150 Investigating, 101 Ready to Approve, 19 Closed
  // High Priority: 120 claims
  
  let claimCounter = 124;
  
  // Generate 400 New claims (120 of them high priority)
  for (let i = 0; i < 400; i++) {
    claims.push({
      id: `AC-2025-${String(claimCounter++).padStart(5, '0')}`,
      claimantName: names[i % names.length],
      status: 'New',
      vehicle: `${vehicles[i % vehicles.length]} (MH${String(i % 100).padStart(2, '0')}AB${String(1000 + i).slice(-4)})`,
      fnolDate: `${15 + (i % 10)} Oct 2025, ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      slaRisk: i < 120 ? 'High' : (i % 2 === 0 ? 'Medium' : 'Low'),
      estimatedAmount: String(25000 + Math.floor(Math.random() * 75000)),
      approvedAmount: 0,
      disbursedAmount: 0,
    });
  }

  // Generate 150 Investigating claims
  for (let i = 0; i < 150; i++) {
    claims.push({
      id: `AC-2025-${String(claimCounter++).padStart(5, '0')}`,
      claimantName: names[i % names.length],
      status: 'Investigating',
      vehicle: `${vehicles[i % vehicles.length]} (DL${String(i % 100).padStart(2, '0')}CD${String(5000 + i).slice(-4)})`,
      fnolDate: `${10 + (i % 15)} Oct 2025, ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      slaRisk: slaRisks[i % 3],
      estimatedAmount: String(30000 + Math.floor(Math.random() * 70000)),
      approvedAmount: Math.floor(Math.random() * 50000),
      disbursedAmount: 0,
    });
  }

  // Generate 101 Ready to Approve claims
  for (let i = 0; i < 101; i++) {
    claims.push({
      id: `AC-2025-${String(claimCounter++).padStart(5, '0')}`,
      claimantName: names[i % names.length],
      status: 'Ready to Approve',
      vehicle: `${vehicles[i % vehicles.length]} (KA${String(i % 100).padStart(2, '0')}EF${String(3000 + i).slice(-4)})`,
      fnolDate: `${5 + (i % 20)} Oct 2025, ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      slaRisk: 'Low',
      estimatedAmount: String(20000 + Math.floor(Math.random() * 60000)),
      approvedAmount: 20000 + Math.floor(Math.random() * 60000),
      disbursedAmount: 0,
    });
  }

  // Generate 19 Closed claims
  for (let i = 0; i < 19; i++) {
    const amount = 20000 + Math.floor(Math.random() * 50000);
    claims.push({
      id: `AC-2025-${String(claimCounter++).padStart(5, '0')}`,
      claimantName: names[i % names.length],
      status: 'Closed',
      vehicle: `${vehicles[i % vehicles.length]} (TN${String(i % 100).padStart(2, '0')}GH${String(7000 + i).slice(-4)})`,
      fnolDate: `${1 + (i % 25)} Oct 2025, ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      slaRisk: 'Low',
      estimatedAmount: String(amount),
      approvedAmount: amount,
      disbursedAmount: amount,
    });
  }

  return claims;
};

export const sampleClaims: Claim[] = generateClaims();

export const sampleDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'FNOL_Form.pdf',
    type: 'pdf',
    url: '/sample-docs/fnol_form.pdf',
    uploadedAt: '15 Oct 2025, 23:42',
  },
  {
    id: 'doc-2',
    name: 'police_report.pdf',
    type: 'pdf',
    url: '/sample-docs/police_report.pdf',
    uploadedAt: '15 Oct 2025, 23:45',
  },
  {
    id: 'doc-3',
    name: 'repair_estimate.pdf',
    type: 'pdf',
    url: '/sample-docs/repair_estimate.pdf',
    uploadedAt: '15 Oct 2025, 23:47',
  },
  {
    id: 'doc-4',
    name: 'claimant_statement.txt',
    type: 'text',
    url: '/sample-docs/claimant_statement.txt',
    uploadedAt: '15 Oct 2025, 23:48',
  },
  {
    id: 'img-1',
    name: 'damage_front_1.png',
    type: 'image',
    url: '/images/damage_front_1.png',
    uploadedAt: '15 Oct 2025, 23:50',
  },
  {
    id: 'img-2',
    name: 'damage_front_2.png',
    type: 'image',
    url: '/images/damage_front_2.png',
    uploadedAt: '15 Oct 2025, 23:51',
  },
  {
    id: 'img-3',
    name: 'damage_headlight.png',
    type: 'image',
    url: '/images/damage_headlight.png',
    uploadedAt: '15 Oct 2025, 23:52',
  },
  {
    id: 'img-4',
    name: 'damage_hood.png',
    type: 'image',
    url: '/images/damage_hood.png',
    uploadedAt: '15 Oct 2025, 23:53',
  },
  {
    id: 'img-5',
    name: 'damage_side_view.png',
    type: 'image',
    url: '/images/damage_side_view.png',
    uploadedAt: '15 Oct 2025, 23:54',
  },
];
