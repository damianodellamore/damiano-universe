import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSection } from './contact-section';

describe('ContactSection', () => {
  let component: ContactSection;
  let fixture: ComponentFixture<ContactSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a working email call to action', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const emailLink = element.querySelector<HTMLAnchorElement>('.contact__cta');

    expect(emailLink?.textContent).toContain('SCRIVIMI');
    expect(emailLink?.getAttribute('href')).toBe('mailto:damianodellamore96@gmail.com');
  });

  it('renders only verified external links with safe attributes', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('.contact-link'));

    expect(links).toHaveLength(6);
    expect(links.map((link) => link.textContent)).not.toContain('LinkedIn');

    for (const link of links) {
      expect(link.getAttribute('href')).toBeTruthy();
      expect(link.getAttribute('href')).not.toBe('#');
      expect(link.target).toBe('_blank');
      expect(link.rel).toBe('noopener noreferrer');
    }
  });
});
