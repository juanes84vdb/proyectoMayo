import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuienEsQuienComponent } from './quien-es-quien.component';

describe('QuienEsQuienComponent', () => {
  let component: QuienEsQuienComponent;
  let fixture: ComponentFixture<QuienEsQuienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuienEsQuienComponent]
    });
    fixture = TestBed.createComponent(QuienEsQuienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
