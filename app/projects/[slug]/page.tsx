import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailPageContent from "@/components/ProjectDetailPageContent";
import { getProjectBySlug, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "项目未找到",
    };
  }

  const url = `https://sigclr.com/projects/${project.slug}`;
  const image = project.thumbnail ? `https://sigclr.com${project.thumbnail}` : undefined;

  return {
    title: project.title.zh,
    description: project.seoDescription.zh,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title.zh} | SIGCLR 项目案例`,
      description: project.seoDescription.zh,
      url,
      type: "article",
      siteName: "SIGCLR",
      locale: "zh_CN",
      images: image
        ? [
            {
              url: image,
              alt: project.title.zh,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title.zh} | SIGCLR 项目案例`,
      description: project.seoDescription.zh,
      images: image ? [image] : undefined,
      creator: "@logic_zy",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const url = `https://sigclr.com/projects/${project.slug}`;
  const image = project.thumbnail ? `https://sigclr.com${project.thumbnail}` : undefined;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title.zh,
    alternateName: project.title.en,
    description: project.seoDescription.zh,
    url,
    image,
    author: {
      "@type": "Person",
      name: "Qiu",
      alternateName: "SIGCLR",
    },
    dateCreated: project.year,
    about: project.tags.map((tag) => tag.zh),
    sameAs: project.url,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: "https://sigclr.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "项目案例",
        item: "https://sigclr.com/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title.zh,
      },
    ],
  };

  return (
    <>
      <ProjectDetailPageContent slug={project.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
