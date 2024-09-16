import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingMerchantComponent } from './onboarding-merchant.component';

describe('AddMerchantComponent', () => {
  let component: OnboardingMerchantComponent;
  let fixture: ComponentFixture<OnboardingMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingMerchantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
