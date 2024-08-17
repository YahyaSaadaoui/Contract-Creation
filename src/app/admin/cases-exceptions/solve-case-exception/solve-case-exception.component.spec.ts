import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveCaseExceptionComponent } from './solve-case-exception.component';

describe('SolveCaseExceptionComponent', () => {
  let component: SolveCaseExceptionComponent;
  let fixture: ComponentFixture<SolveCaseExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolveCaseExceptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolveCaseExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
