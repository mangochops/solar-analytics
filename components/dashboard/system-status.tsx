'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Zap } from 'lucide-react';

interface SystemComponent {
  name: string;
  status: 'operational' | 'warning' | 'error';
  efficiency: number;
  temperature?: string;
}

export function SystemStatus() {
  const components: SystemComponent[] = [
    { name: 'Inverter A', status: 'operational', efficiency: 98, temperature: '32°C' },
    { name: 'Inverter B', status: 'operational', efficiency: 97, temperature: '31°C' },
    { name: 'Battery Pack', status: 'operational', efficiency: 92, temperature: '28°C' },
    { name: 'Converter', status: 'operational', efficiency: 99, temperature: '25°C' },
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'operational') {
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    }
    return <AlertCircle className="w-4 h-4 text-yellow-500" />;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'operational') {
      return <Badge className="bg-green-500/20 text-green-200 border-green-500/30">Operational</Badge>;
    }
    return <Badge className="bg-yellow-500/20 text-yellow-200 border-yellow-500/30">Warning</Badge>;
  };

  return (
    <Card className="p-6 space-y-4 border-0">
      <div>
        <h2 className="text-lg font-semibold text-foreground">System Components</h2>
      </div>
      <div className="space-y-2">
        {components.map((component) => (
          <div
            key={component.name}
            className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded transition-colors"
          >
            <div className="flex items-center gap-2 flex-1">
              {getStatusIcon(component.status)}
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{component.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {component.temperature && (
                <span className="text-xs text-muted-foreground">{component.temperature}</span>
              )}
              <span className="text-sm font-semibold text-foreground text-right min-w-10">{component.efficiency}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
