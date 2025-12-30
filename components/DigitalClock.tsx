import { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `TS_${hours}:${minutes}:${seconds}`;
  };

  if (!mounted || !time) {
    return (
      <span className="font-mono text-primary tabular-nums">
        TS_00:00:00
      </span>
    );
  }

  return (
    <span className="font-mono text-primary tabular-nums">
      {formatTime(time)}
    </span>
  );
};

export default DigitalClock;
