import { useState, useEffect, useRef } from 'react';

interface VerticalTickerProps {
  items: string[];
  interval?: number;
  className?: string;
}

export function VerticalTicker({ items, interval = 3000, className = '' }: VerticalTickerProps) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Duplicate first item at the end for seamless loop
  const loopItems = items.length > 1 ? [...items, items[0]] : items;

  useEffect(() => {
    if (items.length <= 1) return;

    const timer = setInterval(() => {
      setAnimate(true);
      setIndex((prev) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  // When we reach the cloned item, snap back to 0 without animation
  useEffect(() => {
    if (index === items.length && items.length > 1) {
      timeoutRef.current = setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, 500); // Wait for transition to finish
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, items.length]);

  if (items.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height: '1.5em' }}>
      <div
        style={{
          transform: `translateY(-${index * 1.5}em)`,
          transition: animate ? 'transform 500ms ease-in-out' : 'none',
        }}
      >
        {loopItems.map((item, i) => (
          <div key={`${item}-${i}`} className="h-[1.5em] leading-[1.5em] text-center truncate">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
