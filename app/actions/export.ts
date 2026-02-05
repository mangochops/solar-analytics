'use server'

export async function exportDashboardData() {
  // Generate dashboard data export
  const data = {
    timestamp: new Date().toISOString(),
    metrics: {
      totalEnergyGenerated: 15240,
      currentPowerOutput: 5.8,
      systemEfficiency: 96.8,
      costSavings: 385400,
    },
    hourlyData: Array.from({ length: 12 }, (_, i) => ({
      hour: `${6 + i}:00`,
      generated: Math.random() * 6 + 2,
    })),
  }

  // Convert to CSV
  const csv = [
    ['Solar Energy Analytics Export', new Date().toLocaleString()],
    [],
    ['Metric', 'Value'],
    ['Total Energy Generated (kWh)', data.metrics.totalEnergyGenerated],
    ['Current Power Output (kW)', data.metrics.currentPowerOutput],
    ['System Efficiency (%)', data.metrics.systemEfficiency],
    ['Cost Savings (KES)', data.metrics.costSavings],
    [],
    ['Hour', 'Power Generated (kW)'],
    ...data.hourlyData.map((d) => [d.hour, d.generated.toFixed(2)]),
  ]
    .map((row) => row.join(','))
    .join('\n')

  return csv
}
