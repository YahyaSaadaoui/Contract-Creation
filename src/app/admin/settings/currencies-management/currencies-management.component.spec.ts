import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesManagementComponent } from './currencies-management.component';

describe('CurrenciesManagementComponent', () => {
  let component: CurrenciesManagementComponent;
  let fixture: ComponentFixture<CurrenciesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrenciesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrenciesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
