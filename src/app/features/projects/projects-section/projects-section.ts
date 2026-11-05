import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  ViewChild,
  inject,
} from '@angular/core';
import { setupScrollReveal } from '../../../shared/scroll-reveal';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  year: number;
  status: string;
  repositoryUrl?: string;
  liveUrl?: string;
  image?: {
    src: string;
    alt: string;
  };
  featured: boolean;
}

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSection implements AfterViewInit {
  @ViewChild('projectsSection', { static: true })
  private projectsSection!: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);

  protected readonly projects: Project[] = [
    {
      id: 'damiano-universe',
      title: "Damiano Dell'Amore Universe",
      category: 'Angular / Creative Frontend',
      description:
        'Un portfolio interattivo costruito con Angular per raccontare competenze, prodotti e percorso professionale attraverso un universo digitale.',
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      year: 2026,
      status: 'In development',
      featured: true,
    },
  ];

  ngAfterViewInit(): void {
    setupScrollReveal({
      container: this.projectsSection.nativeElement,
      readyClass: 'projects--reveal-ready',
      destroyRef: this.destroyRef,
      ngZone: this.ngZone,
      threshold: 0.13,
      rootMargin: '0px 0px -7% 0px',
    });
  }
}
