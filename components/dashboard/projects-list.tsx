'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Zap } from 'lucide-react';
import { getSolarProjects, deleteSolarProject } from '@/app/actions/solar-projects';

interface SolarProject {
  id: string;
  project_name: string;
  location: string;
  system_capacity_kw: number;
  panel_type: string;
  number_of_panels: number;
  grid_connected: boolean;
  created_at: string;
}

interface ProjectsListProps {
  onAddClick: () => void;
}

export function ProjectsList({ onAddClick }: ProjectsListProps) {
  const [projects, setProjects] = useState<SolarProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const result = await getSolarProjects();
    if (result.data) {
      setProjects(result.data);
    }
    setLoading(false);
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    setDeleting(projectId);
    const result = await deleteSolarProject(projectId);
    if (!result.error) {
      setProjects(projects.filter((p) => p.id !== projectId));
    }
    setDeleting(null);
  };

  if (loading) {
    return (
      <Card className="p-6 border-0">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading projects...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-0">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Your Solar Projects</h2>
          <Button
            onClick={onAddClick}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-foreground font-medium mb-2">No solar projects yet</p>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first solar project to start monitoring energy generation
            </p>
            <Button onClick={onAddClick} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors group"
              >
                <div className="space-y-3">
                  {/* Project Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {project.project_name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{project.location}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deleting === project.id}
                      className="text-muted-foreground hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2 bg-secondary/30 rounded p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Capacity:</span>
                      <span className="font-semibold text-foreground">
                        {project.system_capacity_kw} kW
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Panels:</span>
                      <span className="font-semibold text-foreground">
                        {project.number_of_panels}x {project.panel_type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Grid:</span>
                      <span
                        className={`text-sm font-semibold ${project.grid_connected ? 'text-green-600' : 'text-yellow-600'
                          }`}
                      >
                        {project.grid_connected ? 'Connected' : 'Off-grid'}
                      </span>
                    </div>
                  </div>

                  {/* Created Date */}
                  <p className="text-xs text-muted-foreground">
                    Added {new Date(project.created_at).toLocaleDateString('en-KE')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
