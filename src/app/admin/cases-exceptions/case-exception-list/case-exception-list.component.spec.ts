import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseExceptionListComponent } from './case-exception-list.component';

describe('CaseExceptionListComponent', () => {
  let component: CaseExceptionListComponent;
  let fixture: ComponentFixture<CaseExceptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseExceptionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseExceptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
