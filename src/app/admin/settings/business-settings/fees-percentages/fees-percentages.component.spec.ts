import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesPercentagesComponent } from './fees-percentages.component';

describe('FeesPercentagesComponent', () => {
  let component: FeesPercentagesComponent;
  let fixture: ComponentFixture<FeesPercentagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeesPercentagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeesPercentagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
