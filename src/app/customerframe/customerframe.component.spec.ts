import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerframeComponent } from './customerframe.component';

describe('CustomerframeComponent', () => {
  let component: CustomerframeComponent;
  let fixture: ComponentFixture<CustomerframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerframeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
