import { MetadataRoute } from 'next'
import blogPosts from '@/data/blog-posts.json'
import { projects } from '@/data/projects'

interface BlogPost {
    slug: string
    date: string
}

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = blogPosts as BlogPost[]

    const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `https://sigclr.com/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `https://sigclr.com/projects/${project.slug}`,
        lastModified: new Date('2026-05-20'),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
    }))

    return [
        {
            url: 'https://sigclr.com',
            lastModified: new Date('2026-05-20'),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://sigclr.com/projects',
            lastModified: new Date('2026-05-20'),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: 'https://sigclr.com/blog',
            lastModified: new Date('2026-01-19'),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...projectEntries,
        ...blogEntries,
    ]
}
