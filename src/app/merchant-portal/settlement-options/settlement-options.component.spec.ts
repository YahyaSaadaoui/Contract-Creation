import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementOptionsComponent } from './settlement-options.component';

describe('SettlementOptionsComponent', () => {
  let component: SettlementOptionsComponent;
  let fixture: ComponentFixture<SettlementOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettlementOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettlementOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
