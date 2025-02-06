'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { StatusIndicator } from "@/components/status-indicator";
import { ref, set, get } from 'firebase/database';
import { db } from '@/lib/firebase';

export default function AdminPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [newProject, setNewProject] = useState({ name: '', url: '' });
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsRef = ref(db, 'status/projects');
      const snapshot = await get(projectsRef);
      if (snapshot.exists()) {
        setProjects(snapshot.val());
      }
    };

    fetchProjects();
  }, []);

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/');
  };

  const handleProjectUpdate = async (index: number, field: string, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjects(updatedProjects);

    await set(ref(db, 'status/projects'), updatedProjects);
    toast({
      title: "Project Updated",
      description: `${updatedProjects[index].name} has been updated.`,
    });
  };

  const handleAddProject = async () => {
    if (newProject.name && newProject.url) {
      const updatedProjects = [...projects, { ...newProject, status: 'operational', uptime: 100 }];
      setProjects(updatedProjects);
      setNewProject({ name: '', url: '' });

      await set(ref(db, 'status/projects'), updatedProjects);
      toast({
        title: "Project Added",
        description: `${newProject.name} has been added to the status page.`,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
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
                      onChange={(e) => handleProjectUpdate(index, 'name', e.target.value)}
                      className="w-1/3"
                    />
                    <Input
                      value={project.url}
                      onChange={(e) => handleProjectUpdate(index, 'url', e.target.value)}
                      className="w-1/3"
                    />
                    <StatusIndicator status={project.status} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleProjectUpdate(index, 'status', 'operational')}
                      variant={project.status === 'operational' ? 'default' : 'outline'}
                    >
                      Operational
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleProjectUpdate(index, 'status', 'degraded')}
                      variant={project.status === 'degraded' ? 'default' : 'outline'}
                    >
                      Degraded
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleProjectUpdate(index, 'status', 'down')}
                      variant={project.status === 'down' ? 'default' : 'outline'}
                    >
                      Down
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleProjectUpdate(index, 'status', 'maintenance')}
                      variant={project.status === 'maintenance' ? 'default' : 'outline'}
                    >
                      Maintenance
                    </Button>
                  </div>
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

