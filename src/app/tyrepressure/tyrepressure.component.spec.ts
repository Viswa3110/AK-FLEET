import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyrepressureComponent } from './tyrepressure.component';

describe('TyrepressureComponent', () => {
  let component: TyrepressureComponent;
  let fixture: ComponentFixture<TyrepressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyrepressureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyrepressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
