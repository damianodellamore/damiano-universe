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

interface EngineeringCard {
  number: string;
  title: string;
  paragraphs: string[];
  badges: string[];
}

interface FeaturedProduct {
  name: string;
  claim: string;
  description: string[];
  stack: string[];
  url: string;
  appStoreUrl: string;
  visual: ProductVisual;
}

interface ProductVisual {
  logo: string;
  label: string;
  statement: string;
  pillars: string[];
}

@Component({
  selector: 'app-engineering-section',
  standalone: true,
  imports: [],
  templateUrl: './engineering-section.html',
  styleUrl: './engineering-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EngineeringSection implements AfterViewInit {
  @ViewChild('engineeringSection', { static: true })
  private engineeringSection!: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);

  protected productLogoLoaded = false;

  protected readonly cards: EngineeringCard[] = [
    {
      number: '01',
      title: 'Frontend Systems',
      paragraphs: [
        'Progetto sistemi frontend modulari, responsive e mantenibili, pensati per crescere senza perdere qualità.',
      ],
      badges: ['Angular', 'React', 'TypeScript', 'JavaScript', 'SCSS'],
    },
    {
      number: '02',
      title: 'Product Engineering',
      paragraphs: [
        "Porto un'idea dalla logica di prodotto alla release, collegando interfacce, servizi, API e dati.",
      ],
      badges: ['Node.js', 'REST API', 'MySQL', 'Git', 'Architecture'],
    },
    {
      number: '03',
      title: 'Digital Experiences',
      paragraphs: [
        'Velocità, chiarezza e carattere trasformano una schermata in qualcosa che vale la pena ricordare.',
        'Non costruisco semplicemente interfacce. Progetto esperienze.',
      ],
      badges: ['UI Design', 'Animations', 'AI', 'Creative Coding', 'UX'],
    },
  ];

  protected readonly featuredProduct: FeaturedProduct = {
    name: 'TreasureLoop',
    claim: 'La cultura torna nei luoghi reali.',
    description: [
      "TreasureLoop collega luoghi reali e contenuti digitali in un'unica esperienza culturale.",
      'Geolocalizzazione, storie e media trasformano il patrimonio in qualcosa da scoprire e vivere sul territorio.',
    ],
    stack: [
      'React Native',
      'Expo',
      'Node.js',
      'REST API',
      'Database',
      'Geolocalizzazione',
      'Media',
      'App Store',
    ],
    url: 'https://www.treasureloop.it',
    appStoreUrl: 'https://apps.apple.com/it/app/treasureloop/id6736532288',
    visual: {
      logo: '/logos/treasureloop_logo.png',
      label: 'CULTURAL PLATFORM',
      statement: 'Luoghi reali, storie digitali e cultura da vivere sul territorio.',
      pillars: ['Luoghi reali', 'Geolocalizzazione', 'Arte & storia', 'Media', 'Esplorazione'],
    },
  };

  protected handleProductLogoLoad(): void {
    this.productLogoLoaded = true;
  }

  protected handleProductLogoError(event: Event): void {
    const image = event.target;

    if (image instanceof HTMLImageElement) {
      image.hidden = true;
    }
  }

  ngAfterViewInit(): void {
    const section = this.engineeringSection.nativeElement;
    const browserWindow = section.ownerDocument.defaultView;

    if (
      !browserWindow ||
      !('IntersectionObserver' in browserWindow) ||
      browserWindow.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      section.classList.add('engineering--reveal-ready');

      const observer = new browserWindow.IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue;
            }

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 0.14,
          rootMargin: '0px 0px -8% 0px',
        },
      );

      section.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        observer.observe(element);
      });

      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
