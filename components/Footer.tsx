"use client";

import DigitalClock from './DigitalClock';
import { useI18n } from '@/lib/i18n/context';

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border py-8 px-8">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground font-mono">
            © 2025 BUILD BY SIGCLR [澄讯空间]
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-xs text-muted-foreground font-mono">
            {t.footer.allSystemsNominal}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground font-mono uppercase">
            {t.footer.localTime}
          </span>
          <DigitalClock />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
