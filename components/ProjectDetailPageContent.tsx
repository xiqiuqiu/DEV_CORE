"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  getLocalizedProject,
  getLocalizedProjects,
} from "@/data/projects";
import { useI18n } from "@/lib/i18n/context";

interface ProjectDetailPageContentProps {
  slug: string;
}

export default function ProjectDetailPageContent({
  slug,
}: ProjectDetailPageContentProps) {
  const { locale, t } = useI18n();
  const project = getLocalizedProject(slug, locale);
  const projects = getLocalizedProjects(locale);

  if (!project) return null;

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject =
    currentIndex >= 0 ? projects[(currentIndex + 1) % projects.length] : undefined;

  return (
    <main className="min-h-screen bg-background grid-bg px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="border-b border-border pb-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} />
              {t.projects.backProjects}
            </Link>
            <LanguageSwitcher />
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <div className="text-xs font-mono text-primary uppercase tracking-wider mb-4">
                {t.projects.caseStudy} / {project.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-5">
                {project.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                {project.description}
              </p>
            </div>

            <aside className="border-2 border-border p-5">
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs font-mono text-muted-foreground uppercase">
                    {t.projects.role}
                  </dt>
                  <dd className="mt-1 text-sm leading-6">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-xs font-mono text-muted-foreground uppercase">
                    {t.projects.status}
                  </dt>
                  <dd className="mt-1 text-sm leading-6">{project.status}</dd>
                </div>
                <div>
                  <dt className="text-xs font-mono text-muted-foreground uppercase">
                    {t.projects.year}
                  </dt>
                  <dd className="mt-1 text-sm leading-6">{project.year}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <div className="overflow-hidden border-2 border-border bg-secondary/50">
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              ) : null}
            </div>

            <section className="space-y-6">
              <CaseBlock title={t.projects.challenge} body={project.challenge} />
              <CaseBlock title={t.projects.solution} body={project.solution} />
              <CaseBlock title={t.projects.impact} body={project.impact} />
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {project.highlight ? (
              <div className="border-2 border-primary p-5">
                <div className="mb-3 text-xs font-mono text-primary uppercase">
                  {t.projects.overview}
                </div>
                <p className="text-lg font-bold leading-7">{project.highlight}</p>
              </div>
            ) : null}

            <div className="border border-border p-5">
              <h2 className="mb-4 text-lg font-bold">{t.projects.features}</h2>
              <ul className="space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6">
                    <span className="mt-2 h-1.5 w-1.5 flex-none bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-border p-5">
              <h2 className="mb-4 text-lg font-bold">{t.projects.stack}</h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 border-2 border-primary bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_hsl(var(--foreground))]"
            >
              {t.projects.visitProject}
              <ExternalLink size={16} />
            </a>
          </aside>
        </section>

        {nextProject && nextProject.slug !== project.slug ? (
          <footer className="border-t border-border pt-8">
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center justify-between gap-6 border-2 border-border p-5 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:border-primary hover:shadow-[4px_4px_0_hsl(var(--primary))]"
            >
              <div>
                <div className="mb-2 text-xs font-mono text-muted-foreground uppercase">
                  {t.projects.nextProject}
                </div>
                <div className="text-2xl font-bold group-hover:text-primary">
                  {nextProject.title}
                </div>
              </div>
              <ArrowRight className="text-muted-foreground group-hover:text-primary" />
            </Link>
          </footer>
        ) : null}
      </div>
    </main>
  );
}

function CaseBlock({ title, body }: { title: string; body: string }) {
  return (
    <article className="border-l-2 border-primary pl-5">
      <h2 className="mb-3 text-2xl font-bold">{title}</h2>
      <p className="max-w-3xl leading-8 text-muted-foreground">{body}</p>
    </article>
  );
}
