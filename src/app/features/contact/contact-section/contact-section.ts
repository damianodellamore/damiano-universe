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

interface ExternalLink {
  id: string;
  label: string;
  url: string;
  icon?: string;
  username?: string;
  category?: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSection implements AfterViewInit {
  @ViewChild('contactSection', { static: true })
  private contactSection!: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);

  protected readonly emailAddress = 'damianodellamore96@gmail.com';
  protected readonly emailHref = `mailto:${this.emailAddress}`;

  protected readonly externalLinks: ExternalLink[] = [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/damianodellamore',
      icon: 'icons/social/github.svg',
      username: 'damianodellamore',
      category: 'Code',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/damianodellamore/',
      icon: 'icons/social/linkedin.svg',
      username: 'damianodellamore',
      category: 'Work',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/damiano_dellamore/',
      icon: 'icons/social/instagram.svg',
      username: '@damiano_dellamore',
      category: 'Social',
    },
    {
      id: 'spotify',
      label: 'Spotify',
      url: 'https://open.spotify.com/intl-it/artist/54sZP6T4jtoO7QXwokIpws',
      icon: 'icons/music/spotify.svg',
      username: 'DaMMaD',
      category: 'Music',
    },
    {
      id: 'apple-music',
      label: 'Apple Music',
      url: 'https://music.apple.com/it/artist/dammad/1412665981',
      icon: 'icons/music/apple-music.svg',
      username: 'DaMMaD',
      category: 'Music',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      url: 'https://www.youtube.com/@damianodellamore',
      icon: 'icons/music/youtube.svg',
      username: 'DaMMaD',
      category: 'Music',
    },
    {
      id: 'treasureloop',
      label: 'TreasureLoop',
      url: 'https://www.treasureloop.it',
      icon: 'logos/treasureloop_logo.png',
      username: 'treasureloop.it',
      category: 'Product',
    },
  ];

  ngAfterViewInit(): void {
    setupScrollReveal({
      container: this.contactSection.nativeElement,
      readyClass: 'contact--reveal-ready',
      destroyRef: this.destroyRef,
      ngZone: this.ngZone,
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px',
    });
  }
}
