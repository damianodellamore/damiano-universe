import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('places contact and footer after about at the end of the homepage', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const homepageSections = Array.from(
      element.querySelectorAll(
        'app-experience-section, app-projects-section, app-music-section, app-about-section, app-contact-section, app-footer',
      ),
    ).map((section) => section.tagName.toLowerCase());

    expect(homepageSections).toEqual([
      'app-experience-section',
      'app-projects-section',
      'app-music-section',
      'app-about-section',
      'app-contact-section',
      'app-footer',
    ]);
  });

  it('renders the decorative ambient starfield without exposing it to assistive technology', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const sky = element.querySelector('.ambient-sky');
    const stars = element.querySelectorAll('.ambient-sky__star');
    const meteor = element.querySelector('.ambient-sky__meteor');

    expect(sky?.getAttribute('aria-hidden')).toBe('true');
    expect(stars).toHaveLength(18);
    expect(stars.item(0).getAttribute('style')).toContain('--star-flare');
    expect(meteor).not.toBeNull();
  });
});
