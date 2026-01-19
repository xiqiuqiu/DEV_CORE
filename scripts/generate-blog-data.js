/**
 * Blog 数据生成脚本
 * 扫描 /blog 目录下的 Markdown 文件，提取 Front Matter，生成 JSON 索引
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '..', 'blog');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'blog-posts.json');

function generateBlogData() {
  // 确保 data 目录存在
  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // 获取所有 .md 文件
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));

  const posts = files.map(file => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontMatter, content: body } = matter(content);

    // 生成默认 slug（从文件名）
    const defaultSlug = path.basename(file, '.md')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fa5-]/g, '');

    return {
      title: frontMatter.title || path.basename(file, '.md'),
      author: frontMatter.author || 'MR.Z',
      date: frontMatter.date || new Date().toISOString().split('T')[0],
      tags: frontMatter.tags || [],
      summary: frontMatter.summary || body.slice(0, 150).replace(/\n/g, ' ').trim() + '...',
      slug: frontMatter.slug || defaultSlug,
      fileName: file,
      content: body,
    };
  });

  // 按日期倒序排列
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 写入 JSON 文件
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf-8');

  console.log(`✅ 已生成 ${posts.length} 篇博客索引至 ${OUTPUT_FILE}`);
  
  // 提取所有唯一标签
  const allTags = [...new Set(posts.flatMap(p => p.tags))];
  console.log(`📌 标签列表: ${allTags.join(', ') || '(无)'}`);
}

generateBlogData();
