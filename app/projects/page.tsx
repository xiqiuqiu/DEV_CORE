import type { Metadata } from "next";
import ProjectListPageContent from "@/components/ProjectListPageContent";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "项目案例",
  description:
    "SIGCLR 澄讯空间的项目案例索引，展示 AI 工具、前端产品体验、全栈交付和实用工具开发。",
  alternates: {
    canonical: "https://sigclr.com/projects",
  },
  openGraph: {
    title: "项目案例 | SIGCLR",
    description:
      "查看 SIGCLR 澄讯空间的项目案例，覆盖 AI 工具、前端产品体验与全栈交付。",
    url: "https://sigclr.com/projects",
    type: "website",
    siteName: "SIGCLR",
    locale: "zh_CN",
  },
};

export default function ProjectsPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "项目案例 | SIGCLR 澄讯空间",
    description: metadata.description,
    url: "https://sigclr.com/projects",
    mainEntity: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title.zh,
      description: project.seoDescription.zh,
      url: `https://sigclr.com/projects/${project.slug}`,
      image: project.thumbnail
        ? `https://sigclr.com${project.thumbnail}`
        : undefined,
    })),
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
      },
    ],
  };

  return (
    <>
      <ProjectListPageContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
