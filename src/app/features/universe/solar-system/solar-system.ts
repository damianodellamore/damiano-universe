import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  ViewChild,
  inject,
} from '@angular/core';

const HOVER_ORBIT_PLAYBACK_RATE = 0.8;
const POINTER_EASING = 11;
const ORBIT_SLOWDOWN_EASING = 7;
const ORBIT_RECOVERY_EASING = 3;
const MOTION_EPSILON = 0.001;

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
export class SolarSystem implements AfterViewInit {
  @ViewChild('solarSystem', { static: true })
  private solarSystemElement!: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);

  private animationWindow: Window | null = null;
  private animationFrameId: number | null = null;
  private lastFrameTime = 0;
  private interactionBounds: DOMRect | null = null;
  private currentPointerX = 0;
  private currentPointerY = 0;
  private targetPointerX = 0;
  private targetPointerY = 0;
  private currentOrbitPlaybackRate = 1;
  private targetOrbitPlaybackRate = 1;
  private appliedOrbitPlaybackRate = 1;
  private orbitAnimations: Animation[] = [];

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

  ngAfterViewInit(): void {
    const solarSystem = this.solarSystemElement.nativeElement;
    const animationWindow = solarSystem.ownerDocument.defaultView;

    if (
      !animationWindow ||
      animationWindow.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    this.animationWindow = animationWindow;

    this.ngZone.runOutsideAngular(() => {
      solarSystem.addEventListener('pointerenter', this.handlePointerEnter, { passive: true });
      solarSystem.addEventListener('pointermove', this.handlePointerMove, { passive: true });
      solarSystem.addEventListener('pointerleave', this.handlePointerLeave, { passive: true });
      solarSystem.addEventListener('pointercancel', this.handlePointerLeave, { passive: true });

      this.destroyRef.onDestroy(() => {
        solarSystem.removeEventListener('pointerenter', this.handlePointerEnter);
        solarSystem.removeEventListener('pointermove', this.handlePointerMove);
        solarSystem.removeEventListener('pointerleave', this.handlePointerLeave);
        solarSystem.removeEventListener('pointercancel', this.handlePointerLeave);

        if (this.animationFrameId !== null) {
          animationWindow.cancelAnimationFrame(this.animationFrameId);
        }
      });
    });
  }

  private readonly handlePointerEnter = (event: PointerEvent): void => {
    this.interactionBounds = this.solarSystemElement.nativeElement.getBoundingClientRect();
    this.targetOrbitPlaybackRate = HOVER_ORBIT_PLAYBACK_RATE;
    this.collectOrbitAnimations();
    this.updatePointerTarget(event);
    this.requestFrame();
  };

  private readonly handlePointerMove = (event: PointerEvent): void => {
    this.updatePointerTarget(event);
    this.requestFrame();
  };

  private readonly handlePointerLeave = (): void => {
    this.interactionBounds = null;
    this.targetPointerX = 0;
    this.targetPointerY = 0;
    this.targetOrbitPlaybackRate = 1;
    this.requestFrame();
  };

  private updatePointerTarget(event: PointerEvent): void {
    const bounds = this.interactionBounds;

    if (!bounds) {
      return;
    }

    this.targetPointerX = this.clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    this.targetPointerY = this.clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  }

  private requestFrame(): void {
    if (!this.animationWindow || this.animationFrameId !== null) {
      return;
    }

    this.animationFrameId = this.animationWindow.requestAnimationFrame(this.updateMotion);
  }

  private readonly updateMotion = (timestamp: number): void => {
    const deltaSeconds = this.lastFrameTime
      ? Math.min((timestamp - this.lastFrameTime) / 1000, 0.05)
      : 1 / 60;
    const pointerFactor = 1 - Math.exp(-POINTER_EASING * deltaSeconds);
    const orbitEasing =
      this.targetOrbitPlaybackRate < this.currentOrbitPlaybackRate
        ? ORBIT_SLOWDOWN_EASING
        : ORBIT_RECOVERY_EASING;
    const orbitFactor = 1 - Math.exp(-orbitEasing * deltaSeconds);

    this.lastFrameTime = timestamp;
    this.currentPointerX = this.approach(this.currentPointerX, this.targetPointerX, pointerFactor);
    this.currentPointerY = this.approach(this.currentPointerY, this.targetPointerY, pointerFactor);
    this.currentOrbitPlaybackRate = this.approach(
      this.currentOrbitPlaybackRate,
      this.targetOrbitPlaybackRate,
      orbitFactor,
    );

    this.applyParallax();
    this.applyOrbitPlaybackRate();

    const motionIsActive =
      Math.abs(this.targetPointerX - this.currentPointerX) > MOTION_EPSILON ||
      Math.abs(this.targetPointerY - this.currentPointerY) > MOTION_EPSILON ||
      Math.abs(this.targetOrbitPlaybackRate - this.currentOrbitPlaybackRate) > MOTION_EPSILON;

    if (motionIsActive && this.animationWindow) {
      this.animationFrameId = this.animationWindow.requestAnimationFrame(this.updateMotion);
      return;
    }

    this.currentPointerX = this.targetPointerX;
    this.currentPointerY = this.targetPointerY;
    this.currentOrbitPlaybackRate = this.targetOrbitPlaybackRate;
    this.applyParallax();
    this.applyOrbitPlaybackRate();
    this.animationFrameId = null;
    this.lastFrameTime = 0;
  };

  private applyParallax(): void {
    const solarSystem = this.solarSystemElement.nativeElement;

    solarSystem.style.setProperty('--parallax-x', `${this.currentPointerX * -1.35}%`);
    solarSystem.style.setProperty('--parallax-y', `${this.currentPointerY * -1.05}%`);
    solarSystem.style.setProperty('--logo-x', `${this.currentPointerX * 8}px`);
    solarSystem.style.setProperty('--logo-y', `${this.currentPointerY * 6}px`);
    solarSystem.style.setProperty('--glow-x', `${this.currentPointerX * 2.8}%`);
    solarSystem.style.setProperty('--glow-y', `${this.currentPointerY * 2.2}%`);
  }

  private collectOrbitAnimations(): void {
    if (this.orbitAnimations.length) {
      return;
    }

    const animatedElements = this.solarSystemElement.nativeElement.querySelectorAll<HTMLElement>(
      '.planet, .planet__counter',
    );

    this.orbitAnimations = Array.from(animatedElements).flatMap((element) =>
      element.getAnimations(),
    );
  }

  private applyOrbitPlaybackRate(): void {
    if (this.appliedOrbitPlaybackRate === this.currentOrbitPlaybackRate) {
      return;
    }

    for (const animation of this.orbitAnimations) {
      animation.updatePlaybackRate(this.currentOrbitPlaybackRate);
    }

    this.appliedOrbitPlaybackRate = this.currentOrbitPlaybackRate;
  }

  private approach(current: number, target: number, factor: number): number {
    return current + (target - current) * factor;
  }

  private clamp(value: number): number {
    return Math.max(-1, Math.min(1, value));
  }

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
