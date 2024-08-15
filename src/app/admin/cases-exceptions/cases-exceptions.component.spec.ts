import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesExceptionsComponent } from './cases-exceptions.component';

describe('CasesExceptionsComponent', () => {
  let component: CasesExceptionsComponent;
  let fixture: ComponentFixture<CasesExceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasesExceptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasesExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
