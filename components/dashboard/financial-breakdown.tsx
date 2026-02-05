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
import { DollarSign, TrendingUp } from 'lucide-react';

const data = [
  { month: 'Jan', savings: 48, expenses: 120 },
  { month: 'Feb', savings: 72, expenses: 115 },
  { month: 'Mar', savings: 96, expenses: 110 },
  { month: 'Apr', savings: 126, expenses: 105 },
  { month: 'May', savings: 150, expenses: 100 },
  { month: 'Jun', savings: 168, expenses: 98 },
];

export function FinancialBreakdown() {
  const savingsColor = 'rgb(100, 200, 150)';
  const expensesColor = 'rgb(220, 100, 100)';
  const borderColor = 'rgb(230, 230, 230)';
  const textColor = 'rgb(100, 100, 100)';

  const totalSavings = data.reduce((sum, item) => sum + item.savings, 0);
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);
  const netSavings = totalSavings - totalExpenses;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <p className="text-xs font-medium text-muted-foreground uppercase">Total Saved</p>
            </div>
            <p className="text-2xl font-bold text-foreground">${totalSavings.toFixed(0)}</p>
            <p className="text-xs text-green-600">+12% from last month</p>
          </div>
        </Card>
        <Card className="p-4 border-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <p className="text-xs font-medium text-muted-foreground uppercase">Net Benefit</p>
            </div>
            <p className="text-2xl font-bold text-foreground">${netSavings.toFixed(0)}</p>
            <p className="text-xs text-blue-600">ROI: 78%</p>
          </div>
        </Card>
        <Card className="p-4 border-0">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase">Payback Period</p>
            <p className="text-2xl font-bold text-foreground">6.2 years</p>
            <p className="text-xs text-muted-foreground">At current rate</p>
          </div>
        </Card>
      </div>

      <Card className="p-6 border-0">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Financial Trends</h2>
            <p className="text-xs text-muted-foreground mt-1">Savings vs grid expenses (USD)</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
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
                formatter={(value) => `$${value}`}
              />
              <Legend wrapperStyle={{ paddingTop: '16px' }} />
              <Bar dataKey="savings" fill={savingsColor} name="Savings ($)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill={expensesColor} name="Expenses ($)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
