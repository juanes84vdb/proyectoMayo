import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HundirFlotaComponent } from './hundir-flota.component';

describe('HundirFlotaComponent', () => {
  let component: HundirFlotaComponent;
  let fixture: ComponentFixture<HundirFlotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HundirFlotaComponent]
    });
    fixture = TestBed.createComponent(HundirFlotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
