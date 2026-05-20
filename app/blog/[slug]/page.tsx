import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import blogPosts from "@/data/blog-posts.json";

interface BlogPost {
  title: string;
  author: string;
  date: string;
  tags: string[];
  summary: string;
  slug: string;
  fileName: string;
  content: string;
}

// 生成静态路径
export async function generateStaticParams() {
  return (blogPosts as BlogPost[]).map((post) => ({
    slug: post.slug,
  }));
}

// 生成元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = (blogPosts as BlogPost[]).find((p) => p.slug === slug);

  if (!post) {
    return { title: "文章未找到" };
  }

  const url = `https://sigclr.com/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url,
      siteName: "SIGCLR",
      locale: "zh_CN",
      authors: [post.author],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      creator: "@logic_zy",
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = (blogPosts as BlogPost[]).find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Remove the first H1 heading from markdown — the page header already provides it
  const contentWithoutLeadingH1 = post.content.replace(/^\s*#\s+.+?\r?\n/, "");

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const articleUrl = `https://sigclr.com/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.date,
    dateModified: post.date,
    url: articleUrl,
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
        name: "博客",
        item: "https://sigclr.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-8 py-24">
        {/* Back link */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/blog"
            className="text-xs text-muted-foreground font-mono hover:text-primary transition-colors"
          >
            [← 返回列表]
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono mb-6">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="text-xs px-2 py-1 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose article-prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded [&_pre_code]:bg-transparent [&_pre_code]:text-inherit prose-pre:bg-secondary prose-pre:text-secondary-foreground prose-pre:border prose-pre:border-border">
          <ReactMarkdown>{contentWithoutLeadingH1}</ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← 返回博客列表
          </Link>
        </footer>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
    </main>
  );
}
