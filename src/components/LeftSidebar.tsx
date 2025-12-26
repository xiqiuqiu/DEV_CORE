const LeftSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-16 md:w-20 border-r border-border bg-sidebar flex flex-col items-center justify-between py-8 z-40">
      {/* Project code */}
      <div className="vertical-text text-xs text-muted-foreground tracking-widest uppercase">PRJ_2025_PORTFOLIO</div>

      {/* Status indicator */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-3 h-3 rounded-full bg-terminal animate-pulse" />
        <span className="vertical-text text-xs text-terminal uppercase tracking-widest">ACTIVE</span>
      </div>

      {/* Archive year */}
      <div className="vertical-text text-xs text-muted-foreground tracking-widest">© 2025</div>
    </aside>
  );
};

export default LeftSidebar;
