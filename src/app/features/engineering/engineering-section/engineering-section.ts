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
  stack: string[];
  stackLabel: string;
  url: string;
  appStoreUrl?: string;
  launch?: {
    date: string;
    label: string;
  };
  visual: ProductVisual;
}

interface ProductVisual {
  logo: string;
  monogram: string;
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

  protected readonly loadedProductLogos = new Set<string>();

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
      stackLabel: 'Stack di TreasureLoop',
      url: 'https://www.treasureloop.it',
      appStoreUrl: 'https://apps.apple.com/it/app/treasureloop/id6736532288',
      visual: {
        logo: 'logos/treasureloop_logo.png',
        monogram: 'TL',
        label: 'CULTURAL PLATFORM',
        statement: 'Luoghi reali, storie digitali e cultura da vivere sul territorio.',
        pillars: ['Luoghi reali', 'Geolocalizzazione', 'Arte & storia', 'Media', 'Esplorazione'],
      },
    },
    {
      id: 'rebuslucca',
      eyebrow: 'SECONDA APP · MYNAMEME',
      name: 'RebusLucca',
      claim: 'La tua prossima fermata, a Lucca.',
      description: [
        'RebusLucca è la mia seconda app: aiuta a trovare fermate, orari e percorsi degli autobus di Lucca e provincia, su iPhone e iPad.',
        'La presento su mynameme.com con MyNameMe, il mio secondo alias. Il progetto nasce da un’idea mia, Damiano Dell’Amore, per rendere più semplice prendere l’autobus.',
        'Scegli partenza e arrivo sulla mappa, cerca collegamenti diretti o con un cambio e attiva gli avvisi vocali prima di scendere. Senza account e senza pubblicità.',
      ],
      stack: ['iPhone & iPad', 'Mappa delle fermate', 'Orari offline', 'Avvisi vocali'],
      stackLabel: 'Dispositivi e funzionalità di RebusLucca',
      url: 'https://www.mynameme.com/',
      launch: {
        date: '2026-11-11',
        label: '11 novembre 2026',
      },
      visual: {
        logo: 'logos/rebuslucca_app_icon.png',
        monogram: 'RL',
        label: 'MYNAMEME.COM / MOBILITÀ LOCALE',
        statement: 'Due fermate, il tuo percorso. Un modo più semplice di muoversi a Lucca.',
        pillars: ['Lucca e provincia', 'Percorsi', 'Coincidenze', 'Voce'],
      },
    },
  ];

  protected handleProductLogoLoad(productId: string): void {
    this.loadedProductLogos.add(productId);
  }

  protected handleProductLogoError(event: Event): void {
    const image = event.target;

    if (image instanceof HTMLImageElement) {
      image.hidden = true;
    }
  }

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
