"use client";

import { useI18n } from "@/lib/i18n/context";
import LanguageSwitcher from "./LanguageSwitcher";
import { NavLink } from "./NavLink";

const TopBar = () => {
  const { t } = useI18n();

  const navItems = [
    { label: t.nav.index, href: "#hero" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.deploy, href: "/deploy" },
  ];

  return (
    <header className="fixed top-0 left-16 md:left-20 right-0 h-14 border-b border-border bg-background/80 backdrop-blur-sm z-40 flex items-center justify-between px-6">
      {/* System status */}
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs text-muted-foreground font-mono uppercase">
          {t.status.sysOnline}
        </span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors relative group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
          </NavLink>
        ))}
      </nav>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <div className="flex items-center gap-2 px-3 py-1 border border-primary/50 bg-primary/10">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs font-mono text-primary uppercase">
            {t.status.available}
          </span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
