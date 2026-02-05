'use client';

import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const seasonalData = [
  { month: 'Jan', generation: 5.8, rainfall: 12, temperature: 25 },
  { month: 'Feb', generation: 6.2, rainfall: 15, temperature: 26 },
  { month: 'Mar', generation: 5.5, rainfall: 45, temperature: 25 },
  { month: 'Apr', generation: 4.8, rainfall: 85, temperature: 24 },
  { month: 'May', generation: 5.2, rainfall: 95, temperature: 23 },
  { month: 'Jun', generation: 4.9, rainfall: 105, temperature: 21 },
  { month: 'Jul', generation: 5.1, rainfall: 92, temperature: 20 },
  { month: 'Aug', generation: 5.4, rainfall: 75, temperature: 21 },
  { month: 'Sep', generation: 5.9, rainfall: 65, temperature: 23 },
  { month: 'Oct', generation: 6.1, rainfall: 75, temperature: 24 },
  { month: 'Nov', generation: 5.8, rainfall: 68, temperature: 25 },
  { month: 'Dec', generation: 5.5, rainfall: 25, temperature: 26 },
];

export function SeasonalPatterns() {
  return (
    <Card className="p-6 border-0">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Annual Solar Patterns in Kenya</h2>
          <p className="text-xs text-muted-foreground mt-1">Generation, rainfall, and temperature trends</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={seasonalData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(230, 230, 230)" vertical={false} />
            <XAxis dataKey="month" stroke="rgb(100, 100, 100)" style={{ fontSize: '12px' }} />
            <YAxis stroke="rgb(100, 100, 100)" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: '1px solid rgb(230, 230, 230)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'rgb(100, 100, 100)' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="generation"
              stroke="rgb(88, 179, 222)"
              strokeWidth={2}
              name="Solar Generation (kWh/m²)"
              dot={{ fill: 'rgb(88, 179, 222)', r: 4 }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="rainfall"
              stroke="rgb(100, 150, 200)"
              strokeWidth={2}
              name="Rainfall (mm)"
              dot={{ fill: 'rgb(100, 150, 200)', r: 4 }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="rgb(255, 140, 0)"
              strokeWidth={2}
              name="Temperature (°C)"
              dot={{ fill: 'rgb(255, 140, 0)', r: 4 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
