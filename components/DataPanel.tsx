"use client";

import { useEffect, useState } from 'react';
import CountUp from './CountUp';
import InteractiveTerminal from './InteractiveTerminal';

import { useI18n } from '@/lib/i18n/context';
import { useVisitCounter } from '@/hooks/useVisitCounter';

interface DataPanelProps {
  onThemeChange?: (theme: string) => void;
}

const DataPanel = ({ onThemeChange }: DataPanelProps) => {
  const [mounted, setMounted] = useState(false);
  const { t } = useI18n();
  const { count: visitCount, loading: visitLoading } = useVisitCounter();

  // Calculate uptime since 2026-01-06
  const launchDate = new Date('2026-01-06T00:00:00').getTime();
  const now = new Date().getTime();
  const uptimeHours = Math.max(0, Math.floor((now - launchDate) / (1000 * 60 * 60)));
  const uptimeDays = (uptimeHours / 24).toFixed(1);

  const uptimeDisplay = uptimeHours > 48 ? `${uptimeDays}d` : `${uptimeHours}h`;

  const telemetryData = [
    { label: t.dataPanel.uptime, value: uptimeDisplay },
    { label: t.dataPanel.latency, value: '12ms' },
    { label: t.dataPanel.throughput, value: '847 req/s' },
    { label: t.dataPanel.visitors, value: visitLoading ? '...' : (visitCount?.toLocaleString() ?? '0') },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="hidden lg:block fixed right-0 top-14 bottom-0 w-72 xl:w-80 border-l border-border bg-card text-card-foreground overflow-y-auto z-30">
      {/* Header */}
      <div className="p-4 border-b border-border bg-primary text-primary-foreground">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          {t.dataPanel.telemetryData}
        </h3>
        <p className="text-xs opacity-80 mt-1">{t.dataPanel.realTimeMetrics}</p>
      </div>

      {/* Telemetry rows */}
      <div className="p-4 border-b border-border">
        {telemetryData.map((item) => (
          <div key={item.label} className="data-row text-card-foreground">
            <span className="text-xs opacity-70">{item.label}</span>
            <span className="font-bold">
              <CountUp value={item.value} delay={0.5} />
            </span>
          </div>
        ))}
      </div>

      {/* Music player */}
      <div className="p-4 border-b border-border">
        <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-card-foreground flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-primary animate-pulse" />
          {t.dataPanel.audioStream}
        </h4>
        <div className="relative w-full overflow-hidden border border-border bg-background">
          {/* Decorative top bar */}
          <div className="flex items-center justify-between px-2 py-1 bg-muted border-b border-border">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{t.dataPanel.live}</span>
          </div>
          {/* Player iframe */}
          <div className="relative">
            <iframe
              src="//music.163.com/outchain/player?type=2&id=5256051&auto=1&height=66"
              width="100%"
              height="96"
              frameBorder="0"
              className="border-0 block"
              title="Music Player"
            />
            {/* Subtle scanline overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.05) 2px, hsl(var(--foreground) / 0.05) 4px)'
              }}
            />
          </div>
          {/* Decorative bottom bar */}
          <div className="px-2 py-1 bg-muted border-t border-border">
            <div className="flex items-center gap-1">
              {[...Array(12)].map((_, i) => (
                <span
                  key={i}
                  className="flex-1 h-1 bg-primary/60"
                  style={{ opacity: mounted ? 0.3 + Math.random() * 0.7 : 0.5 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive terminal */}
      <div className="p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-card-foreground">
          {t.dataPanel.terminal}
        </h4>
        <div className="bg-background p-3 border border-border">
          <InteractiveTerminal onThemeChange={onThemeChange} />
        </div>
      </div>
    </aside>
  );
};

export default DataPanel;
