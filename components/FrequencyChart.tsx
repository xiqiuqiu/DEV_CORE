import { useEffect, useState } from 'react';

const BAR_COUNT = 40;

const FrequencyChart = () => {
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: BAR_COUNT }, () => Math.random() * 40 + 10)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev =>
        prev.map((height) => {
          // Smooth breathing: oscillate around current height
          const delta = (Math.random() - 0.5) * 8;
          const newHeight = height + delta;
          // Clamp between 10 and 50
          return Math.max(10, Math.min(50, newHeight));
        })
      );
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg viewBox="0 0 200 60" className="w-full h-16">
      {bars.map((height, i) => (
        <rect
          key={i}
          x={i * 5}
          y={60 - height}
          width="3"
          height={height}
          className="fill-primary/80 transition-all duration-150 ease-out"
        />
      ))}
    </svg>
  );
};

export default FrequencyChart;
