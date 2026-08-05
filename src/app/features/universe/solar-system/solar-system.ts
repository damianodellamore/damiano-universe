import { Component } from '@angular/core';

type OrbitKey = 'inner' | 'middle' | 'outer';

interface Planet {
  name: string;
  logo: string;
  orbit: OrbitKey;
  angle: number;
  duration: string;
  direction: 'normal' | 'reverse';
  counterDirection: 'normal' | 'reverse';
  delay: string;
  radiusOffset: string;
  floatDuration: string;
  floatDelay: string;
  floatDistance: string;
}

interface Orbit {
  key: OrbitKey;
  label: string;
}

@Component({
  selector: 'app-solar-system',
  imports: [],
  templateUrl: './solar-system.html',
  styleUrl: './solar-system.scss',
})
export class SolarSystem {
  protected readonly damianoLogo = '/logos/damianodellamore_logo.svg';

  protected readonly orbits: Orbit[] = [
    {
      key: 'inner',
      label: 'Orbita interna',
    },
    {
      key: 'middle',
      label: 'Orbita intermedia',
    },
    {
      key: 'outer',
      label: 'Orbita esterna',
    },
  ];

  protected readonly planets: Planet[] = [
    this.createPlanet(
      'Angular',
      '/logos/angular_logo.svg',
      'inner',
      20,
      '19s',
      'normal',
      '-2.4s',
      '0.12rem',
      '5.8s',
      '-0.7s',
      '0.22rem',
    ),
    this.createPlanet(
      'TypeScript',
      '/logos/typescript_logo.svg',
      'inner',
      113,
      '24s',
      'reverse',
      '-7.8s',
      '-0.18rem',
      '6.6s',
      '-2.1s',
      '0.18rem',
    ),
    this.createPlanet(
      'HTML',
      '/logos/html_logo.svg',
      'inner',
      205,
      '21s',
      'normal',
      '-12.6s',
      '0.28rem',
      '7.2s',
      '-1.4s',
      '0.2rem',
    ),
    this.createPlanet(
      'CSS',
      '/logos/css_logo.svg',
      'inner',
      292,
      '27s',
      'reverse',
      '-4.9s',
      '-0.08rem',
      '6.1s',
      '-3.2s',
      '0.16rem',
    ),
    this.createPlanet(
      'React',
      '/logos/react_logo.svg',
      'middle',
      58,
      '31s',
      'reverse',
      '-16.4s',
      '0.18rem',
      '7.8s',
      '-2.9s',
      '0.24rem',
    ),
    this.createPlanet(
      'JavaScript',
      '/logos/javascript_logo.svg',
      'middle',
      149,
      '29s',
      'normal',
      '-9.1s',
      '-0.22rem',
      '6.9s',
      '-0.9s',
      '0.18rem',
    ),
    this.createPlanet(
      'Node.js',
      '/logos/nodejs_logo.svg',
      'middle',
      244,
      '35s',
      'reverse',
      '-21.7s',
      '0.34rem',
      '8.4s',
      '-3.8s',
      '0.21rem',
    ),
    this.createPlanet(
      'PHP',
      '/logos/php_logo.svg',
      'middle',
      336,
      '33s',
      'normal',
      '-5.3s',
      '-0.12rem',
      '7.4s',
      '-1.8s',
      '0.17rem',
    ),
    this.createPlanet(
      'MySQL',
      '/logos/mysql_logo.svg',
      'outer',
      8,
      '43s',
      'normal',
      '-26.2s',
      '0.16rem',
      '8.8s',
      '-4.1s',
      '0.2rem',
    ),
    this.createPlanet(
      'Git',
      '/logos/git_logo.svg',
      'outer',
      80,
      '39s',
      'reverse',
      '-13.8s',
      '-0.3rem',
      '7.9s',
      '-2.6s',
      '0.23rem',
    ),
    this.createPlanet(
      'Linux',
      '/logos/linux_logo.svg',
      'outer',
      156,
      '47s',
      'normal',
      '-31.5s',
      '0.38rem',
      '9.2s',
      '-5.3s',
      '0.19rem',
    ),
    this.createPlanet(
      'Apple',
      '/logos/apple_logo.svg',
      'outer',
      226,
      '41s',
      'reverse',
      '-18.9s',
      '-0.14rem',
      '8.1s',
      '-1.1s',
      '0.16rem',
    ),
    this.createPlanet(
      'ChatGPT',
      '/logos/chatgpt_logo.svg',
      'outer',
      300,
      '52s',
      'normal',
      '-37.4s',
      '0.26rem',
      '9.6s',
      '-3.4s',
      '0.22rem',
    ),
  ];

  private createPlanet(
    name: string,
    logo: string,
    orbit: OrbitKey,
    angle: number,
    duration: string,
    direction: 'normal' | 'reverse',
    delay: string,
    radiusOffset: string,
    floatDuration: string,
    floatDelay: string,
    floatDistance: string,
  ): Planet {
    return {
      name,
      logo,
      orbit,
      angle,
      duration,
      direction,
      counterDirection: direction,
      delay,
      radiusOffset,
      floatDuration,
      floatDelay,
      floatDistance,
    };
  }
}
