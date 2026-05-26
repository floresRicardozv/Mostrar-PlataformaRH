import { useRef, useState, useEffect } from 'react';

interface MarqueeTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

const STYLE_ID = 'kiro-marquee-style';
const marqueeCSS = `@keyframes kiro-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`;

function ensureStyle() {
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = marqueeCSS;
    document.head.appendChild(style);
  }
}

export function MarqueeText({ children, className = '', speed = 20 }: MarqueeTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const measure = () => {
      const wrapper = wrapperRef.current;
      const hidden = measureRef.current;
      if (!wrapper || !hidden) return;
      setOverflows(hidden.offsetWidth > wrapper.clientWidth);
    };

    const raf = requestAnimationFrame(measure);

    const ro = new ResizeObserver(measure);
    if (wrapperRef.current) ro.observe(wrapperRef.current);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [children]);

  useEffect(() => {
    if (overflows) ensureStyle();
  }, [overflows]);

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden ${className}`}>
      {/* Hidden measurement span — always in DOM */}
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 whitespace-nowrap opacity-0"
      >
        {children}
      </span>

      {overflows ? (
        <div className="whitespace-nowrap">
          <span
            className="inline-block hover:[animation-play-state:paused]"
            style={{ animation: `kiro-marquee ${speed}s linear infinite` }}
          >
            <span>{children}</span>
            <span className="ml-8">{children}</span>
          </span>
        </div>
      ) : (
        <span className="whitespace-nowrap">{children}</span>
      )}
    </div>
  );
}
