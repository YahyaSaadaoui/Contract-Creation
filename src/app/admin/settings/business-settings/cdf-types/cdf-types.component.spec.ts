import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdfTypesComponent } from './cdf-types.component';

describe('CdfTypesComponent', () => {
  let component: CdfTypesComponent;
  let fixture: ComponentFixture<CdfTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdfTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdfTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
