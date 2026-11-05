import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, afterNextRender, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';
export const THEME_STORAGE_KEY = 'damiano-universe-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentTheme = signal<Theme>('dark');
  readonly theme = this.currentTheme.asReadonly();

  constructor() {
    // Wait for hydration; the head script already applies the palette before paint.
    afterNextRender(() => {
      const browserWindow = this.document.defaultView;
      if (!browserWindow) return;

      const preference = browserWindow.matchMedia?.('(prefers-color-scheme: light)');
      const systemTheme = (): Theme => (preference?.matches ? 'light' : 'dark');
      this.applyTheme(this.readPreference() ?? systemTheme());

      const onSystemChange = (): void => {
        if (!this.readPreference()) this.applyTheme(systemTheme());
      };
      const onStorage = (event: StorageEvent): void => {
        if (event.key === THEME_STORAGE_KEY || event.key === null) {
          this.applyTheme(this.readPreference() ?? systemTheme());
        }
      };

      preference?.addEventListener('change', onSystemChange);
      browserWindow.addEventListener('storage', onStorage);
      this.destroyRef.onDestroy(() => {
        preference?.removeEventListener('change', onSystemChange);
        browserWindow.removeEventListener('storage', onStorage);
      });
    });
  }

  toggle(): void {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    try {
      this.document.defaultView?.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // The toggle also works when browser storage is unavailable.
    }
  }

  private readPreference(): Theme | null {
    try {
      const value = this.document.defaultView?.localStorage.getItem(THEME_STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }

  private applyTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.document.documentElement.setAttribute('data-theme', theme);
    this.document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#f5f3ee' : '#05070d');
  }
}
