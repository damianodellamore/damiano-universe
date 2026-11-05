import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicSection } from './music-section';

describe('MusicSection', () => {
  let component: MusicSection;
  let fixture: ComponentFixture<MusicSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicSection],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the new single alongside the five confirmed releases', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const releaseCards = element.querySelectorAll(
      '.latest-release, .featured-release, .compact-release',
    );
    const editorialBlocks = element.querySelectorAll(
      '.latest-release, .featured-release, .release-group',
    );

    expect(releaseCards).toHaveLength(6);
    expect(editorialBlocks).toHaveLength(4);
    expect(element.querySelector('.latest-release h4')?.textContent).toBe('Mi Ipnotizzi');
    expect(element.textContent).toContain('In tlà mì Rumagna');
    expect(element.textContent).toContain('diventata virale durante il Covid nel 2020');
    expect(element.textContent).not.toContain('Le Mie Origini');
    expect(element.textContent).toContain('6DIABOLICA');
    expect(element.textContent).toContain('1L BUG D3L M1LL3NN10');
    expect(element.textContent).toContain('Mare Calmo');
    expect(element.textContent).toContain('In tlà Burrasca');
    expect(element.textContent).not.toContain('Girotondo feat. NICOLAS');
    expect(element.textContent).not.toContain("E' figa? E' porca");
  });

  it('renders the official local cover for the featured release', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const cover = element.querySelector<HTMLImageElement>('.featured-release__cover img');

    expect(cover).not.toBeNull();
    expect(cover?.getAttribute('src')).toBe('images/music/in-tla-mi-rumagna.jpg');
    expect(cover?.alt).toBe('Copertina ufficiale di In tlà mì Rumagna di DaMMaD');
    expect(cover?.width).toBe(1200);
    expect(cover?.height).toBe(1200);
    expect(cover?.getAttribute('loading')).toBe('lazy');
  });

  it('embeds only the new single using the supplied Spotify album URL', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const embeds = element.querySelectorAll<HTMLIFrameElement>('.spotify-embed iframe');

    expect(embeds).toHaveLength(1);
    expect(embeds[0].getAttribute('src')).toBe(
      'https://open.spotify.com/embed/album/1uZhPKu1Iv7gxqjGth49Bs',
    );
    expect(embeds[0].title).toBe('Ascolta Mi Ipnotizzi di DaMMaD su Spotify');
    expect(embeds[0].getAttribute('loading')).toBe('lazy');
    expect(embeds[0].getAttribute('height')).toBe('352');
    expect(element.querySelector('.featured-release iframe')).toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('.latest-release__link')?.href).toBe(
      'https://open.spotify.com/album/1uZhPKu1Iv7gxqjGth49Bs',
    );
  });

  it('embeds the most watched official YouTube video and links the artist channel', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const player = element.querySelector<HTMLIFrameElement>('.music-video__player iframe');
    const channelLink = element.querySelector<HTMLAnchorElement>('.music-video__channel');
    const directVideoLink = element.querySelector<HTMLAnchorElement>('.music-video__direct-link');

    expect(player).not.toBeNull();
    expect(player?.getAttribute('src')).toBe(
      'https://www.youtube-nocookie.com/embed/qWFq4zrPcdg?rel=0',
    );
    expect(player?.title).toBe('DaMMaD - In tlà mì Rumagna');
    expect(player?.getAttribute('loading')).toBe('lazy');
    expect(channelLink?.href).toBe('https://www.youtube.com/@damianodellamore');
    expect(directVideoLink?.href).toBe('https://www.youtube.com/watch?v=qWFq4zrPcdg');
  });

  it('creates external links only for configured platform URLs', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const platformLinks = element.querySelectorAll<HTMLAnchorElement>(
      '.music-platforms a.music-platform',
    );
    const pendingPlatforms = element.querySelectorAll('.music-platforms .music-platform--pending');
    const spotifyLink = platformLinks.item(0);
    const appleMusicLink = platformLinks.item(1);
    const youtubeLink = platformLinks.item(2);

    expect(platformLinks).toHaveLength(3);
    expect(pendingPlatforms).toHaveLength(0);
    expect(spotifyLink.href).toBe('https://open.spotify.com/intl-it/artist/54sZP6T4jtoO7QXwokIpws');
    expect(appleMusicLink.href).toBe('https://music.apple.com/it/artist/dammad/1412665981');
    expect(youtubeLink.href).toBe('https://www.youtube.com/@damianodellamore');

    for (const link of platformLinks) {
      expect(link.target).toBe('_blank');
      expect(link.rel).toBe('noopener noreferrer');
    }
  });
});
