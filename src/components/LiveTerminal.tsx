import { useState, useEffect, useRef } from 'react';

const systemLogs = [
  '[SYS] Buffer allocation: 4096 bytes',
  '[NET] Establishing secure tunnel...',
  '[CPU] Thread priority adjusted: HIGH',
  '[MEM] Garbage collection initiated',
  '[I/O] Port 8080 listening...',
  '[SYS] Cache invalidation complete',
  '[NET] Packet received: 1024 bytes',
  '[CPU] Load average: 0.42, 0.38, 0.35',
  '[MEM] Heap size: 256MB allocated',
  '[I/O] Disk write: 128KB/s',
  '[SYS] Process spawned: PID 4829',
  '[NET] DNS resolution: 12ms',
  '[CPU] Context switch: 0.003ms',
  '[MEM] Page fault handled',
  '[I/O] File descriptor: 42 opened',
  '[SYS] Signal received: SIGUSR1',
  '[NET] TLS handshake complete',
  '[CPU] Affinity mask updated',
  '[MEM] Stack trace captured',
  '[I/O] Buffer flushed to disk',
];

const LiveTerminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with some logs
    setLogs(systemLogs.slice(0, 5));

    const interval = setInterval(() => {
      const randomLog = systemLogs[Math.floor(Math.random() * systemLogs.length)];
      const timestamp = new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      setLogs(prev => {
        const newLogs = [...prev, `${timestamp} ${randomLog}`];
        // Keep only last 15 logs
        return newLogs.slice(-15);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div 
      ref={containerRef}
      className="h-48 overflow-y-auto font-mono text-xs leading-relaxed scrollbar-none"
    >
      {logs.map((log, index) => (
        <div 
          key={index} 
          className="text-terminal opacity-80 hover:opacity-100 transition-opacity"
        >
          {log}
        </div>
      ))}
      <span className="inline-block w-2 h-4 bg-terminal animate-blink ml-1" />
    </div>
  );
};

export default LiveTerminal;
