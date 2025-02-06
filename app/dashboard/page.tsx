"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { StatusIndicator } from "@/components/status-indicator";
import { getStatus, updateProjectStatus, addProject } from '@/lib/status-service';
import type { ProjectStatus } from '@/lib/status-service';

export default function DashboardPage() {
  const [projects, setProjects] = useState<ProjectStatus[]>([]);
  const [newProject, setNewProject] = useState({ name: '', url: '' });
  const [editedProjects, setEditedProjects] = useState<{ [key: number]: boolean }>({});
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      const status = await getStatus();
      setProjects(status.projects);
    };

    fetchProjects();
  }, []);

  const handleProjectEdit = (index: number, field: string, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjects(updatedProjects);
    setEditedProjects((prev) => ({ ...prev, [index]: true }));
  };

  const handleSaveProject = async (index: number) => {
    await updateProjectStatus(index, projects[index]);
    setEditedProjects((prev) => ({ ...prev, [index]: false }));
    toast({
      title: "Project Saved",
      description: `${projects[index].name} has been saved.`,
    });
  };

  const handleCancelEdit = (index: number) => {
    const fetchProjects = async () => {
      const status = await getStatus();
      setProjects(status.projects);
    };
    fetchProjects();
    setEditedProjects((prev) => ({ ...prev, [index]: false }));
  };

  const handleAddProject = async () => {
    if (newProject.name && newProject.url) {
      const projectToAdd: ProjectStatus = {
        ...newProject,
        status: 'operational',
        responseTime: 0,
        lastChecked: new Date().toISOString(),
        uptime: 100,
      };
      await addProject(projectToAdd);
      setProjects([...projects, projectToAdd]);
      setNewProject({ name: '', url: '' });
      toast({
        title: "Project Added",
        description: `${newProject.name} has been added to the status page.`,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Manage Projects</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {projects.map((project, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <div className="flex items-center justify-between mb-2">
                    <Input
                      value={project.name}
                      onChange={(e) => handleProjectEdit(index, 'name', e.target.value)}
                      className="w-1/3"
                    />
                    <Input
                      value={project.url}
                      onChange={(e) => handleProjectEdit(index, 'url', e.target.value)}
                      className="w-1/3"
                    />
                    <StatusIndicator status={project.status} />
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Button
                      size="sm"
                      onClick={() => handleProjectEdit(index, 'status', 'operational')}
                      variant={project.status === 'operational' ? 'default' : 'outline'}
                    >
                      Operational
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleProjectEdit(index, 'status', 'degraded')}
                      variant={project.status === 'degraded' ? 'default' : 'outline'}
                    >
                      Degraded
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleProjectEdit(index, 'status', 'down')}
                      variant={project.status === 'down' ? 'default' : 'outline'}
                    >
                      Down
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleProjectEdit(index, 'status', 'maintenance')}
                      variant={project.status === 'maintenance' ? 'default' : 'outline'}
                    >
                      Maintenance
                    </Button>
                  </div>
                  {project.status !== 'operational' && (
                    <Textarea
                      placeholder="Add a note about the current status..."
                      value={project.note || ''}
                      onChange={(e) => handleProjectEdit(index, 'note', e.target.value)}
                      className="mt-2"
                    />
                  )}
                  {editedProjects[index] && (
                    <div className="mt-2 flex space-x-2">
                      <Button onClick={() => handleSaveProject(index)}>Save</Button>
                      <Button variant="outline" onClick={() => handleCancelEdit(index)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 p-4 border rounded">
                <h3 className="text-lg font-semibold mb-2">Add New Project</h3>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Project Name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  />
                  <Input
                    placeholder="Project URL"
                    value={newProject.url}
                    onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                  />
                  <Button onClick={handleAddProject}>Add Project</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add global settings here */}
              <p>Global settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

