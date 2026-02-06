'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

interface SolarProjectInput {
  project_name: string;
  location: string;
  installation_date: string;
  system_capacity_kw: number;
  panel_type: string;
  number_of_panels: number;
  inverter_capacity_kw: number | null;
  battery_capacity_kwh: number | null;
  grid_connected: boolean;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
}

export async function addSolarProject(data: SolarProjectInput) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'User not authenticated' };
    }

    const { error, data: project } = await supabase
      .from('solar_projects')
      .insert({
        ...data,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding solar project:', error);
      // If table doesn't exist, provide helpful message
      if (error.message?.includes('relations') || error.message?.includes('does not exist')) {
        return {
          error:
            'Solar projects table needs to be created. Please check the SETUP.md instructions to run the database migration.',
        };
      }
      return { error: error.message || 'Failed to add solar project' };
    }

    revalidatePath('/dashboard');
    return { data: project };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function getSolarProjects() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'User not authenticated', data: null };
    }

    const { data, error } = await supabase
      .from('solar_projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching solar projects:', error);
      return { error: error.message || 'Failed to fetch solar projects', data: null };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { error: 'An unexpected error occurred', data: null };
  }
}

export async function deleteSolarProject(projectId: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'User not authenticated' };
    }

    const { error } = await supabase
      .from('solar_projects')
      .delete()
      .eq('id', projectId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting solar project:', error);
      return { error: error.message || 'Failed to delete solar project' };
    }

    revalidatePath('/dashboard');
    return { data: { success: true } };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function updateSolarProject(
  projectId: string,
  data: Partial<SolarProjectInput>
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'User not authenticated' };
    }

    const { error, data: project } = await supabase
      .from('solar_projects')
      .update(data)
      .eq('id', projectId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating solar project:', error);
      return { error: error.message || 'Failed to update solar project' };
    }

    revalidatePath('/dashboard');
    return { data: project };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { error: 'An unexpected error occurred' };
  }
}
