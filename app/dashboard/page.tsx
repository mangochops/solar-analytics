'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { MetricsGrid } from '@/components/dashboard/metrics-grid';
import { PowerFlow } from '@/components/dashboard/power-flow';
import { EnergyChart } from '@/components/dashboard/energy-chart';
import { AlertsPanel } from '@/components/dashboard/alerts-panel';
import { SystemStatus } from '@/components/dashboard/system-status';
import { MonthlyEnergyChart } from '@/components/dashboard/monthly-energy-chart';
import { EnergyDistribution } from '@/components/dashboard/energy-distribution';
import { CO2Savings } from '@/components/dashboard/co2-savings';
import { FinancialBreakdown } from '@/components/dashboard/financial-breakdown';
import { EfficiencyHeatmap } from '@/components/dashboard/efficiency-heatmap';
import { PeakHours } from '@/components/dashboard/peak-hours';
import { KenyanRegions } from '@/components/dashboard/kenyan-regions';
import { SeasonalPatterns } from '@/components/dashboard/seasonal-patterns';
import { ProjectsList } from '@/components/dashboard/projects-list';
import { SolarProjectForm } from '@/components/dashboard/solar-project-form';


export default function DashboardPage() {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(0);

  const handleProjectSuccess = () => {
    setShowProjectForm(false);
    setRefreshProjects((prev) => prev + 1);
  };
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="px-6 py-8 space-y-6 max-w-7xl mx-auto">
        {/* Solar Projects */}
        <ProjectsList onAddClick={() => setShowProjectForm(true)} />

        {/* Metrics Overview */}
        <MetricsGrid />

        {/* Power Flow and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PowerFlow />
          </div>
          <AlertsPanel />
        </div>

        {/* Hourly and Real-time Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnergyChart />
          <SystemStatus />
        </div>

        {/* Kenyan Regional Analysis */}
        <KenyanRegions />

        {/* Seasonal Patterns */}
        <SeasonalPatterns />

        {/* Daily Distribution and Energy Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnergyDistribution />
          <CO2Savings />
        </div>

        {/* Monthly Trends */}
        <MonthlyEnergyChart />

        {/* Peak Hours Analysis */}
        <PeakHours />

        {/* Efficiency Heatmap */}
        <EfficiencyHeatmap />

        {/* Financial Breakdown */}
        <FinancialBreakdown />
      </div>
      {/* Solar Project Form Modal */}
      {showProjectForm && (
        <SolarProjectForm
          onClose={() => setShowProjectForm(false)}
          onSuccess={handleProjectSuccess}
        />
      )}
    </main>
  );
}
