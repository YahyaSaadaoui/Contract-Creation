import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMerchantComponent } from './modify-merchant.component';

describe('ModifyMerchantComponent', () => {
  let component: ModifyMerchantComponent;
  let fixture: ComponentFixture<ModifyMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyMerchantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
