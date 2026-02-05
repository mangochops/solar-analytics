'use client';

import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const efficiencyData = [
  { name: 'Jan', efficiency: 94.2 },
  { name: 'Feb', efficiency: 93.8 },
  { name: 'Mar', efficiency: 95.1 },
  { name: 'Apr', efficiency: 94.9 },
  { name: 'May', efficiency: 95.6 },
  { name: 'Jun', efficiency: 96.2 },
];

export function EfficiencySection() {
  const primaryColor = 'oklch(0.72 0.21 96.88)';
  const gridColor = 'oklch(0.25 0.01 0)';

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">System Efficiency Trend</h2>
          <p className="text-sm text-muted-foreground">Monthly average efficiency rating</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={efficiencyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" stroke="oklch(0.68 0.02 0)" />
            <YAxis stroke="oklch(0.68 0.02 0)" domain={[90, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'oklch(0.15 0.01 0)',
                border: '1px solid oklch(0.25 0.01 0)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'oklch(0.96 0.01 0)' }}
            />
            <Bar dataKey="efficiency" fill={primaryColor} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground">Average</p>
            <p className="text-2xl font-bold text-foreground">95.0%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Peak</p>
            <p className="text-2xl font-bold text-primary">96.2%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Min</p>
            <p className="text-2xl font-bold text-foreground">93.8%</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
