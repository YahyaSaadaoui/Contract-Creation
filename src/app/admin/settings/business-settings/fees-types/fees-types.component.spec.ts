import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesTypesComponent } from './fees-types.component';

describe('FeesTypesComponent', () => {
  let component: FeesTypesComponent;
  let fixture: ComponentFixture<FeesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeesTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
