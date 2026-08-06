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
});
