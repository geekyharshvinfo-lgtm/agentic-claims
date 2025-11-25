import { motion } from 'framer-motion';
import { Camera, FileText, Scale, ShieldAlert, IndianRupee } from 'lucide-react';
import { AgentOutput, AgentType } from '@/types';
import { agentConversation } from '@/data/agentResponses';
import { cn } from '@/utils/cn';

interface AgentConversationProps {
  agents: AgentOutput[];
}

const agentIcons: Record<AgentType, React.ElementType> = {
  document_ingest: FileText,
  vision: Camera,
  document_analysis: FileText,
  liability: Scale,
  fraud: ShieldAlert,
  payout: IndianRupee,
};

const agentColors: Record<AgentType, string> = {
  document_ingest: 'bg-blue-500',
  vision: 'bg-purple-500',
  document_analysis: 'bg-green-500',
  liability: 'bg-yellow-500',
  fraud: 'bg-red-500',
  payout: 'bg-emerald-500',
};

export default function AgentConversation({ agents }: AgentConversationProps) {
  // Only show messages for completed agents
  const completedAgentTypes = agents
    .filter(a => a.status === 'completed')
    .map(a => a.type);

  const visibleMessages = agentConversation.filter(msg =>
    completedAgentTypes.includes(msg.agentType)
  );

  if (visibleMessages.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-gray-400">
        Conversation will appear as agents complete their work...
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {visibleMessages.map((message, index) => {
        const Icon = agentIcons[message.agentType];
        const colorClass = agentColors[message.agentType];

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3"
          >
            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', colorClass)}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-900">
                  {message.agentType.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')} Agent
                </span>
                <span className="text-xs text-gray-400">{message.timestamp}</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg rounded-tl-none px-3 py-2">
                <p className="text-xs text-gray-700 leading-relaxed">{message.message}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
