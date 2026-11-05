import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ThemeToggle } from '../layout/theme-toggle/theme-toggle';
import { THEME_STORAGE_KEY } from './theme.service';

describe('Theme preferences', () => {
  const media = {
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };

  beforeEach(async () => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    document.documentElement.setAttribute('data-theme', 'dark');
    media.matches = false;
    media.addEventListener.mockClear();
    media.removeEventListener.mockClear();
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => media),
    );
    await TestBed.configureTestingModule({ imports: [ThemeToggle] }).compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    localStorage.removeItem(THEME_STORAGE_KEY);
    document.documentElement.setAttribute('data-theme', 'dark');
  });

  async function render() {
    const fixture = TestBed.createComponent(ThemeToggle);
    await fixture.whenStable();
    return fixture;
  }

  it('restores the saved theme ahead of the system preference', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    await render();
    expect(document.documentElement.dataset['theme']).toBe('light');
  });

  it('uses the system preference when no theme is saved', async () => {
    media.matches = true;
    await render();
    expect(document.documentElement.dataset['theme']).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it('ignores an invalid saved theme', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'invalid');
    await render();
    expect(document.documentElement.dataset['theme']).toBe('dark');
  });

  it('still switches theme when browser storage is blocked', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    const fixture = await render();
    const toggle = (fixture.nativeElement as HTMLElement).querySelector('button')!;
    expect(() => toggle.click()).not.toThrow();
    await fixture.whenStable();
    expect(document.documentElement.dataset['theme']).toBe('light');
  });

  it('synchronizes changes from another tab and removes listeners on destroy', async () => {
    const fixture = await render();
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    window.dispatchEvent(new StorageEvent('storage', { key: THEME_STORAGE_KEY }));
    expect(document.documentElement.dataset['theme']).toBe('light');

    TestBed.resetTestingModule();
    expect(media.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    fixture.destroy();
  });
});
