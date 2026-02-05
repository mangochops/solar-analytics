'use client';

import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const savingsData = [
  { name: 'Self Consumed', value: 65 },
  { name: 'Exported to Grid', value: 35 },
];

const colors = ['oklch(0.72 0.21 96.88)', 'oklch(0.61 0.23 54.18)'];

export function FinancialSummary() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Financial Summary</h2>
          <p className="text-sm text-muted-foreground">Monthly revenue breakdown</p>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={savingsData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {colors.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'oklch(0.15 0.01 0)',
                border: '1px solid oklch(0.25 0.01 0)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'oklch(0.96 0.01 0)' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground">Monthly Savings</p>
            <p className="text-3xl font-bold text-primary">$3,245</p>
            <p className="text-xs text-green-500 mt-1">↑ 15% increase</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Annual Projection</p>
            <p className="text-3xl font-bold text-accent">$38,940</p>
            <p className="text-xs text-muted-foreground mt-1">Based on avg output</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
