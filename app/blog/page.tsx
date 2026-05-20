import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import blogPosts from "@/data/blog-posts.json";

interface BlogPost {
  title: string;
  author: string;
  date: string;
  tags: string[];
  summary: string;
  slug: string;
  fileName: string;
}

export const metadata: Metadata = {
  title: "技术博客",
  description: "技术思考与开发实践记录 — React 性能、AI 工具、产品开发、Cloudflare/部署实践",
  alternates: {
    canonical: "https://sigclr.com/blog",
  },
};

// 提取所有唯一标签
function getAllTags(posts: BlogPost[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export default function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  return <BlogListContent searchParamsPromise={searchParams} />;
}

async function BlogListContent({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ tag?: string }>;
}) {
  const { tag: selectedTag } = await searchParamsPromise;
  const posts = blogPosts as BlogPost[];
  const allTags = getAllTags(posts);

  // 按标签筛选
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "技术博客 | SIGCLR 澄讯空间",
    description: "技术思考与开发实践记录",
    url: "https://sigclr.com/blog",
    mainEntity: filteredPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      url: `https://sigclr.com/blog/${post.slug}`,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://sigclr.com" },
      { "@type": "ListItem", position: 2, name: "博客" },
    ],
  };

  return (
    <div className="min-h-screen bg-background grid-bg px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">博客</h1>
            <p className="text-sm text-muted-foreground font-mono">
              技术思考与开发实践记录
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">返回首页</Link>
          </Button>
        </div>

        {/* Tags filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            <Link
              href="/blog"
              className={`text-xs px-3 py-1.5 border transition-colors ${
                !selectedTag
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              全部
            </Link>
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className={`text-xs px-3 py-1.5 border transition-colors ${
                  selectedTag === tag
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary"
                }`}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Posts list */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">暂无文章</p>
          ) : (
            filteredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group border-2 border-border p-6 hover:border-primary transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_hsl(var(--primary))] cursor-pointer">
                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground font-mono">
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.summary}
                  </p>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Link>
            ))
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
    </div>
  );
}
