import { Component } from '@angular/core';
import { EngineeringSection } from '../../features/engineering/engineering-section/engineering-section';
import { ExperienceSection } from '../../features/experience/experience-section/experience-section';
import { SolarSystem } from '../../features/universe/solar-system/solar-system';

@Component({
  selector: 'app-home',
  imports: [SolarSystem, EngineeringSection, ExperienceSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly profilePhoto = '/logos/damianodellamore.JPG';
  private readonly profileFallback = '/logos/damianodellamore_logo.svg';

  protected useProfileFallback(event: Event): void {
    const image = event.target;

    if (!(image instanceof HTMLImageElement) || image.src.endsWith(this.profileFallback)) {
      return;
    }

    image.src = this.profileFallback;
  }
}
