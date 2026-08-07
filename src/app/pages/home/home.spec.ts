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

  it('places selected work and music after the experience section', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const homepageSections = Array.from(
      element.querySelectorAll('app-experience-section, app-projects-section, app-music-section'),
    ).map((section) => section.tagName.toLowerCase());

    expect(homepageSections).toEqual([
      'app-experience-section',
      'app-projects-section',
      'app-music-section',
    ]);
  });
});
