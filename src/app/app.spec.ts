import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { THEME_STORAGE_KEY } from './shared/theme.service';

describe('App', () => {
  beforeEach(async () => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  afterEach(() => localStorage.removeItem(THEME_STORAGE_KEY));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('switches between light and dark mode and remembers the choice', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector<HTMLButtonElement>('[role="switch"]')!;

    expect(toggle.getAttribute('aria-checked')).toBe('false');
    toggle.click();
    await fixture.whenStable();

    expect(toggle.getAttribute('aria-checked')).toBe('true');
    expect(document.documentElement.dataset['theme']).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');

    toggle.click();
    await fixture.whenStable();

    expect(toggle.getAttribute('aria-checked')).toBe('false');
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });
});
