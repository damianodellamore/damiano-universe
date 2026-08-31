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

  it('presents the future company anonymously and without unconfirmed technologies', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const futureCompanyEntry = Array.from(
      element.querySelectorAll<HTMLElement>('.timeline-entry'),
    ).find((entry) => entry.textContent?.includes('AZIENDA DATA-DRIVEN'));

    expect(futureCompanyEntry).toBeTruthy();
    expect(futureCompanyEntry?.textContent).toContain('Da settembre 2026');
    expect(futureCompanyEntry?.textContent).toContain(
      'Azienda di Milano che lavora con i dati per migliorare il business dei propri clienti.',
    );
    expect(futureCompanyEntry?.querySelector('.timeline-entry__technologies')).toBeNull();
  });
});
