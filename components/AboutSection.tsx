"use client";

import { useI18n } from '@/lib/i18n/context';

const AboutSection = () => {
  const { t } = useI18n();

  return (
    <section id="about" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t.about.title}</h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-mono">
            [{t.about.bioData}]
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bio text */}
          <div className="border-l-4 border-primary pl-6 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.about.bio1}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.about.bio2}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.about.bio3}
            </p>
          </div>

          {/* Stats/Info */}
          <div className="space-y-6">
            <div className="border border-border p-6">
              <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
                {t.about.currentStatus}
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-terminal animate-pulse" />
                <span className="font-bold">{t.about.jobTitle}</span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                {t.about.jobDesc}
              </p>
            </div>

            <div className="border border-border p-6">
              <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
                {t.about.metricsTitle}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-3xl font-bold text-primary">7+</span>
                  <p className="text-xs text-muted-foreground uppercase">{t.about.yearsExp}</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-primary">50+</span>
                  <p className="text-xs text-muted-foreground uppercase">{t.about.projectsCount}</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-primary">12k</span>
                  <p className="text-xs text-muted-foreground uppercase">{t.about.commits}</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-primary">∞</span>
                  <p className="text-xs text-muted-foreground uppercase">{t.about.coffee}</p>
                </div>
              </div>
            </div>

            <div className="stamp inline-block">
              {t.about.openToOpportunities}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
