'use client';

import { Card } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Self Consumption', value: 45 },
  { name: 'Grid Export', value: 35 },
  { name: 'Battery Storage', value: 20 },
];

export function EnergyDistribution() {
  const colors = ['rgb(88, 179, 222)', 'rgb(255, 165, 0)', 'rgb(100, 200, 150)'];
  const borderColor = 'rgb(230, 230, 230)';
  const textColor = 'rgb(100, 100, 100)';

  return (
    <Card className="p-6 border-0">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Energy Distribution</h2>
          <p className="text-xs text-muted-foreground mt-1">Today's energy allocation</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
              }}
              labelStyle={{ color: textColor }}
              formatter={(value) => `${value}%`}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
