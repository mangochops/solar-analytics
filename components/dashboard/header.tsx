'use client';

import { Button } from '@/components/ui/button';
import { Settings, Download, MapPin, Cloud, ChevronDown, LogOut, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { signOut } from '@/app/actions/auth';
import { exportDashboardData } from '@/app/actions/export';
import { SettingsModal } from './settings-modal';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

interface KenyanLocation {
  name: string;
  latitude: number;
  longitude: number;
}

const KENYAN_LOCATIONS: KenyanLocation[] = [
  { name: 'Nairobi, Kenya', latitude: -1.2865, longitude: 36.8172 },
  { name: 'Mombasa, Kenya', latitude: -4.0435, longitude: 39.6682 },
  { name: 'Kisumu, Kenya', latitude: -0.1022, longitude: 34.7617 },
  { name: 'Eldoret, Kenya', latitude: 0.5143, longitude: 35.2799 },
  { name: 'Nakuru, Kenya', latitude: -0.2833, longitude: 36.0667 },
  { name: 'Kericho, Kenya', latitude: -0.3667, longitude: 35.2833 },
  { name: 'Lamu, Kenya', latitude: -2.2667, longitude: 40.9 },
  { name: 'Isiolo, Kenya', latitude: 0.35, longitude: 37.583 },
];

export function DashboardHeader() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(KENYAN_LOCATIONS[0]);
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const csv = await exportDashboardData();
      const element = document.createElement('a');
      const file = new Blob([csv], { type: 'text/csv' });
      element.href = URL.createObjectURL(file);
      element.download = `solar-data-${new Date().getTime()}.csv`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.latitude}&longitude=${selectedLocation.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
        );
        const data = await response.json();
        const current = data.current;

        const weatherConditions: Record<number, string> = {
          0: 'Clear Sky',
          1: 'Mainly Clear',
          2: 'Partly Cloudy',
          3: 'Overcast',
          45: 'Foggy',
          48: 'Depositing Rime Fog',
          51: 'Light Drizzle',
          53: 'Moderate Drizzle',
          55: 'Dense Drizzle',
          61: 'Slight Rain',
          63: 'Moderate Rain',
          65: 'Heavy Rain',
          71: 'Slight Snow',
          73: 'Moderate Snow',
          75: 'Heavy Snow',
          80: 'Slight Rain Showers',
          81: 'Moderate Rain Showers',
          82: 'Violent Rain Showers',
          85: 'Slight Snow Showers',
          86: 'Heavy Snow Showers',
          95: 'Thunderstorm',
          96: 'Thunderstorm with Slight Hail',
          99: 'Thunderstorm with Heavy Hail',
        };

        setWeather({
          location: selectedLocation.name,
          temperature: Math.round(current.temperature_2m),
          condition: weatherConditions[current.weather_code] || 'Unknown',
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
        });
      } catch (error) {
        console.error('Failed to fetch weather:', error);
        setWeather({
          location: selectedLocation.name,
          temperature: 28,
          condition: 'Partly Cloudy',
          humidity: 70,
          windSpeed: 7.2,
        });
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [selectedLocation]);

  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-card text-lg font-bold">
                ☀️
              </div>
              <h1 className="text-3xl font-bold text-foreground">SolarSync Kenya</h1>
            </div>
            <p className="text-muted-foreground">Real-time solar energy analytics for Kenya</p>
          </div>
          <div className="flex items-center gap-2 relative">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              onClick={handleExport}
              disabled={isExporting}
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <User className="w-4 h-4" />
              </Button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-20">
                  <button
                    onClick={() => {
                      setShowSettings(true);
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-secondary/50 transition-colors flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      signOut();
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-secondary/50 transition-colors flex items-center gap-2 text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {weather && !loading && (
          <div className="space-y-4">
            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLocationMenu(!showLocationMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary/70 border border-border rounded-lg transition-colors w-full sm:w-auto"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{selectedLocation.name}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
              </button>

              {showLocationMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                  {KENYAN_LOCATIONS.map((location) => (
                    <button
                      key={location.name}
                      onClick={() => {
                        setSelectedLocation(location);
                        setShowLocationMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary/50 transition-colors ${
                        selectedLocation.name === location.name
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-foreground'
                      }`}
                    >
                      {location.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Weather Information */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Weather</p>
                  <p className="text-sm font-semibold text-foreground">{weather.temperature}°C</p>
                  <p className="text-xs text-muted-foreground">{weather.condition}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="text-lg font-bold text-foreground">{weather.humidity}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Wind Speed</p>
                <p className="text-lg font-bold text-foreground">{weather.windSpeed} m/s</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Sync</p>
                <p className="text-sm font-medium text-foreground">Just now</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </header>
  );
}
