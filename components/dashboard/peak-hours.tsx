'use client';

import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertCircle, TrendingDown } from 'lucide-react';

const data = [
  { hour: '12 AM', solar: 0, demand: 0.8, price: 0.08 },
  { hour: '1 AM', solar: 0, demand: 0.6, price: 0.07 },
  { hour: '2 AM', solar: 0, demand: 0.5, price: 0.06 },
  { hour: '3 AM', solar: 0, demand: 0.4, price: 0.05 },
  { hour: '4 AM', solar: 0, demand: 0.3, price: 0.04 },
  { hour: '5 AM', solar: 0, demand: 0.4, price: 0.05 },
  { hour: '6 AM', solar: 0.2, demand: 0.6, price: 0.08 },
  { hour: '7 AM', solar: 1.2, demand: 1.2, price: 0.12 },
  { hour: '8 AM', solar: 2.4, demand: 1.5, price: 0.14 },
  { hour: '9 AM', solar: 3.5, demand: 1.8, price: 0.16 },
  { hour: '10 AM', solar: 4.2, demand: 2.0, price: 0.18 },
  { hour: '11 AM', solar: 4.8, demand: 2.2, price: 0.20 },
  { hour: '12 PM', solar: 5.0, demand: 2.5, price: 0.22 },
  { hour: '1 PM', solar: 4.9, demand: 2.4, price: 0.21 },
  { hour: '2 PM', solar: 4.5, demand: 2.1, price: 0.19 },
  { hour: '3 PM', solar: 3.8, demand: 1.9, price: 0.17 },
  { hour: '4 PM', solar: 2.6, demand: 1.8, price: 0.16 },
  { hour: '5 PM', solar: 1.2, demand: 2.2, price: 0.15 },
  { hour: '6 PM', solar: 0.2, demand: 2.8, price: 0.18 },
  { hour: '7 PM', solar: 0, demand: 2.5, price: 0.16 },
  { hour: '8 PM', solar: 0, demand: 2.2, price: 0.12 },
  { hour: '9 PM', solar: 0, demand: 1.8, price: 0.10 },
  { hour: '10 PM', solar: 0, demand: 1.4, price: 0.09 },
  { hour: '11 PM', solar: 0, demand: 1.0, price: 0.08 },
];

export function PeakHours() {
  const solarColor = 'rgb(88, 179, 222)';
  const demandColor = 'rgb(220, 100, 100)';
  const priceColor = 'rgb(255, 165, 0)';
  const borderColor = 'rgb(230, 230, 230)';
  const textColor = 'rgb(100, 100, 100)';

  const peakHour = data.reduce((max, item) => (item.demand > max.demand ? item : max));

  return (
    <Card className="p-6 border-0">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Peak Hours Analysis</h2>
            <p className="text-xs text-muted-foreground mt-1">Daily solar production vs grid demand</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1">
                <AlertCircle className="w-3 h-3" />
                Peak Hour
              </div>
              <p className="text-sm font-bold text-foreground">{peakHour.hour}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1">
                <TrendingDown className="w-3 h-3" />
                Lowest Cost
              </div>
              <p className="text-sm font-bold text-foreground">4 AM - 5 AM</p>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={borderColor} vertical={false} />
            <XAxis dataKey="hour" stroke={textColor} style={{ fontSize: '11px' }} angle={-45} textAnchor="end" height={60} />
            <YAxis yAxisId="left" stroke={textColor} style={{ fontSize: '12px' }} label={{ value: 'Power (kW)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" stroke={textColor} style={{ fontSize: '12px' }} label={{ value: 'Price ($/kWh)', angle: 90, position: 'insideRight' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
              }}
              labelStyle={{ color: textColor }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="solar"
              stroke={solarColor}
              strokeWidth={2}
              dot={false}
              name="Solar Production (kW)"
              isAnimationActive={false}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="demand"
              stroke={demandColor}
              strokeWidth={2}
              dot={false}
              name="Grid Demand (kW)"
              isAnimationActive={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="price"
              stroke={priceColor}
              strokeWidth={2}
              dot={false}
              name="Grid Price ($/kWh)"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
