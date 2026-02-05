# SolarSync Kenya - Setup Guide

## Overview
SolarSync Kenya is a comprehensive solar energy analytics dashboard for Kenyan locations with authentication, real-time weather integration, and advanced analytics.

## Features Implemented

### Authentication System
- User registration and login with Supabase Auth
- Email-based authentication with confirmation
- Protected dashboard routes
- User session management
- Sign-out functionality

### Dashboard Buttons & Functions
- **Export Button**: Exports dashboard data as CSV file
- **Settings Button**: Opens user preferences modal
  - Email notifications toggle
  - Energy unit selection (kWh/kW)
  - Theme preference (light/dark)
- **Sign Out Button**: Safely logs out users
- **Location Selector**: Switch between 8 Kenyan cities with live weather
- **Alert Management**: Dismiss individual alerts, view all alerts

### Analytics Graphics
- Real-time power generation charts
- Monthly energy comparison
- Energy distribution (pie chart)
- CO2 savings tracking
- Financial breakdown analysis
- Efficiency heatmaps
- Peak hours analysis
- Kenyan regional solar potential
- Seasonal generation patterns

### Localization
- 8 Kenyan locations: Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, Kericho, Lamu, Isiolo
- Real-time weather data from OpenMeteo API
- Kenya-specific metrics (costs in KES)
- Regional solar potential comparison

## Setup Instructions

### 1. Supabase Configuration

First, create a Supabase project:

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Copy your Supabase URL and Anon Key

### 2. Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 3. Database Setup (Optional)

If you want to store user preferences and additional data, create these tables in Supabase:

```sql
-- User profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  location text default 'Nairobi, Kenya',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);
```

### 4. File Structure

```
app/
├── auth/
│   ├── callback/route.ts          # Email confirmation callback
│   ├── error/page.tsx              # Auth error page
│   ├── login/page.tsx              # Sign in page
│   └── sign-up/page.tsx            # Registration page
├── actions/
│   ├── auth.ts                     # Auth server actions
│   ├── export.ts                   # Data export functionality
│   └── settings.ts                 # User preferences
├── dashboard/
│   ├── layout.tsx                  # Protected layout
│   └── page.tsx                    # Main dashboard
└── page.tsx                        # Landing page

lib/supabase/
├── client.ts                       # Browser client
├── server.ts                       # Server client
└── proxy.ts                        # Session handling

components/dashboard/
├── header.tsx                      # Header with auth & export
├── settings-modal.tsx              # Settings dialog
├── alerts-panel.tsx                # Alert management
├── power-flow.tsx                  # Energy flow visualization
├── energy-chart.tsx                # Hourly generation chart
├── monthly-energy-chart.tsx        # Monthly trends
├── energy-distribution.tsx         # Energy allocation pie chart
├── co2-savings.tsx                 # Environmental impact
├── financial-breakdown.tsx         # Cost analysis
├── efficiency-heatmap.tsx          # Performance patterns
├── peak-hours.tsx                  # Demand analysis
├── kenyan-regions.tsx              # Regional comparison
└── seasonal-patterns.tsx           # Annual trends
```

## Button Functionality

### Export Button
- Click to download dashboard metrics as CSV
- Includes current metrics, hourly data, and efficiency stats
- File named with timestamp: `solar-data-{timestamp}.csv`

### Settings Button
- Opens modal to configure:
  - Email notifications
  - Preferred energy unit
  - Theme preference
- Changes are saved to user metadata
- Settings persist across sessions

### Location Selector
- Dropdown with 8 Kenyan locations
- Updates weather data in real-time
- Shows temperature, humidity, wind speed
- Affects analytics dashboard data context

### Alert Management
- Dismiss individual alerts by clicking the X
- View all alerts with "View All" button
- Shows 3 alerts by default, expandable
- Different alert types: warning, success, error

### User Menu
- Profile settings access
- Sign out button
- Accessible via user icon in header

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## Authentication Flow

1. **Landing Page** (`/`) - Redirects authenticated users to dashboard
2. **Sign Up** (`/auth/sign-up`) - Create new account with email
3. **Sign In** (`/auth/login`) - Login with credentials
4. **Email Confirmation** (`/auth/callback`) - Verify email from link
5. **Dashboard** (`/dashboard`) - Protected route with analytics
6. **Sign Out** - Clears session and redirects to login

## Weather Data

Weather data comes from OpenMeteo (free API, no key required):
- Real-time temperature and conditions
- Humidity levels
- Wind speed
- Updates when location changes

## Data Export

The export function creates a CSV with:
- Dashboard timestamp
- Current metrics (generation, efficiency, savings)
- Hourly power generation data
- System status

## API Actions

### Sign Up
```typescript
signUp(email: string, password: string)
// Returns: { error?: string, success?: boolean }
```

### Sign In
```typescript
signIn(email: string, password: string)
// Redirects to /dashboard on success
```

### Sign Out
```typescript
signOut()
// Redirects to /auth/login
```

### Export Data
```typescript
exportDashboardData()
// Returns: CSV string
```

### Update Preferences
```typescript
updateUserPreferences({
  emailNotifications?: boolean,
  unit?: 'kWh' | 'kW',
  theme?: 'light' | 'dark'
})
// Returns: { error?: string, preferences?: object, success?: boolean }
```

## Deployment

### Vercel
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_SITE_URL
vercel deploy
```

### Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD npm start
```

## Troubleshooting

### Authentication Issues
- Verify Supabase URL and keys in environment variables
- Check email confirmation link in browser console
- Ensure callback URL matches your domain

### Export Not Working
- Check browser console for errors
- Verify user has proper permissions
- Try a different file format or location

### Weather Not Updating
- Check OpenMeteo API status
- Verify location coordinates are correct
- Check browser console for network errors

## Security

- All API routes protected with Supabase auth
- Row Level Security (RLS) policies on database tables
- User data isolated to their own profiles
- Email confirmation required for email-based auth
- Secure session cookies via supabase/ssr

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Supabase documentation
3. Check browser console for error messages
4. Verify environment variables are set correctly
