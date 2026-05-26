import { useState, useEffect, useRef } from 'react';
import { noticiasMock } from '../../mocks/dashboard/noticias.mock';
import type { NewsSlide } from '../../types/dashboard.types';

/** Single pane with orange border, fade-transition between slides */
function CarouselPane({ slide }: { slide: NewsSlide }) {
  return (
    <div className="rounded-xl border-2 border-neutral-700 overflow-hidden h-[400px] bg-white flex-1 min-w-0 flex items-center justify-center">
      <img
        key={slide.id}
        src={slide.imageUrl}
        alt={slide.title}
        className="h-full w-auto max-w-full object-contain animate-fade"
      />
    </div>
  );
}

export function NewsCarousel() {
  const slides = noticiasMock;
  const [tick, setTick] = useState(0);
  const [twoUp, setTwoUp] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect monitor (xl+) for two-pane layout
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1367px)'); //1367 es el tamaño de mi laptop (Ver opciones)
    const update = () => setTwoUp(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Auto-rotation every 6s
  useEffect(() => {
    if (slides.length <= (twoUp ? 2 : 1)) return;
    const interval = setInterval(() => {
      if (!isPaused) setTick((t) => t + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused, twoUp]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const pauseAutoRotation = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 10000);
  };

  const N = slides.length;
  const idx1 = tick % N;
  const idx2 = (tick + 1) % N;

  const goToSlide = (index: number) => {
    setTick(index);
    pauseAutoRotation();
  };

  return (
    <div className="relative xl:pb-10">
      <div className="flex gap-4">
        <CarouselPane slide={slides[idx1]} />
        {twoUp && N > 1 && <CarouselPane slide={slides[idx2]} />}
      </div>

      {/* Pagination dots — over image on smaller, below on monitor */}
      <div className="absolute bottom-4 xl:bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              index === idx1 ? 'bg-dylo-orange-dark' : 'bg-white/70'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
