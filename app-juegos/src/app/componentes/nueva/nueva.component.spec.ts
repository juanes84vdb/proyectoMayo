import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaComponent } from './nueva.component';

describe('NuevaComponent', () => {
  let component: NuevaComponent;
  let fixture: ComponentFixture<NuevaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaComponent]
    });
    fixture = TestBed.createComponent(NuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
