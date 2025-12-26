const navItems = [
  { label: 'INDEX', href: '#hero' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

const TopBar = () => {
  return (
    <header className="fixed top-0 left-16 md:left-20 right-0 h-14 border-b border-border bg-background/80 backdrop-blur-sm z-40 flex items-center justify-between px-6">
      {/* System status */}
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs text-muted-foreground font-mono uppercase">
          SYS_ONLINE
        </span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors relative group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
          </a>
        ))}
      </nav>

      {/* Status badge */}
      <div className="flex items-center gap-2 px-3 py-1 border border-primary/50 bg-primary/10">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-xs font-mono text-primary uppercase">Available</span>
      </div>
    </header>
  );
};

export default TopBar;
