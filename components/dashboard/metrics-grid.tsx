'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  trend: number;
  color: string;
}

function MetricCard({ label, value, unit, trend, color }: MetricCardProps) {
  return (
    <Card className="p-4 bg-card border-0">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-primary">
          <TrendingUp className="w-3 h-3" />
          <span>+{trend}% vs last month</span>
        </div>
      </div>
    </Card>
  );
}

export function MetricsGrid() {
  const metrics: MetricCardProps[] = [
    {
      label: 'Total Energy Generated',
      value: '15,240',
      unit: 'kWh',
      trend: 11,
      color: 'bg-primary',
    },
    {
      label: 'Current Power Output',
      value: '5.8',
      unit: 'kW',
      trend: 18,
      color: 'bg-accent',
    },
    {
      label: 'System Efficiency',
      value: '96.8',
      unit: '%',
      trend: 5,
      color: 'bg-green-500',
    },
    {
      label: 'Cost Savings (KES)',
      value: '385,400',
      unit: 'this month',
      trend: 22,
      color: 'bg-cyan-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </div>
  );
}
