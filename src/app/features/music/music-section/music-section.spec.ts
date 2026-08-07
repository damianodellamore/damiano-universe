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

  it('renders five verified releases in three editorial blocks', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const releaseCards = element.querySelectorAll('.featured-release, .compact-release');
    const editorialBlocks = element.querySelectorAll('.featured-release, .release-group');

    expect(releaseCards).toHaveLength(5);
    expect(editorialBlocks).toHaveLength(3);
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

  it('does not reuse the previous Spotify embed without a verified track URL', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const embeds = element.querySelectorAll<HTMLIFrameElement>('.spotify-embed iframe');

    expect(embeds).toHaveLength(0);
  });

  it('creates external links only for configured platform URLs', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const platformLinks = element.querySelectorAll<HTMLAnchorElement>('a.music-platform');
    const pendingPlatforms = element.querySelectorAll('.music-platform--pending');
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
