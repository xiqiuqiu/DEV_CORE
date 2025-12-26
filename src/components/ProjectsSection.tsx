import { ExternalLink, Github } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';

const ProjectsSection = () => {
  const { data: projects, isLoading } = useProjects();

  return (
    <section id="projects" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">PROJECTS</h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-mono">
            [{(projects?.length ?? 0).toString().padStart(2, '0')} ENTRIES]
          </span>
        </div>

        {/* Projects grid */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground font-mono">
              Loading projects...
            </div>
          ) : projects?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground font-mono">
              No projects found.
            </div>
          ) : (
            projects?.map((project) => (
              <article 
                key={project.id}
                className="group border-2 border-border p-6 hover:border-primary transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_hsl(var(--primary))]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground font-mono">
                      {project.year}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 border ${
                    project.status === 'LIVE' 
                      ? 'border-terminal text-terminal' 
                      : 'border-muted-foreground text-muted-foreground'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="text-xs px-2 py-1 bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.github_url && (
                      <a 
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.live_url && (
                      <a 
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
