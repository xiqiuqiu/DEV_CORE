"use client";

import { useI18n } from '@/lib/i18n/context';

const skills = [
  { name: 'TypeScript', level: 95, category: 'LANG' },
  { name: 'Vue', level: 92, category: 'FE' },
  { name: 'Node.js', level: 88, category: 'BE' },
  { name: 'MariaDB', level: 85, category: 'DB' },
  { name: 'Docker', level: 82, category: 'DEVOPS' },
  { name: 'Aliyun', level: 85, category: 'CLOUD' },
];

const SkillsSection = () => {
  const { t } = useI18n();

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
              
              <span className="font-bold w-32 group-hover:text-primary transition-colors">
                {skill.name}
              </span>

              <div className="flex-1 h-2 bg-muted overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 group-hover:bg-terminal"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <span className="text-xs font-mono text-primary w-12 text-right">
                {skill.level}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
