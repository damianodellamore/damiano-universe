import { Component } from '@angular/core';
import { AboutSection } from '../../features/about/about-section/about-section';
import { ContactSection } from '../../features/contact/contact-section/contact-section';
import { EngineeringSection } from '../../features/engineering/engineering-section/engineering-section';
import { ExperienceSection } from '../../features/experience/experience-section/experience-section';
import { MusicSection } from '../../features/music/music-section/music-section';
import { ProjectsSection } from '../../features/projects/projects-section/projects-section';
import { SolarSystem } from '../../features/universe/solar-system/solar-system';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-home',
  imports: [
    SolarSystem,
    EngineeringSection,
    ExperienceSection,
    ProjectsSection,
    MusicSection,
    AboutSection,
    ContactSection,
    Footer,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly profilePhoto = 'logos/damianodellamore.JPG';
  protected readonly ambientStars = Array.from({ length: 18 }, (_, index) => ({
    x: 4 + ((index * 47 + 11) % 92),
    y: 4 + ((index * 67 + 7) % 90),
    size: 2.4 + (index % 4) * 0.8,
    flare: 0.85 + (index % 3) * 0.32,
    duration: 4.8 + (index % 6) * 0.9,
    delay: -((index % 13) * 0.68),
    tone: index % 6 === 0 ? 'gold' : index % 4 === 0 ? 'ice' : 'white',
  }));
  private readonly profileFallback = 'logos/damianodellamore_logo.svg';

  protected useProfileFallback(event: Event): void {
    const image = event.target;

    if (!(image instanceof HTMLImageElement) || image.src.endsWith(this.profileFallback)) {
      return;
    }

    image.src = this.profileFallback;
  }
}
