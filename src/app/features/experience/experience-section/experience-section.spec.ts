import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceSection } from './experience-section';

describe('ExperienceSection', () => {
  let component: ExperienceSection;
  let fixture: ComponentFixture<ExperienceSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('presents SevenData as a future experience without unconfirmed technologies', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const sevenDataEntry = Array.from(
      element.querySelectorAll<HTMLElement>('.timeline-entry'),
    ).find((entry) => entry.textContent?.includes('SEVENDATA'));

    expect(sevenDataEntry).toBeTruthy();
    expect(sevenDataEntry?.textContent).toContain('Da settembre 2026');
    expect(sevenDataEntry?.textContent).toContain(
      'Ingresso previsto nel team di sviluppo frontend di SevenData.',
    );
    expect(sevenDataEntry?.querySelector('.timeline-entry__technologies')).toBeNull();
  });
});
