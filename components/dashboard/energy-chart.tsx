'use client';

import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { time: '12 AM', generated: 0, consumed: 1.2, forecasted: 0 },
  { time: '2 AM', generated: 0, consumed: 0.8, forecasted: 0 },
  { time: '4 AM', generated: 0, consumed: 0.6, forecasted: 0 },
  { time: '6 AM', generated: 0.5, consumed: 0.7, forecasted: 0.4 },
  { time: '8 AM', generated: 2.1, consumed: 1.2, forecasted: 2.0 },
  { time: '10 AM', generated: 3.8, consumed: 1.5, forecasted: 3.7 },
  { time: '12 PM', generated: 4.5, consumed: 2.1, forecasted: 4.6 },
  { time: '2 PM', generated: 4.2, consumed: 1.8, forecasted: 4.3 },
  { time: '4 PM', generated: 3.1, consumed: 1.6, forecasted: 3.2 },
  { time: '6 PM', generated: 1.2, consumed: 2.5, forecasted: 1.3 },
  { time: '8 PM', generated: 0.1, consumed: 2.8, forecasted: 0.2 },
  { time: '10 PM', generated: 0, consumed: 2.2, forecasted: 0 },
];

export function EnergyChart() {
  const primaryColor = 'rgb(88, 179, 222)';
  const accentColor = 'rgb(255, 165, 0)';
  const borderColor = 'rgb(230, 230, 230)';
  const textColor = 'rgb(100, 100, 100)';

  return (
    <Card className="p-6 border-0">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Power Generation</h2>
          <p className="text-xs text-muted-foreground mt-1">6 AM - 6 PM</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorGenerated" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.6} />
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={borderColor} vertical={false} />
            <XAxis dataKey="time" stroke={textColor} style={{ fontSize: '12px' }} />
            <YAxis stroke={textColor} style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
              }}
              labelStyle={{ color: textColor }}
            />
            <Area
              type="monotone"
              dataKey="generated"
              stroke={primaryColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGenerated)"
              name="Power (kW)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
