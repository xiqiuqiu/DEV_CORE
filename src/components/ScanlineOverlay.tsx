const ScanlineOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Horizontal scanlines pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground)) 2px, hsl(var(--foreground)) 3px)',
          backgroundSize: '100% 4px',
        }}
      />
      
      {/* Moving scan line */}
      <div 
        className="absolute left-0 right-0 h-[2px] animate-scan"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15), transparent)',
          boxShadow: '0 0 20px 5px hsl(var(--primary) / 0.1)',
        }}
      />
    </div>
  );
};

export default ScanlineOverlay;
