"use client";

import { useI18n } from '@/lib/i18n/context';
import type { Locale } from '@/lib/i18n/translations';

interface Skill {
  name: string;
  category: string;
  context: { en: string; zh: string };
}

const skills: Skill[] = [
  { name: 'TypeScript', category: 'LANG', context: { en: 'Type-safe development & tooling', zh: '类型安全开发与工具链' } },
  { name: 'Vue / React', category: 'FE', context: { en: 'Production UI for tools & dashboards', zh: '生产级工具与仪表盘界面' } },
  { name: 'Node.js', category: 'BE', context: { en: 'REST APIs & event-driven systems', zh: 'REST API 与事件驱动系统' } },
  { name: 'MariaDB / Postgres', category: 'DB', context: { en: 'Schema design & performance tuning', zh: '数据库设计与性能调优' } },
  { name: 'Docker ', category: 'DEVOPS', context: { en: 'CI/CD & automated deployment', zh: 'CI/CD 与自动化部署' } },
  { name: 'Cloudflare / Aliyun', category: 'CLOUD', context: { en: 'Scalable infra & cost optimization', zh: '可扩展基础设施与成本优化' } },
];

const SkillsSection = () => {
  const { t, locale } = useI18n();

  return (
    <section id="skills" className="py-24 px-8 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t.skills.title}</h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-mono">
            [{t.skills.metrics}]
          </span>
        </div>

        {/* Skills grid */}
        <div className="grid gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group flex items-center gap-4 p-4 border border-border hover:border-primary transition-colors"
            >
              <span className="text-xs text-muted-foreground w-16 font-mono">
                {skill.category}
              </span>

              <span className="font-bold w-36 group-hover:text-primary transition-colors">
                {skill.name}
              </span>

              <span className="flex-1 text-sm text-muted-foreground">
                {skill.context[locale as Locale]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

