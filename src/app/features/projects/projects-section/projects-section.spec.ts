import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsSection } from './projects-section';

describe('ProjectsSection', () => {
  let component: ProjectsSection;
  let fixture: ComponentFixture<ProjectsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders only confirmed projects from the TypeScript collection', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const projects = element.querySelectorAll('.project-entry');

    expect(projects).toHaveLength(1);
    expect(element.querySelector('h3')?.textContent).toBe("Damiano Dell'Amore Universe");
    expect(element.textContent).toContain('Angular / Creative Frontend');
    expect(element.textContent).toContain('2026 · In development');
    expect(element.textContent).not.toContain('Pexels Explorer');
    expect(element.textContent).not.toContain('Product Management');
    expect(element.textContent).not.toContain('Node Utilities');
    expect(element.textContent).not.toContain('TreasureLoop');
  });
});
