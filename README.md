# Agentic Claims - AI-Powered Insurance Claims Processing

A complete SaaS prototype demonstrating autonomous, multi-agent AI system for processing vehicle insurance claims end-to-end.

## Features

### 🤖 Autonomous AI Agents
- **Document Ingest Agent** - Parses and extracts key facts from uploaded documents
- **Vision Agent** - Analyzes vehicle damage photos with severity assessment
- **Document Analysis Agent** - Cross-references police reports and statements
- **Liability Reasoning Agent** - Determines fault and liability
- **Fraud Detection Agent** - Identifies suspicious patterns and anomalies
- **Payout Estimation Agent** - Calculates recommended settlement amount

### 🎨 Modern SaaS Interface
- Clean, professional enterprise design
- Responsive 3-column layout
- Real-time agent status updates
- Smooth micro-animations
- Interactive explainability panels

### 📊 Key Pages
1. **Claims Inbox** - Dashboard view of all claims with status tracking
2. **Adjuster Workspace** - Comprehensive claim investigation interface

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **PDF Viewer**: React PDF (for document viewing)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Import the repository in Vercel dashboard
3. Vercel will auto-detect Vite and deploy

The `vercel.json` file is already configured for SPA routing.

## Project Structure

```
agentic-claims/
├── src/
│   ├── components/
│   │   ├── agents/           # Agent-specific components
│   │   │   ├── AgentTimeline.tsx
│   │   │   ├── AgentConversation.tsx
│   │   │   └── ExplainabilityPanel.tsx
│   │   ├── layout/           # Page layout components
│   │   │   ├── ColumnA_ClaimInfo.tsx
│   │   │   ├── ColumnB_Investigation.tsx
│   │   │   └── ColumnC_AgenticPanel.tsx
│   │   └── ui/               # Reusable UI components
│   │       └── DecisionCard.tsx
│   ├── data/                 # Sample data and responses
│   │   ├── sampleClaims.ts
│   │   └── agentResponses.ts
│   ├── hooks/                # Custom React hooks
│   │   └── useAgentSimulation.ts
│   ├── pages/                # Main pages
│   │   ├── ClaimsInbox.tsx
│   │   └── AdjusterWorkspace.tsx
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   ├── utils/                # Utility functions
│   │   └── cn.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/                   # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── vercel.json
```

## Key Features Explained

### Autonomous Agent Simulation
The `useAgentSimulation` hook automatically triggers when documents are uploaded, running agents sequentially with realistic timing (2-3 seconds per agent).

### Agent States
- **Queued** - Waiting to start
- **Running** - Currently processing (with animated loader)
- **Completed** - Finished with results
- **Error** - Failed (with error message)

### Explainability
Each decision includes:
- Evidence sources with match scores
- Historical case comparisons
- Auto-generated verification checklist

### Sample Data
The prototype uses realistic dummy data for claim **AC-2025-00124**:
- Claimant: Rahul Sharma
- Vehicle: 2018 Honda City
- Incident: Single-vehicle collision with contradiction in claimant statement

## Customization

### Modify Agent Responses
Edit `src/data/agentResponses.ts` to change the dummy AI outputs.

### Adjust Timing
Modify `src/hooks/useAgentSimulation.ts` to change agent processing speeds.

### Styling
Tailwind configuration in `tailwind.config.js` - modify colors, animations, etc.

## Browser Support

Tested on:
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

## License

MIT

## Notes

This is a **prototype/demo** application. All AI agent responses are simulated with static data. In production, these would connect to real AI models and backend services.
