import { useState, useEffect, useCallback } from 'react';
import { AgentOutput, AgentType } from '@/types';
import { agentOutputs } from '@/data/agentResponses';

// Define agent sequence outside component to prevent re-creation
const AGENT_SEQUENCE: AgentType[] = [
  'document_ingest',
  'vision',
  'document_analysis',
  'liability',
  'fraud',
  'payout',
];

export function useAgentSimulation(autoStart: boolean = false) {
  const [agents, setAgents] = useState<AgentOutput[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentAgentIndex, setCurrentAgentIndex] = useState(-1);

  const startSimulation = useCallback(() => {
    setIsRunning(true);
    setCurrentAgentIndex(0);
    
    // Initialize all agents as queued
    const queuedAgents = agentOutputs.map(agent => ({
      ...agent,
      status: 'queued' as const,
    }));
    setAgents(queuedAgents);
  }, []);

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

  // Auto-start simulation if enabled
  useEffect(() => {
    if (autoStart && agents.length === 0) {
      // Small delay to make it feel more natural
      const timer = setTimeout(() => {
        startSimulation();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoStart, agents.length, startSimulation]);

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
