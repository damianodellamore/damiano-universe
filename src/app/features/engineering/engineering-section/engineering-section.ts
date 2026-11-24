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

interface EngineeringCard {
  number: string;
  title: string;
  paragraphs: string[];
  badges: string[];
}

interface FeaturedProduct {
  id: string;
  eyebrow: string;
  name: string;
  claim: string;
  description: string[];
  stack?: {
    label: string;
    items: string[];
  };
  url: string;
  actionLabel?: string;
  appStoreUrl?: string;
  visual: ProductVisual;
}

type ProductVisual = {
  logo: string;
  label: string;
} & (
  | { kind: 'overview'; statement: string; pillars: string[] }
  | { kind: 'catalog'; apps: CatalogApp[] }
);

interface CatalogApp {
  id: string;
  name: string;
  appStoreUrl?: string;
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

  protected readonly featuredProducts: FeaturedProduct[] = [
    {
      id: 'treasureloop',
      eyebrow: 'FEATURED PRODUCT',
      name: 'TreasureLoop',
      claim: 'La cultura torna nei luoghi reali.',
      description: [
        "TreasureLoop collega luoghi reali e contenuti digitali in un'unica esperienza culturale.",
        'Geolocalizzazione, storie e media trasformano il patrimonio in qualcosa da scoprire e vivere sul territorio.',
      ],
      stack: {
        label: 'Stack di TreasureLoop',
        items: [
          'React Native',
          'Expo',
          'Node.js',
          'REST API',
          'Database',
          'Geolocalizzazione',
          'Media',
          'App Store',
        ],
      },
      url: 'https://www.treasureloop.it',
      appStoreUrl: 'https://apps.apple.com/it/app/treasureloop/id6736532288',
      visual: {
        kind: 'overview',
        logo: 'logos/treasureloop_logo.png',
        label: 'CULTURAL PLATFORM',
        statement: 'Luoghi reali, storie digitali e cultura da vivere sul territorio.',
        pillars: ['Luoghi reali', 'Geolocalizzazione', 'Arte & storia', 'Media', 'Esplorazione'],
      },
    },
    {
      id: 'rebus',
      eyebrow: 'MYNAMEME.COM',
      name: 'ReBus',
      claim: 'Le app per il trasporto pubblico locale.',
      description: [
        'Ho creato ReBus per aiutarti a trovare fermate, orari e percorsi. Su mynameme.com puoi scegliere l’app per la tua città.',
      ],
      url: 'https://www.mynameme.com/',
      actionLabel: 'Scopri le app ReBus',
      visual: {
        kind: 'catalog',
        logo: 'logos/rebus_catalog_icon.png',
        label: 'Le app ReBus',
        apps: [
          {
            id: 'rebuslucca',
            name: 'ReBusLucca',
            appStoreUrl: 'https://apps.apple.com/it/app/rebuslucca/id6832028376',
          },
          { id: 'rebusmilano', name: 'ReBusMilano' },
        ],
      },
    },
  ];

  ngAfterViewInit(): void {
    const section = this.engineeringSection.nativeElement;

    setupScrollReveal({
      container: section,
      readyClass: 'engineering--reveal-ready',
      destroyRef: this.destroyRef,
      ngZone: this.ngZone,
    });
  }
}
