import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoStepComponent } from './twostep.component';

describe('TwoStepComponent', () => {
  let component: TwoStepComponent;
  let fixture: ComponentFixture<TwoStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
