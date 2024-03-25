import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjedrezComponent } from './ajedrez.component';

describe('AjedrezComponent', () => {
  let component: AjedrezComponent;
  let fixture: ComponentFixture<AjedrezComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjedrezComponent]
    });
    fixture = TestBed.createComponent(AjedrezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
