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

interface AboutPrinciple {
  name: string;
  description: string;
}

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [],
  templateUrl: './about-section.html',
  styleUrl: './about-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSection implements AfterViewInit {
  @ViewChild('aboutSection', { static: true })
  private aboutSection!: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);

  protected readonly principles: AboutPrinciple[] = [
    {
      name: 'BUILD',
      description: 'Portare le idee fino a qualcosa che funziona davvero.',
    },
    {
      name: 'LEARN',
      description: 'Continuare ad approfondire strumenti, architetture e nuovi modi di sviluppare.',
    },
    {
      name: 'CREATE',
      description: 'Usare tecnologia, design e immaginazione come parti dello stesso processo.',
    },
  ];

  ngAfterViewInit(): void {
    setupScrollReveal({
      container: this.aboutSection.nativeElement,
      readyClass: 'about--reveal-ready',
      destroyRef: this.destroyRef,
      ngZone: this.ngZone,
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px',
    });
  }
}
