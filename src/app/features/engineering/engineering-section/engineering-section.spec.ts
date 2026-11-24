import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineeringSection } from './engineering-section';

describe('EngineeringSection', () => {
  let component: EngineeringSection;
  let fixture: ComponentFixture<EngineeringSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineeringSection],
    }).compileComponents();

    fixture = TestBed.createComponent(EngineeringSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links to the ReBus catalog and offers a download for the released app', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const catalog = element.querySelector('article#rebus');
    const hubLink = catalog?.querySelector('.product-action--primary');
    const lucca = catalog?.querySelector('#rebuslucca');
    const milano = catalog?.querySelector('#rebusmilano');

    expect(hubLink?.getAttribute('href')).toBe('https://www.mynameme.com/');
    expect(lucca?.textContent).toContain('ReBusLucca');
    expect(lucca?.querySelector('a')?.getAttribute('href')).toBe(
      'https://apps.apple.com/it/app/rebuslucca/id6832028376',
    );
    expect(milano?.textContent).toContain('ReBusMilano');
    expect(milano?.textContent).toContain('In arrivo');
    expect(milano?.querySelector('a')).toBeNull();
  });
});
