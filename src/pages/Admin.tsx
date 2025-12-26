import { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject, Project, ProjectInsert } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const emptyProject: Omit<ProjectInsert, 'display_order'> = {
  title: '',
  description: '',
  year: new Date().getFullYear().toString(),
  tech: [],
  status: 'LIVE',
  github_url: null,
  live_url: null,
};

const Admin = () => {
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState(emptyProject);
  const [techInput, setTechInput] = useState('');

  const openCreateDialog = () => {
    setEditingProject(null);
    setFormData(emptyProject);
    setTechInput('');
    setIsDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      year: project.year,
      tech: project.tech,
      status: project.status,
      github_url: project.github_url,
      live_url: project.live_url,
    });
    setTechInput(project.tech.join(', '));
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const techArray = techInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const projectData: ProjectInsert = {
      ...formData,
      tech: techArray,
      display_order: editingProject?.display_order ?? (projects?.length ?? 0) + 1,
    };

    if (editingProject) {
      await updateProject.mutateAsync({ id: editingProject.id, ...projectData });
    } else {
      await createProject.mutateAsync(projectData);
    }

    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject.mutateAsync(id);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 border-2 border-border hover:border-primary transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-bold">PROJECT_ADMIN</h1>
          </div>
          <Button onClick={openCreateDialog} className="gap-2">
            <Plus size={18} />
            ADD PROJECT
          </Button>
        </div>

        {/* Projects Table */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : (
          <div className="border-2 border-border">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b-2 border-border bg-secondary text-xs font-bold uppercase tracking-wider">
              <div className="col-span-3">Title</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-1">Year</div>
              <div className="col-span-2">Tech</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Table Body */}
            {projects?.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-12 gap-4 p-4 border-b border-border hover:bg-secondary/50 transition-colors text-sm"
              >
                <div className="col-span-3 font-bold truncate">{project.title}</div>
                <div className="col-span-4 text-muted-foreground truncate">{project.description}</div>
                <div className="col-span-1 font-mono">{project.year}</div>
                <div className="col-span-2 text-xs text-muted-foreground truncate">
                  {project.tech.slice(0, 2).join(', ')}
                  {project.tech.length > 2 && ` +${project.tech.length - 2}`}
                </div>
                <div className="col-span-1">
                  <span className={`text-xs px-2 py-1 border ${
                    project.status === 'LIVE' 
                      ? 'border-terminal text-terminal' 
                      : 'border-muted-foreground text-muted-foreground'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="col-span-1 flex gap-2">
                  <button
                    onClick={() => openEditDialog(project)}
                    className="p-1.5 hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-1.5 hover:text-destructive transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {projects?.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No projects yet. Click "ADD PROJECT" to create one.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg border-2 border-border">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {editingProject ? 'EDIT_PROJECT' : 'NEW_PROJECT'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="PROJECT_NAME"
                required
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Project description..."
                required
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Year</label>
                <Input
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2024"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 w-full h-10 px-3 border-2 border-input bg-background text-sm"
                >
                  <option value="LIVE">LIVE</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                  <option value="WIP">WIP</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tech Stack (comma separated)
              </label>
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="React, TypeScript, Node.js"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">GitHub URL</label>
                <Input
                  value={formData.github_url || ''}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value || null })}
                  placeholder="https://github.com/..."
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Live URL</label>
                <Input
                  value={formData.live_url || ''}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value || null })}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="gap-2"
              >
                <X size={16} />
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <Save size={16} />
                {editingProject ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
