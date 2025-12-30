"use client";

import { useI18n } from '@/lib/i18n/context';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { locale, toggleLocale, t } = useI18n();

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 px-3 py-1 border border-border hover:border-primary bg-background/50 hover:bg-primary/10 transition-all text-xs font-mono uppercase tracking-wider"
      title={t.language.switchTo}
    >
      <Globe size={14} className="text-muted-foreground" />
      <span>{locale === 'en' ? 'EN' : '中文'}</span>
    </button>
  );
};

export default LanguageSwitcher;
