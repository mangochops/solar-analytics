'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import { updateUserPreferences } from '@/app/actions/settings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [unit, setUnit] = useState<'kWh' | 'kW'>('kWh');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserPreferences({
        emailNotifications,
        unit,
        theme,
      });
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsSaving(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Settings</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Email Notifications
            </label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-4 h-4 rounded border border-border"
              />
              <span className="text-sm text-muted-foreground">
                Receive alerts and updates
              </span>
            </div>
          </div>

          {/* Unit Preference */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Energy Unit
            </label>
            <div className="flex gap-2">
              {(['kWh', 'kW'] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    unit === u
                      ? 'bg-primary text-card'
                      : 'bg-secondary/50 text-foreground hover:bg-secondary'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Theme
            </label>
            <div className="flex gap-2">
              {(['light', 'dark'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    theme === t
                      ? 'bg-primary text-card'
                      : 'bg-secondary/50 text-foreground hover:bg-secondary'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
