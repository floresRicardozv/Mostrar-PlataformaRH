// Vite resolves these imports to hashed URLs at build time
import regularFont from './CorporateS-Regular.woff2';
import boldFont from './CorporateS-Bold.woff2';

/**
 * Inject <link rel="preload"> tags for the Corporate S font files.
 * Called once on app startup so the browser fetches them in parallel
 * with the CSS instead of waiting for @font-face to be parsed.
 */
export function preloadCorporateFonts(): void {
  if (typeof document === 'undefined') return;

  for (const href of [regularFont, boldFont]) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }
}
