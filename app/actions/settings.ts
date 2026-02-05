'use server'

import { createClient } from '@/lib/supabase/server'

export async function updateUserPreferences(preferences: {
  emailNotifications?: boolean
  unit?: 'kWh' | 'kW'
  theme?: 'light' | 'dark'
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase.auth.updateUser({
    data: {
      preferences,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, preferences }
}

export async function getUserPreferences() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  return { preferences: user.user_metadata?.preferences || {} }
}
