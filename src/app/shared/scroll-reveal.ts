import { DestroyRef, NgZone } from '@angular/core';

interface ScrollRevealOptions {
  container: HTMLElement;
  readyClass: string;
  destroyRef: DestroyRef;
  ngZone: NgZone;
  selector?: string;
  threshold?: number;
  rootMargin?: string;
  onReveal?: (element: HTMLElement) => void;
  onUnavailable?: () => void;
}

export function setupScrollReveal({
  container,
  readyClass,
  destroyRef,
  ngZone,
  selector = '[data-reveal]',
  threshold = 0.14,
  rootMargin = '0px 0px -8% 0px',
  onReveal,
  onUnavailable,
}: ScrollRevealOptions): void {
  const browserWindow = container.ownerDocument.defaultView;

  if (
    !browserWindow ||
    !('IntersectionObserver' in browserWindow) ||
    browserWindow.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  ) {
    onUnavailable?.();
    return;
  }

  ngZone.runOutsideAngular(() => {
    container.classList.add(readyClass);

    const observer = new browserWindow.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const element = entry.target as HTMLElement;

          element.classList.add('is-visible');
          onReveal?.(element);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin },
    );

    container.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      observer.observe(element);
    });

    destroyRef.onDestroy(() => observer.disconnect());
  });
}
