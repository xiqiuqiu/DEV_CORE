"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import blogPosts from "@/data/blog-posts.json";
import ScrollReveal from "./ScrollReveal";

interface BlogPost {
  title: string;
  author: string;
  date: string;
  tags: string[];
  summary: string;
  slug: string;
  fileName: string;
}

const BlogSection = () => {
  const { locale } = useI18n();

  // 取最新3篇文章
  const latestPosts = (blogPosts as BlogPost[]).slice(0, 3);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return locale === "zh"
      ? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  if (latestPosts.length === 0) return null;

  return (
    <section id="blog" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <ScrollReveal
          animation="fade-right"
          className="flex items-center gap-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            {locale === "zh" ? "博客" : "BLOG"}
          </h2>
          <div className="flex-1 h-px bg-border" />
          <Link
            href="/blog"
            className="text-xs text-muted-foreground font-mono hover:text-primary transition-colors"
          >
            [{locale === "zh" ? "查看全部" : "VIEW ALL"} →]
          </Link>
        </ScrollReveal>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 gap-6">
          {latestPosts.map((post, index) => (
            <ScrollReveal
              key={post.slug}
              animation="fade-up"
              delay={index * 0.1}
              className="h-full"
            >
              <Link href={`/blog/${post.slug}`}>
                <article className="group border-2 border-border p-6 hover:border-primary transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_hsl(var(--primary))] cursor-pointer">
                  {/* Meta info */}
                  <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground font-mono">
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.summary}
                  </p>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
