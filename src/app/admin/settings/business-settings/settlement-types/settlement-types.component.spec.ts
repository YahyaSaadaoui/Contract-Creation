import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementTypesComponent } from './settlement-types.component';

describe('SettlementTypesComponent', () => {
  let component: SettlementTypesComponent;
  let fixture: ComponentFixture<SettlementTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettlementTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettlementTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
