import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportarComponent } from './reportar.component';

describe('ReportarComponent', () => {
  let component: ReportarComponent;
  let fixture: ComponentFixture<ReportarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportarComponent]
    });
    fixture = TestBed.createComponent(ReportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
