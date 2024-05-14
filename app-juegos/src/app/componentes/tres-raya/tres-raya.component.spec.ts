import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TresRayaComponent } from './tres-raya.component';

describe('TresRayaComponent', () => {
  let component: TresRayaComponent;
  let fixture: ComponentFixture<TresRayaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TresRayaComponent]
    });
    fixture = TestBed.createComponent(TresRayaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
