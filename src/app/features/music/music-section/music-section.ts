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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { setupScrollReveal } from '../../../shared/scroll-reveal';

interface MusicPlatform {
  id: string;
  name: string;
  url: string | null;
  icon: string;
  ariaLabel: string;
  glow: string;
}

interface MusicReleaseCover {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface MusicRelease {
  id: string;
  title: string;
  artist: string;
  year: number;
  type: string;
  album?: string;
  description?: string;
  cover?: MusicReleaseCover;
  spotifyUrl?: string;
  spotifyEmbedUrl?: string;
  latest?: boolean;
  featured: boolean;
}

@Component({
  selector: 'app-music-section',
  standalone: true,
  imports: [],
  templateUrl: './music-section.html',
  styleUrl: './music-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicSection implements AfterViewInit {
  @ViewChild('musicSection', { static: true })
  private musicSection!: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly spotifyArtistUrl =
    'https://open.spotify.com/intl-it/artist/54sZP6T4jtoO7QXwokIpws';

  protected readonly appleMusicArtistUrl = 'https://music.apple.com/it/artist/dammad/1412665981';

  protected readonly youtubeUrl = 'https://www.youtube.com/@damianodellamore';

  protected readonly featuredVideo = {
    title: 'DaMMaD - In tlà mì Rumagna',
    watchUrl: 'https://www.youtube.com/watch?v=qWFq4zrPcdg',
    embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube-nocookie.com/embed/qWFq4zrPcdg?rel=0',
    ),
  };

  protected readonly musicPlatforms: MusicPlatform[] = [
    {
      id: 'spotify',
      name: 'Spotify',
      url: this.spotifyArtistUrl,
      icon: 'icons/music/spotify.svg',
      ariaLabel: 'Ascolta DaMMaD su Spotify',
      glow: 'rgba(30, 215, 96, 0.16)',
    },
    {
      id: 'apple-music',
      name: 'Apple Music',
      url: this.appleMusicArtistUrl,
      icon: 'icons/music/apple-music.svg',
      ariaLabel: 'Ascolta DaMMaD su Apple Music',
      glow: 'rgba(224, 94, 123, 0.15)',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      url: this.youtubeUrl,
      icon: 'icons/music/youtube.svg',
      ariaLabel: "Visita l'Official Artist Channel di DaMMaD su YouTube",
      glow: 'rgba(255, 70, 70, 0.14)',
    },
  ];

  protected readonly musicReleases: MusicRelease[] = [
    {
      id: 'mi-ipnotizzi',
      title: 'Mi Ipnotizzi',
      artist: 'DaMMaD',
      year: 2026,
      type: 'Singolo',
      spotifyUrl: 'https://open.spotify.com/album/1uZhPKu1Iv7gxqjGth49Bs',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/album/1uZhPKu1Iv7gxqjGth49Bs',
      latest: true,
      featured: false,
    },
    {
      id: 'in-tla-mi-rumagna',
      title: 'In tlà mì Rumagna',
      artist: 'DaMMaD',
      year: 2020,
      type: 'Track',
      cover: {
        src: 'images/music/in-tla-mi-rumagna.jpg',
        alt: 'Copertina ufficiale di In tlà mì Rumagna di DaMMaD',
        width: 1200,
        height: 1200,
      },
      description:
        'Una hit in dialetto romagnolo diventata virale durante il Covid nel 2020, portando speranza e positività in un momento difficile per tutti.',
      featured: true,
    },
    {
      id: '6diabolica',
      title: '6DIABOLICA',
      artist: 'DaMMaD',
      year: 2026,
      type: 'Track',
      featured: false,
    },
    {
      id: 'il-bug-del-millennio',
      title: '1L BUG D3L M1LL3NN10',
      artist: 'DaMMaD',
      year: 2025,
      type: 'Track',
      featured: false,
    },
    {
      id: 'mare-calmo',
      title: 'Mare Calmo',
      artist: 'DaMMaD',
      year: 2025,
      type: 'Track',
      featured: false,
    },
    {
      id: 'in-tla-burrasca',
      title: 'In tlà Burrasca',
      artist: 'DaMMaD',
      year: 2023,
      type: 'Track',
      featured: false,
    },
  ];

  protected readonly latestReleases = this.musicReleases.filter((release) => release.latest);
  protected readonly featuredReleases = this.musicReleases.filter((release) => release.featured);
  protected readonly supportingReleaseGroups = this.groupReleases(
    this.musicReleases.filter((release) => !release.featured && !release.latest),
    2,
  );
  protected readonly trustedSpotifyEmbedUrls = this.createTrustedSpotifyEmbedUrls(
    this.musicReleases,
  );
  protected readonly waveformBars = [28, 46, 66, 38, 82, 54, 72, 34, 62, 88, 48, 70, 42, 58];

  ngAfterViewInit(): void {
    setupScrollReveal({
      container: this.musicSection.nativeElement,
      readyClass: 'music--reveal-ready',
      destroyRef: this.destroyRef,
      ngZone: this.ngZone,
      threshold: 0.13,
      rootMargin: '0px 0px -7% 0px',
    });
  }

  private groupReleases(releases: MusicRelease[], groupSize: number): MusicRelease[][] {
    return Array.from({ length: Math.ceil(releases.length / groupSize) }, (_, index) =>
      releases.slice(index * groupSize, index * groupSize + groupSize),
    );
  }

  private createTrustedSpotifyEmbedUrls(releases: MusicRelease[]): Record<string, SafeResourceUrl> {
    const trustedUrls: Record<string, SafeResourceUrl> = {};
    const spotifyEmbedPattern =
      /^https:\/\/open\.spotify\.com\/embed\/(?:track|album)\/[a-zA-Z0-9]{22}(?:\?[^#]*)?$/;

    for (const release of releases) {
      if (!release.spotifyEmbedUrl || !spotifyEmbedPattern.test(release.spotifyEmbedUrl)) {
        continue;
      }

      trustedUrls[release.id] = this.sanitizer.bypassSecurityTrustResourceUrl(
        release.spotifyEmbedUrl,
      );
    }

    return trustedUrls;
  }
}
