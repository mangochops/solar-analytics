'use client';

import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', generated: 320, consumed: 240, saved: 80 },
  { month: 'Feb', generated: 380, consumed: 260, saved: 120 },
  { month: 'Mar', generated: 450, consumed: 290, saved: 160 },
  { month: 'Apr', generated: 520, consumed: 310, saved: 210 },
  { month: 'May', generated: 580, consumed: 330, saved: 250 },
  { month: 'Jun', generated: 620, consumed: 340, saved: 280 },
  { month: 'Jul', generated: 600, consumed: 350, saved: 250 },
  { month: 'Aug', generated: 560, consumed: 320, saved: 240 },
  { month: 'Sep', consumed: 280, generated: 480, saved: 200 },
  { month: 'Oct', generated: 400, consumed: 260, saved: 140 },
  { month: 'Nov', generated: 320, consumed: 240, saved: 80 },
  { month: 'Dec', generated: 280, consumed: 220, saved: 60 },
];

export function MonthlyEnergyChart() {
  const generatedColor = 'rgb(88, 179, 222)';
  const consumedColor = 'rgb(200, 200, 200)';
  const borderColor = 'rgb(230, 230, 230)';
  const textColor = 'rgb(100, 100, 100)';

  return (
    <Card className="p-6 border-0">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Monthly Overview</h2>
          <p className="text-xs text-muted-foreground mt-1">Energy generated vs consumed (kWh)</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={borderColor} vertical={false} />
            <XAxis dataKey="month" stroke={textColor} style={{ fontSize: '12px' }} />
            <YAxis stroke={textColor} style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
              }}
              labelStyle={{ color: textColor }}
            />
            <Legend wrapperStyle={{ paddingTop: '16px' }} />
            <Bar dataKey="generated" fill={generatedColor} name="Generated (kWh)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="consumed" fill={consumedColor} name="Consumed (kWh)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
