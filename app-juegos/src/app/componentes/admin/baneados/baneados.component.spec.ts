import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaneadosComponent } from './baneados.component';

describe('BaneadosComponent', () => {
  let component: BaneadosComponent;
  let fixture: ComponentFixture<BaneadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaneadosComponent]
    });
    fixture = TestBed.createComponent(BaneadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
