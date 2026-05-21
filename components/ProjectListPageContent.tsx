"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getLocalizedProjects } from "@/data/projects";
import { useI18n } from "@/lib/i18n/context";

export default function ProjectListPageContent() {
  const { locale, t } = useI18n();
  const projects = getLocalizedProjects(locale);

  return (
    <main className="min-h-screen bg-background grid-bg px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-primary uppercase tracking-wider mb-4">
              {t.projects.eyebrow}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t.projects.pageTitle}
            </h1>
            <p className="text-muted-foreground leading-7">
              {t.projects.pageIntro}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-wider border border-border px-3 py-2 hover:border-primary hover:text-primary transition-colors"
            >
              {t.projects.backHome}
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block h-full"
            >
              <article className="h-full border-2 border-border p-6 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:border-primary hover:shadow-[4px_4px_0_hsl(var(--primary))]">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="text-xs font-mono text-muted-foreground">
                    PRJ_{String(index + 1).padStart(2, "0")} / {project.year}
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-muted-foreground transition-colors group-hover:text-primary"
                  />
                </div>

                <div className="aspect-video overflow-hidden border border-border bg-secondary/50 mb-5">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs font-mono text-muted-foreground">
                      [PREVIEW]
                    </div>
                  )}
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="border border-primary/50 px-2 py-1 text-xs font-mono text-primary">
                    {project.category}
                  </span>
                  <span className="border border-border px-2 py-1 text-xs font-mono text-muted-foreground">
                    {project.status}
                  </span>
                </div>

                <h2 className="mb-3 text-2xl font-bold transition-colors group-hover:text-primary">
                  {project.title}
                </h2>
                <p className="mb-5 leading-7 text-muted-foreground">
                  {project.seoDescription}
                </p>

                {project.highlight ? (
                  <p className="mb-5 border-l-2 border-primary pl-3 text-sm font-mono text-primary">
                    {project.highlight}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
