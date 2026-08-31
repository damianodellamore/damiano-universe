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

interface ProfessionalExperience {
  company: string;
  period: string;
  role: string;
  description: string;
  technologies: string[];
  featured: boolean;
}

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [],
  templateUrl: './experience-section.html',
  styleUrl: './experience-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceSection implements AfterViewInit {
  @ViewChild('experienceSection', { static: true })
  private experienceSection!: ElementRef<HTMLElement>;

  @ViewChild('experienceTimeline', { static: true })
  private experienceTimeline!: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);

  protected readonly experiences: ProfessionalExperience[] = [
    {
      company: 'AZIENDA DATA-DRIVEN',
      period: 'Da settembre 2026',
      role: 'Frontend Developer',
      description:
        'Azienda di Milano che lavora con i dati per migliorare il business dei propri clienti.',
      technologies: [],
      featured: true,
    },
    {
      company: 'TREASURELOOP',
      period: '2024 — presente',
      role: 'Founder & Full Stack Developer',
      description:
        'Ideazione, sviluppo e pubblicazione di una piattaforma culturale che unisce luoghi reali, geolocalizzazione e contenuti multimediali.',
      technologies: ['React Native', 'Expo', 'Node.js', 'Database', 'REST API', 'App Store'],
      featured: true,
    },
    {
      company: 'REPLY',
      period: '2024',
      role: 'Frontend Developer',
      description:
        'Esperienza in un contesto enterprise, lavorando su interfacce web, componenti e integrazione con sistemi strutturati.',
      technologies: ['JavaScript', 'React', 'Next.js', 'AEM', 'Git'],
      featured: false,
    },
    {
      company: 'INIZI',
      period: 'Prima del 2024',
      role: 'Independent Developer',
      description:
        'Progetti personali, studio autonomo e costruzione delle fondamenta tecniche attraverso applicazioni frontend, backend e sperimentazione continua.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      featured: false,
    },
  ];

  ngAfterViewInit(): void {
    const section = this.experienceSection.nativeElement;
    const timeline = this.experienceTimeline.nativeElement;
    let highestVisibleIndex = -1;

    setupScrollReveal({
      container: section,
      readyClass: 'experience--reveal-ready',
      destroyRef: this.destroyRef,
      ngZone: this.ngZone,
      threshold: 0.16,
      rootMargin: '0px 0px -9% 0px',
      onUnavailable: () => timeline.style.setProperty('--timeline-progress', '1'),
      onReveal: (element) => {
        const timelineIndex = Number(element.dataset['timelineIndex']);

        if (!Number.isInteger(timelineIndex)) {
          return;
        }

        highestVisibleIndex = Math.max(highestVisibleIndex, timelineIndex);
        timeline.style.setProperty(
          '--timeline-progress',
          `${(highestVisibleIndex + 1) / this.experiences.length}`,
        );
      },
    });
  }
}
