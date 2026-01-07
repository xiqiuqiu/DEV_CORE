"use client";

import { useI18n } from '@/lib/i18n/context';

const LeftSidebar = () => {
  const { t, locale } = useI18n();

  // Only apply vertical rotation for English
  const textClass = locale === 'en' ? 'vertical-text' : 'writing-vertical';

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 md:w-20 border-r border-border bg-sidebar flex flex-col items-center justify-between py-8 z-40">
      {/* Project code */}
      <div className={`${textClass} text-xs text-muted-foreground tracking-widest uppercase`}>{t.sidebar.projectCode}</div>

      {/* Status indicator */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-3 h-3 rounded-full bg-terminal animate-pulse" />
        <span className={`${textClass} text-xs text-terminal uppercase tracking-widest`}>{t.sidebar.active}</span>
      </div>

      {/* Archive year */}
      <div className={`${textClass} text-xs text-muted-foreground tracking-widest`}>© 2025</div>
    </aside>
  );
};

export default LeftSidebar;

