"use client";

import { useState, useEffect } from 'react';

const VISITED_KEY = 'has_visited';

export function useVisitCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Check if already visited in this session
        const hasVisited = sessionStorage.getItem(VISITED_KEY);
        
        if (!hasVisited) {
          // First visit in this session, increment counter
          const res = await fetch('/api/visit', { method: 'POST' });
          const data = await res.json();
          setCount(data.count);
          sessionStorage.setItem(VISITED_KEY, 'true');
        } else {
          // Already visited, just get current count
          const res = await fetch('/api/visit');
          const data = await res.json();
          setCount(data.count);
        }
      } catch (error) {
        console.error('Failed to track visit:', error);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    trackVisit();
  }, []);

  return { count, loading };
}
