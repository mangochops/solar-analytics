'use client';

import { Card } from '@/components/ui/card';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];

// Sample efficiency data (0-100)
const efficiencyData = [
  [5, 4, 3, 15, 35, 68, 92, 75],
  [4, 3, 5, 18, 42, 75, 88, 70],
  [6, 5, 8, 22, 48, 82, 95, 72],
  [5, 4, 6, 20, 45, 78, 90, 68],
  [7, 6, 12, 28, 55, 85, 96, 80],
  [8, 7, 14, 32, 62, 92, 98, 85],
  [9, 8, 18, 35, 65, 88, 94, 82],
];

function getHeatmapColor(value: number): string {
  if (value < 20) return 'bg-blue-100';
  if (value < 40) return 'bg-blue-200';
  if (value < 60) return 'bg-blue-300';
  if (value < 80) return 'bg-blue-400';
  return 'bg-blue-500';
}

export function EfficiencyHeatmap() {
  return (
    <Card className="p-6 border-0">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">System Efficiency Heatmap</h2>
          <p className="text-xs text-muted-foreground mt-1">Weekly efficiency patterns by hour</p>
        </div>

        <div className="overflow-x-auto">
          <div className="space-y-2">
            {/* Hours header */}
            <div className="flex gap-1">
              <div className="w-12" />
              {days.map((day) => (
                <div key={day} className="w-16 text-center">
                  <p className="text-xs font-medium text-muted-foreground">{day}</p>
                </div>
              ))}
            </div>

            {/* Heatmap rows */}
            {hours.map((hour, hourIndex) => (
              <div key={hour} className="flex gap-1 items-center">
                <div className="w-12">
                  <p className="text-xs font-medium text-muted-foreground text-right">{hour}</p>
                </div>
                {efficiencyData.map((dayData, dayIndex) => {
                  const value = dayData[hourIndex];
                  return (
                    <div
                      key={`${dayIndex}-${hourIndex}`}
                      className={`w-16 h-10 rounded flex items-center justify-center cursor-pointer transition-colors hover:opacity-80 ${getHeatmapColor(value)}`}
                      title={`${days[dayIndex]} at ${hour}: ${value}% efficiency`}
                    >
                      <span className="text-xs font-semibold text-foreground">{value}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">Low</span>
          <div className="flex gap-1">
            {[
              'bg-blue-100',
              'bg-blue-200',
              'bg-blue-300',
              'bg-blue-400',
              'bg-blue-500',
            ].map((color, index) => (
              <div key={index} className={`w-6 h-6 rounded ${color}`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">High</span>
        </div>
      </div>
    </Card>
  );
}
