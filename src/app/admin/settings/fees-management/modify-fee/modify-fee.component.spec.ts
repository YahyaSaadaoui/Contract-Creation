import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyFeeComponent } from './modify-fee.component';

describe('ModifyFeeComponent', () => {
  let component: ModifyFeeComponent;
  let fixture: ComponentFixture<ModifyFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyFeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
