import { useState, useEffect, useCallback } from 'react';
import { AgentOutput, AgentType, ClaimStatus } from '@/types';
import { claimDataMap } from '@/data/claimSpecificData';

// Define agent sequence outside component to prevent re-creation
const AGENT_SEQUENCE: AgentType[] = [
  'document_ingest',
  'vision',
  'document_analysis',
  'liability',
  'fraud',
  'payout',
];

export function useAgentSimulation(autoStart: boolean = false, claimId?: string, claimStatus?: ClaimStatus) {
  const [agents, setAgents] = useState<AgentOutput[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentAgentIndex, setCurrentAgentIndex] = useState(-1);

  const startSimulation = useCallback(() => {
    // Get claim-specific agent outputs or fall back to default
    const claimData = claimId ? claimDataMap[claimId] : claimDataMap['AC-2025-00124'];
    const agentOutputs = claimData?.agentOutputs || [];
    
    // If claim is already "Ready to Approve", skip simulation and show completed agents
    if (claimStatus === 'Ready to Approve') {
      const completedAgents = agentOutputs.map(agent => ({
        ...agent,
        status: 'completed' as const,
      }));
      setAgents(completedAgents);
      setIsRunning(false);
      setCurrentAgentIndex(AGENT_SEQUENCE.length);
      return;
    }
    
    // Otherwise, start the simulation
    setIsRunning(true);
    setCurrentAgentIndex(0);
    
    // Initialize all agents as queued
    const queuedAgents = agentOutputs.map(agent => ({
      ...agent,
      status: 'queued' as const,
    }));
    setAgents(queuedAgents);
  }, [claimId, claimStatus]);

  useEffect(() => {
    if (!isRunning || currentAgentIndex < 0 || currentAgentIndex >= AGENT_SEQUENCE.length) {
      return;
    }

    const currentAgentType = AGENT_SEQUENCE[currentAgentIndex];
    
    // Set current agent to running
    setAgents(prev => 
      prev.map(agent => 
        agent.type === currentAgentType
          ? { ...agent, status: 'running' as const }
          : agent
      )
    );

    // Simulate agent processing time (2-3 seconds)
    const processingTime = 2000 + Math.random() * 1000;
    
    const timer = setTimeout(() => {
      // Set current agent to completed
      setAgents(prev => 
        prev.map(agent => 
          agent.type === currentAgentType
            ? { ...agent, status: 'completed' as const }
            : agent
        )
      );

      // Move to next agent after a brief pause
      setTimeout(() => {
        if (currentAgentIndex < AGENT_SEQUENCE.length - 1) {
          setCurrentAgentIndex(prev => prev + 1);
        } else {
          setIsRunning(false);
        }
      }, 500);
    }, processingTime);

    return () => clearTimeout(timer);
  }, [isRunning, currentAgentIndex]);

  // Auto-start simulation if enabled or claimId changes
  useEffect(() => {
    if (autoStart) {
      // Reset and restart when claimId or status changes
      resetSimulation();
      // Small delay to make it feel more natural (skip delay for Ready to Approve)
      const delay = claimStatus === 'Ready to Approve' ? 0 : 1000;
      const timer = setTimeout(() => {
        startSimulation();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [autoStart, claimId, claimStatus, startSimulation]);

  const resetSimulation = useCallback(() => {
    setAgents([]);
    setIsRunning(false);
    setCurrentAgentIndex(-1);
  }, []);

  return {
    agents,
    isRunning,
    startSimulation,
    resetSimulation,
    isComplete: !isRunning && agents.length > 0 && currentAgentIndex >= AGENT_SEQUENCE.length - 1,
  };
}
