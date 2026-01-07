"use client";

import { ExternalLink } from 'lucide-react';
import { getLocalizedProjects } from '@/data/projects';
import { useI18n } from '@/lib/i18n/context';
import ScrollReveal from './ScrollReveal';

const ProjectsSection = () => {
  const { t, locale } = useI18n();
  const projects = getLocalizedProjects(locale);

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <ScrollReveal animation="fade-right" className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t.projects.title}</h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-mono">
            [{projects.length.toString().padStart(2, '0')} {t.projects.entries}]
          </span>
        </ScrollReveal>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              animation="fade-up"
              delay={index * 0.1} // Stagger effect
              className="h-full"
            >
              <article
                onClick={() => handleProjectClick(project.url)}
                className="group h-full border-2 border-border p-6 hover:border-primary transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_hsl(var(--primary))] cursor-pointer overflow-hidden flex flex-col"
              >
                {/* Project thumbnail placeholder */}
                <div className="aspect-video bg-secondary/50 mb-4 overflow-hidden border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-xs font-mono text-muted-foreground">[PREVIEW]</span>
                  )}
                </div>

                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <ExternalLink
                    size={18}
                    className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                  />
                </div>

                <p className="text-muted-foreground mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Highlight / Key Value */}
                {/* {project.highlight && (
                  <p className="text-sm text-primary font-mono mb-4 border-l-2 border-primary pl-3">
                    → {project.highlight}
                  </p>
                )} */}

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
