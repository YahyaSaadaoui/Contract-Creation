import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractReviewComponent } from './contract-review.component';

describe('ContractReviewComponent', () => {
  let component: ContractReviewComponent;
  let fixture: ComponentFixture<ContractReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
