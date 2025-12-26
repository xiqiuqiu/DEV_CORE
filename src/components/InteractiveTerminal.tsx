import { useRef, useEffect } from 'react';
import { useTerminal, TerminalLog } from '@/hooks/useTerminal';

interface InteractiveTerminalProps {
  onThemeChange?: (theme: string) => void;
}

const InteractiveTerminal = ({ onThemeChange }: InteractiveTerminalProps) => {
  const { logs, inputValue, setInputValue, handleKeyDown } = useTerminal(onThemeChange);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  // Focus input on click
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const getLogColor = (type: TerminalLog['type']) => {
    switch (type) {
      case 'cmd':
        return 'text-primary';
      case 'sys':
        return 'text-terminal';
      case 'err':
        return 'text-destructive';
      case 'ascii':
        return 'text-primary/80';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="h-48 overflow-y-auto font-mono text-xs leading-relaxed scrollbar-none bg-background/50 cursor-text relative"
      style={{
        // CRT effect
        textShadow: '0 0 2px hsl(var(--terminal))',
      }}
    >
      {/* Scanline overlay inside terminal */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, hsl(var(--foreground)) 1px, hsl(var(--foreground)) 2px)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* Logs */}
      <div className="relative z-10 p-1">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`${getLogColor(log.type)} opacity-90 hover:opacity-100 transition-opacity whitespace-pre`}
            style={{
              animation: 'fadeIn 0.15s ease-out',
            }}
          >
            {log.content}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center mt-1">
          <span className="text-primary mr-1">$</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none text-foreground caret-transparent"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            {/* Custom cursor */}
            <span 
              className="absolute top-0 h-full w-2 bg-terminal animate-blink"
              style={{ 
                left: `${inputValue.length * 0.6}em`,
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 0.9; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default InteractiveTerminal;
