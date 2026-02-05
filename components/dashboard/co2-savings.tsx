'use client';

import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf } from 'lucide-react';

const data = [
  { week: 'Week 1', co2: 45, trees: 2.1 },
  { week: 'Week 2', co2: 92, trees: 4.3 },
  { week: 'Week 3', co2: 138, trees: 6.4 },
  { week: 'Week 4', co2: 185, trees: 8.6 },
  { week: 'Week 5', co2: 240, trees: 11.2 },
  { week: 'Week 6', co2: 298, trees: 13.9 },
];

export function CO2Savings() {
  const lineColor = 'rgb(100, 200, 150)';
  const borderColor = 'rgb(230, 230, 230)';
  const textColor = 'rgb(100, 100, 100)';

  return (
    <Card className="p-6 border-0">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Environmental Impact</h2>
            <p className="text-xs text-muted-foreground mt-1">CO2 offset this month</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 text-sm font-semibold text-foreground">
              <Leaf className="w-4 h-4 text-green-600" />
              <span>298 kg CO2</span>
            </div>
            <p className="text-xs text-muted-foreground">≈ 14 trees planted</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={borderColor} vertical={false} />
            <XAxis dataKey="week" stroke={textColor} style={{ fontSize: '12px' }} />
            <YAxis yAxisId="left" stroke={textColor} style={{ fontSize: '12px' }} label={{ value: 'CO2 (kg)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" stroke={textColor} style={{ fontSize: '12px' }} label={{ value: 'Trees', angle: 90, position: 'insideRight' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
              }}
              labelStyle={{ color: textColor }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="co2"
              stroke={lineColor}
              strokeWidth={2}
              dot={{ fill: lineColor, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
