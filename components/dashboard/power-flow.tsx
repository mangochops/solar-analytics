'use client';

import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export function PowerFlow() {
  const data = {
    solarProduction: 4.62,
    consumption: 3.85,
    gridExport: 0.77,
    batteryCharge: 0.23,
    inverterStatus: 'Normal',
  };

  const weatherImpact = -0.77;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Power Flow</h2>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              data.inverterStatus === 'Normal'
                ? 'bg-green-100'
                : 'bg-yellow-100'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              data.inverterStatus === 'Normal'
                ? 'bg-green-600'
                : 'bg-yellow-600'
            }`} />
            <span className={`text-xs font-medium ${
              data.inverterStatus === 'Normal'
                ? 'text-green-900'
                : 'text-yellow-900'
            }`}>
              {data.inverterStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Solar Panel */}
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Solar Panel</p>
              <p className="text-2xl font-bold text-foreground">{data.solarProduction}</p>
              <p className="text-xs text-muted-foreground">kW</p>
            </div>
          </div>

          {/* Arrows and Inverter */}
          <div className="flex flex-col items-center justify-around py-2">
            <svg
              className="w-8 h-8 text-primary mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <div className="bg-card border border-border rounded-lg p-3 text-center min-w-24">
              <p className="text-xs text-muted-foreground mb-1">Inverter</p>
              <svg className="w-6 h-6 mx-auto text-muted-foreground mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            <svg
              className="w-8 h-8 text-primary mt-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>

          {/* Consumption */}
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">🏠</div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Consumption</p>
              <p className="text-2xl font-bold text-foreground">{data.consumption}</p>
              <p className="text-xs text-muted-foreground">kW</p>
            </div>
          </div>
        </div>

        {/* Weather Impact */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-blue-900">Fresh wind impact</p>
            <p className="text-sm text-blue-800">{weatherImpact} kW reduction due to wind conditions</p>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Grid Export</p>
            <p className="text-xl font-bold text-foreground">{data.gridExport} kW</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Battery Charge</p>
            <p className="text-xl font-bold text-foreground">{data.batteryCharge} kW</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
