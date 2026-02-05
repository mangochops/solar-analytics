'use client';

import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'success';
  timestamp: string;
}

export function AlertsPanel() {
  const initialAlerts: Alert[] = [
    {
      id: '1',
      title: 'Low Efficiency Detected',
      message: '25/11/2024 02:05 AM',
      type: 'warning',
      timestamp: '25/11/2024 02:05 AM',
    },
    {
      id: '2',
      title: 'Battery Charge Low',
      message: '19/11/2024 09:34 AM',
      type: 'warning',
      timestamp: '19/11/2024 09:34 AM',
    },
    {
      id: '3',
      title: 'Battery Full',
      message: '18/11/2024 04:42 PM',
      type: 'success',
      timestamp: '18/11/2024 04:42 PM',
    },
    {
      id: '4',
      title: 'High Energy Output',
      message: '27/11/2024 07:11 PM',
      type: 'success',
      timestamp: '27/11/2024 07:11 PM',
    },
  ];

  const [alerts, setAlerts] = useState(initialAlerts);
  const [showAll, setShowAll] = useState(false);

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const displayedAlerts = showAll ? alerts : alerts.slice(0, 3);

  return (
    <Card className="p-6 border-0">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Alerts ({alerts.length})
          </h2>
          {alerts.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-primary cursor-pointer hover:underline transition-colors"
            >
              {showAll ? 'Show Less' : 'View All'}
            </button>
          )}
        </div>

        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">No alerts</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors group"
              >
                <div className="mt-0.5 flex-shrink-0">
                  {alert.type === 'warning' && (
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  )}
                  {alert.type === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {alert.type === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{alert.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
                </div>
                <button
                  onClick={() => handleDismissAlert(alert.id)}
                  className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
