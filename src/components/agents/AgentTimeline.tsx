import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, FileText, Scale, ShieldAlert, IndianRupee, Sparkles, CheckCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { AgentOutput, AgentType } from '@/types';
import { cn } from '@/utils/cn';

interface AgentTimelineProps {
  agents: AgentOutput[];
}

const agentConfig: Record<AgentType, { icon: React.ElementType; color: string; label: string }> = {
  document_ingest: { icon: FileText, color: 'bg-blue-500', label: 'Document Ingest' },
  vision: { icon: Camera, color: 'bg-purple-500', label: 'Vision Analysis' },
  document_analysis: { icon: FileText, color: 'bg-green-500', label: 'Document Analysis' },
  liability: { icon: Scale, color: 'bg-yellow-500', label: 'Liability Reasoning' },
  fraud: { icon: ShieldAlert, color: 'bg-red-500', label: 'Fraud Detection' },
  payout: { icon: IndianRupee, color: 'bg-emerald-500', label: 'Payout Estimation' },
};

export default function AgentTimeline({ agents }: AgentTimelineProps) {
  const [expandedAgent, setExpandedAgent] = useState<AgentType | null>(null);

  return (
    <div className="space-y-3">
      {agents.map((agent, index) => {
        const config = agentConfig[agent.type];
        const Icon = config.icon;
        const isExpanded = expandedAgent === agent.type;

        return (
          <motion.div
            key={agent.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div
              className={cn(
                'border-2 rounded-lg overflow-hidden transition-all',
                agent.status === 'completed' && 'border-green-200 bg-green-50/50',
                agent.status === 'running' && 'border-primary-300 bg-primary-50',
                agent.status === 'queued' && 'border-gray-200 bg-white',
                agent.status === 'error' && 'border-red-200 bg-red-50'
              )}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={cn('w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', config.color)}>
                    {agent.status === 'running' ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : agent.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-sm font-semibold text-gray-900">{config.label}</h5>
                      {agent.status === 'running' && (
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="flex items-center gap-1 text-xs text-primary-600"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Thinking...</span>
                        </motion.div>
                      )}
                      {agent.status === 'completed' && (
                        <span className="text-xs text-green-600 font-medium">{agent.timestamp}</span>
                      )}
                    </div>

                    {/* Summary */}
                    {agent.status === 'completed' && (
                      <p className="text-xs text-gray-600 leading-relaxed mb-2">{agent.summary}</p>
                    )}

                    {/* Loading State */}
                    {agent.status === 'running' && (
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary-500"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">Analyzing data...</p>
                      </div>
                    )}

                    {/* Queued State */}
                    {agent.status === 'queued' && (
                      <p className="text-xs text-gray-400">Waiting in queue...</p>
                    )}

                    {/* Expand Button */}
                    {agent.status === 'completed' && (
                      <button
                        onClick={() => setExpandedAgent(isExpanded ? null : agent.type)}
                        className="mt-2 flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-3 h-3" />
                            Hide details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3 h-3" />
                            Show detailed reasoning
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && agent.status === 'completed' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <div className="text-xs text-gray-700 whitespace-pre-line leading-relaxed bg-gray-50 p-3 rounded">
                        {agent.detailedReasoning}
                      </div>
                      {agent.confidence && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-600">Confidence</span>
                            <span className="font-semibold text-gray-900">
                              {Math.round(agent.confidence * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-full bg-green-500 rounded-full transition-all duration-500"
                              style={{ width: `${agent.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
