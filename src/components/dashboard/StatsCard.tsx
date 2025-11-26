import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'blue' | 'amber' | 'green' | 'gray' | 'red';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  gray: 'bg-gray-50 text-gray-700 border-gray-200',
  red: 'bg-red-50 text-red-700 border-red-200',
};

const iconColorClasses = {
  blue: 'text-blue-500',
  amber: 'text-amber-500',
  green: 'text-green-500',
  gray: 'text-gray-500',
  red: 'text-red-500',
};

export default function StatsCard({ title, value, icon: Icon, color, trend }: StatsCardProps) {
  return (
    <div className={`rounded-lg border-2 p-4 ${colorClasses[color]} flex items-center justify-between gap-4`}>
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2 ${iconColorClasses[color]} bg-white/50`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium opacity-70">{title}</p>
          <p className="text-2xl font-bold mt-0.5">{value}</p>
        </div>
      </div>
      {trend && (
        <p className={`text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
        </p>
      )}
    </div>
  );
}
