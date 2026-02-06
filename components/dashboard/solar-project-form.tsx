'use client';

import React from "react"

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Plus, AlertCircle } from 'lucide-react';
import { addSolarProject } from '@/app/actions/solar-projects';

interface SolarProjectFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function SolarProjectForm({ onClose, onSuccess }: SolarProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    projectName: '',
    location: 'Nairobi, Kenya',
    installationDate: '',
    systemCapacity: '',
    panelType: 'Monocrystalline',
    numberOfPanels: '',
    inverterCapacity: '',
    batteryCapacity: '',
    gridConnected: true,
    latitude: '',
    longitude: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.projectName || !formData.systemCapacity || !formData.numberOfPanels) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const result = await addSolarProject({
        project_name: formData.projectName,
        location: formData.location,
        installation_date: formData.installationDate || new Date().toISOString().split('T')[0],
        system_capacity_kw: parseFloat(formData.systemCapacity),
        panel_type: formData.panelType,
        number_of_panels: parseInt(formData.numberOfPanels),
        inverter_capacity_kw: formData.inverterCapacity ? parseFloat(formData.inverterCapacity) : null,
        battery_capacity_kwh: formData.batteryCapacity ? parseFloat(formData.batteryCapacity) : null,
        grid_connected: formData.gridConnected,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        description: formData.description || null,
      });

      if (result.error) {
        setError(result.error);
      } else {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add solar project');
    } finally {
      setLoading(false);
    }
  };

  const KENYAN_LOCATIONS = [
    'Nairobi, Kenya',
    'Mombasa, Kenya',
    'Kisumu, Kenya',
    'Eldoret, Kenya',
    'Nakuru, Kenya',
    'Kericho, Kenya',
    'Lamu, Kenya',
    'Isiolo, Kenya',
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Add Solar Project</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="e.g., Home Solar System"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {KENYAN_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Installation Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Installation Date
                </label>
                <input
                  type="date"
                  name="installationDate"
                  value={formData.installationDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* System Capacity */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  System Capacity (kW) *
                </label>
                <input
                  type="number"
                  name="systemCapacity"
                  value={formData.systemCapacity}
                  onChange={handleChange}
                  placeholder="e.g., 5.0"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
          </div>

          {/* Panel Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Panel Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Panel Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Panel Type
                </label>
                <select
                  name="panelType"
                  value={formData.panelType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Monocrystalline">Monocrystalline</option>
                  <option value="Polycrystalline">Polycrystalline</option>
                  <option value="Thin-film">Thin-film</option>
                  <option value="Bifacial">Bifacial</option>
                </select>
              </div>

              {/* Number of Panels */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Number of Panels *
                </label>
                <input
                  type="number"
                  name="numberOfPanels"
                  value={formData.numberOfPanels}
                  onChange={handleChange}
                  placeholder="e.g., 10"
                  min="1"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Inverter Capacity */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Inverter Capacity (kW)
                </label>
                <input
                  type="number"
                  name="inverterCapacity"
                  value={formData.inverterCapacity}
                  onChange={handleChange}
                  placeholder="e.g., 5.0"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Battery Capacity */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Battery Capacity (kWh)
                </label>
                <input
                  type="number"
                  name="batteryCapacity"
                  value={formData.batteryCapacity}
                  onChange={handleChange}
                  placeholder="e.g., 10.0"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Advanced Settings</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Grid Connected */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="gridConnected"
                  name="gridConnected"
                  checked={formData.gridConnected}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-border"
                />
                <label htmlFor="gridConnected" className="text-sm font-medium text-foreground">
                  Grid Connected
                </label>
              </div>

              {/* Latitude */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="-1.2865"
                  step="0.0001"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Longitude */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="36.8172"
                  step="0.0001"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add any additional notes about this solar project..."
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              {loading ? 'Adding Project...' : 'Add Solar Project'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
