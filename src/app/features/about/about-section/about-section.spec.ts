import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSection } from './about-section';

describe('AboutSection', () => {
  let component: AboutSection;
  let fixture: ComponentFixture<AboutSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutSection],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the editorial portrait and its three principles', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const section = element.querySelector<HTMLElement>('section#about');
    const title = element.querySelector<HTMLHeadingElement>('h2#about-title');
    const principles = Array.from(element.querySelectorAll('.about-principles li'));

    expect(section?.getAttribute('aria-labelledby')).toBe('about-title');
    expect(title?.textContent).toContain('Costruisco ciò che');
    expect(title?.textContent).toContain('vorrei esistesse.');
    expect(principles).toHaveLength(3);
    expect(
      principles.map((principle) => principle.querySelector('h3')?.textContent?.trim()),
    ).toEqual(['BUILD', 'LEARN', 'CREATE']);
  });
});
