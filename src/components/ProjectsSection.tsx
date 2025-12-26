import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'NEURAL_SYNC',
    description: 'Real-time collaborative code editor with AI-assisted completions',
    year: '2024',
    tech: ['React', 'TypeScript', 'WebSocket', 'OpenAI'],
    status: 'LIVE',
  },
  {
    id: 2,
    title: 'DATA_FORGE',
    description: 'Enterprise ETL pipeline with visual workflow builder',
    year: '2024',
    tech: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    status: 'LIVE',
  },
  {
    id: 3,
    title: 'PULSE_API',
    description: 'High-performance GraphQL gateway with real-time subscriptions',
    year: '2023',
    tech: ['Go', 'GraphQL', 'gRPC', 'Kubernetes'],
    status: 'ARCHIVED',
  },
  {
    id: 4,
    title: 'CRYPTO_VAULT',
    description: 'Secure password manager with zero-knowledge architecture',
    year: '2023',
    tech: ['Rust', 'WebAssembly', 'Argon2', 'AES-256'],
    status: 'LIVE',
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">PROJECTS</h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-mono">
            [{projects.length.toString().padStart(2, '0')} ENTRIES]
          </span>
        </div>

        {/* Projects grid */}
        <div className="space-y-6">
          {projects.map((project) => (
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
                  <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                    <Github size={18} />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
