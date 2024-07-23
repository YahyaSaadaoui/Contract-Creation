import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdfMethodsComponent } from './cdf-methods.component';

describe('CdfMethodsComponent', () => {
  let component: CdfMethodsComponent;
  let fixture: ComponentFixture<CdfMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdfMethodsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdfMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
