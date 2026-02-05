'use client';

import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const regionalData = [
  { region: 'Nairobi', potential: 5.8, current: 5.2, capacity: 8.5 },
  { region: 'Mombasa', potential: 6.2, current: 5.9, capacity: 9.2 },
  { region: 'Kisumu', potential: 5.5, current: 4.8, capacity: 7.8 },
  { region: 'Eldoret', potential: 6.0, current: 5.5, capacity: 8.9 },
  { region: 'Nakuru', potential: 5.9, current: 5.3, capacity: 8.7 },
  { region: 'Kericho', potential: 5.2, current: 4.6, capacity: 7.5 },
];

export function KenyanRegions() {
  return (
    <Card className="p-6 border-0">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Solar Potential by Kenyan Region</h2>
          <p className="text-xs text-muted-foreground mt-1">kWh/m²/day comparison across major regions</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={regionalData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(230, 230, 230)" vertical={false} />
            <XAxis dataKey="region" stroke="rgb(100, 100, 100)" style={{ fontSize: '12px' }} />
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
            <Bar dataKey="potential" fill="rgb(255, 165, 0)" name="Solar Potential" />
            <Bar dataKey="current" fill="rgb(88, 179, 222)" name="Current Output" />
            <Bar dataKey="capacity" fill="rgb(144, 238, 144)" name="Max Capacity" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
